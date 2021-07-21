import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrator } from './administrator.model';
import { sendMail } from '../ultis/mailer';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateAdminDto,
  FindAdminsResponesDto,
  UpdateAdminRespone,
} from './dto/administrator.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';

const bcrypt = require('bcrypt');
@Injectable()
export class AdministratorService {
  constructor(
    @InjectModel('Administrator')
    private readonly administratorModel: Model<Administrator>,
  ) { }

  //Pagination

  // insert a account to database
  async insertAccount(payload: CreateAdminDto,): Promise<any> {
    try {
      let newAdmin = {...payload};
      const user = await this.administratorModel.find({ username: payload.username }).exec();
      //Check username 
      if (user.length !=0) return { msg: 'User already exists', statusCode:400};
      // if (newAdmin) return { msg: 'Success', statusCode: 200 };
      // hash password
      const saltOrRounds = 10;
      let passwordPlainText = uuidv4();
      const passwordhash = await bcrypt.hash(passwordPlainText, saltOrRounds);
      // send to mail
      await sendMail(
        newAdmin.email,
        '[NWS] NewWave Solution Thông tin đăng nhập',
        `
          <strong>Username : ${newAdmin.username} </strong>
          <br/>
        <strong> Password : ${passwordPlainText}</strong>
        <p>Vui lòng đổi mật khẩu khi đăng nhập thành công!</p>
        `,
      );
      const newAdministrator = new this.administratorModel({
        username: payload.username,
        password: passwordhash,
        email: payload.email,
        role: payload.role,
        state: payload.state,
      });
      //save to db
      return newAdministrator.save();
    } catch (error) {
      throw new NotFoundException('Insert Failed!');
    }
  }
  //Get all list admin
  async getAdministrators(): Promise<FindAdminsResponesDto[]> {
    try {
      const administrators = await this.administratorModel.find();
      return administrators;
    } catch (error) {
      throw new NotFoundException('Get Failed!');
    }
  }
  // Get admin by Id
  async getSingleAdministrator(
    adminId: string,
  ): Promise<FindAdminsResponesDto> {
    try {
      const admin = await this.findAdmin(adminId);
      return admin;
    } catch (error) {
      throw new NotFoundException('Delete Failed!');
    }
  }
  // Update admin
  async updateAdmin(
    payload: UpdateAdminRespone,
    adminId: string,
  ): Promise<any> {
    try {
      const updatedAdmin = await this.findAdmin(adminId);
      let newUpdate = {
        ...payload,
      }

      if (newUpdate.username) {
        updatedAdmin.username = newUpdate.username
      }

      if (newUpdate.email) {
        updatedAdmin.email = newUpdate.email;
      }

      if (newUpdate.role) {
        updatedAdmin.role = newUpdate.role;
      }
      if (newUpdate.state) {
        updatedAdmin.state = newUpdate.state;
      }
      updatedAdmin.save()

    } catch (error) {
      throw new NotFoundException('Update Failed!');
    }
  }
  // Delete administrator
  async deleteAdmin(adminId: string) {
    try {
      const result = await this.administratorModel
        .deleteOne({ _id: adminId })
        .exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find Admin.');
      }
    } catch (error) {
      throw new NotFoundException('Delete Failed!');
    }
  }
  // Change password
  async changePassword(
    username: string,
    oldPass: string,
    newPass: string,
    confirmPass: string,
  ) {
    try {
      const user = await this.findUserName(username);
      const userRow = user[0];
      const match = await bcrypt.compare(oldPass, userRow.password);
      const checkPass = newPass === confirmPass;
      const checkNewAndOldPass = oldPass !== newPass;
      switch (true) {
        case !userRow:
          return 'Người dùng khôbg tồn tại';
        case userRow:
          if (!match) {
            return 'Mật khẩu cũ chưa đúng';
          }
          if (!checkNewAndOldPass) {
            return 'Mật khẩu cũ giống mật khẩu mới';
          }
          if (!checkPass) {
            return 'Mật khẩu xác nhận chưa trùng khớp!';
          }
          if (user && match && checkPass) {
            const saltOrRounds = 10;
            newPass = await bcrypt.hash(newPass, saltOrRounds);
            userRow.password = newPass;
            const updatPassAdministrator = new this.administratorModel(userRow);
            // Save to DB
            await updatPassAdministrator.save();
            return 'Đổi mật khẩu thành công';
          }
      }
    } catch (error) {
      throw new NotFoundException('Could not find administrator.');
    }
  }
  // Find administrator by id
  private async findAdmin(id: string): Promise<Administrator> {
    let administrator;
    try {
      administrator = await this.administratorModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find administrator.');
    }
    if (!administrator) {
      throw new NotFoundException('Could not find administrator.');
    }
    return administrator;
  }
  // Find by username
  async findUserName(username: string): Promise<Administrator> {
    let administrator;
    try {
      administrator = await this.administratorModel.find({ username }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find administrator.');
    }
    if (!administrator) {
      throw new NotFoundException('Could not find administrator.');
    }
    return administrator;
  }

  find(options) {
    return this.administratorModel.find(options);
  }

  count(options) {
    return this.administratorModel.count(options).exec();
  }
}
