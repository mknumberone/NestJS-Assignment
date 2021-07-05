import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrator } from './administrator.model';
@Injectable()
export class AdministratorService {
    constructor(
        @InjectModel('Administrator') private readonly administratorModel: Model<Administrator>,
    ) { }
    // insert a account to database
    async insertAccount(username: string, password: string, state: boolean) {
        const newAdministrator = new this.administratorModel({
            username,
            password,
            state
        })
        const result = await newAdministrator.save()
        return result.id as string
    }
    //Get all list admin
    async getAdministrators() {
        const administrators = await this.administratorModel.find().exec()
        return administrators.map(admin => ({
            id: admin.id,
            username: admin.username,
            password: admin.password,
            state: admin.state,
        }));
    }
    // Get admin by Id
    async getSingleAdministrator(adminId: string) {
        const admin = await this.findAdmin(adminId);
        return {
            id: admin.id,
            username: admin.username,
            password: admin.password,
            state: admin.state,
        };
    }
    // Update admin
    async updateAdmin(
        adminId: string,
        username: string,
        password: string,
        state: boolean,
    ) {
        const updatedAdmin = await this.findAdmin(adminId);
        if (username) {
            updatedAdmin.username = username;
        }
        if (password) {
            updatedAdmin.password = password;
        }
        if (state) {
            updatedAdmin.state = state;
        }
        updatedAdmin.save();
    }

    // Delete administrator
    async deleteAdmin(adminId: string) {
    const result = await this.administratorModel.deleteOne({ _id: adminId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
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
}
