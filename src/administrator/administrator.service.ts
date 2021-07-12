import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrator } from './administrator.model';
import { sendMail } from '../ultis/mailer';
const bcrypt = require('bcrypt');

import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AdministratorService {
  constructor(
    @InjectModel('Administrator')
    private readonly administratorModel: Model<Administrator>,
  ) {}
  // insert a account to database
  async insertAccount(
    username: string,
    //password: string,
    email: string,
    role: string,
    state: boolean,
  ) {
    try {
      const user = await this.findUserName(username);
      if (user.length != 0) {
        return 'Người dùng đã tồn tại';
      } else {
        // Password Encryption
        const saltOrRounds = 10;
        let passwordPlainText = uuidv4();
        const password = await bcrypt.hash(passwordPlainText, saltOrRounds);
        const newAdministrator = new this.administratorModel({
          username,
          password,
          email,
          role,
          state,
        });
        // Save admin in DB
        const result = await newAdministrator.save();
        // Send email to user new
        await sendMail(
          email,
          '[NWS] NewWave Solution Thông tin đăng nhập',
          `
        <strong>Username : ${username} </strong>
        <br/>
       <strong> Password : ${passwordPlainText}</strong>
       <p>Vui lòng đổi mật khẩu khi đăng nhập thành công!</p>
      `,
        );
        return {
          id: result.id as string,
          password: passwordPlainText as string,
        };
      }
    } catch (error) {
      throw new NotFoundException('Insert Failed!');
    }
  }
  //Get all list admin
  async getAdministrators() {
    const administrators = await this.administratorModel.find().exec();
    try {
      return administrators.map((admin) => ({
        id: admin.id,
        username: admin.username,
        password: admin.password,
        email: admin.email,
        role: admin.role,
        state: admin.state,
      }));
    } catch (error) {
      throw new NotFoundException('Get Failed!');
    }
  }
  // Get admin by Id
  async getSingleAdministrator(adminId: string) {
    const admin = await this.findAdmin(adminId);
    try {
      if (!admin) {
        return 'User does not exits';
      } else {
        return {
          id: admin.id,
          username: admin.username,
          password: admin.password,
          email: admin.email,
          role: admin.role,
          state: admin.state,
        };
      }
    } catch (error) {
      throw new NotFoundException('Delete Failed!');
    }
  }
  // Update admin
  async updateAdmin(
    adminId: string,
    username: string,
    password: string,
    email: string,
    role: string,
    state: boolean,
  ) {
    try {
      const updatedAdmin = await this.findAdmin(adminId);
      if (username) {
        updatedAdmin.username = username;
      }
      if (password) {
        updatedAdmin.password = password;
      }
      if (email) {
        updatedAdmin.email = email;
      }
      if (role) {
        updatedAdmin.role = role;
      }
      if (state) {
        updatedAdmin.state = state;
      }
      updatedAdmin.save();
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
          return 'Người dùng đéo tồn tại';
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
      // if (!userRow) {
      //   return 'Người dùng đéo tồn tại';
      // }
      // if (userRow) {
      //   if(!match){
      //     return "Mật khẩu cũ chưa đúng"
      //   }
      //   if(!checkNewAndOldPass){
      //     return "Mật khẩu cũ giống mật khẩu mới"
      //   }
      //   if(!checkPass){
      //     return "Mật khẩu xác nhận chưa trùng khớp!"
      //   }
      //   if(user && match && checkPass){
      //     const saltOrRounds = 10;
      //     newPass = await bcrypt.hash(newPass, saltOrRounds);
      //     userRow.password=newPass;
      //     const updatPassAdministrator = new this.administratorModel(userRow);
      //     // Save admin in DB
      //     const result = await updatPassAdministrator.save();
      //     return "Đổi mật khẩu thành công";
      //   }
      // }
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
}
