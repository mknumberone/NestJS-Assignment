import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from 'src/administrator/dto/administrator.dto';
import { Department } from './department.model';
import { CreateDepartmentDto, DepartmentUpdateDto, FindDepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel('Department')
    private readonly departmentModel: Model<Department>,
  ) {}

  // Create new Department
  async createDepartment(
    payload: CreateDepartmentDto,
    // id: string,
    // namedepartment: string,
    // officephone: number,
    // manager: string,
  ): Promise<any> {
    try {
      const newDepartment = new this.departmentModel({
        namedepartment: payload.namedepartment,
        officephone: payload.officephone,
        manager: payload.manager,
      });
      if (payload.namedepartment === newDepartment.namedepartment) {
        return 'Phòng này đã tồn tại!';
      }
      //Save to database
      const result = await newDepartment.save();
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Create Failed!');
    }
  }
  // Get all department
  async getAllDepartment(): Promise<FindDepartmentDto[]> {
    try {
      const departments = await this.departmentModel.find();
      return departments;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Get Failed!');
    }
  }
  // Get department by id
  async getOneDepartment(id: string): Promise<FindDepartmentDto> {
    try {
      const department = await this.findDepartment(id);
      if (!department) {
        return undefined;
      } else {
        return {
          namedepartment: department.namedepartment,
          officephone: department.officephone,
          manager: department.manager,
        };
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Get Failed!');
    }
  }
  // Update Department Infor
  async updateDepartmentInfor(
    id: string,
    payload: DepartmentUpdateDto,
    // namedepartment: string,
    // officephone: number,
    // manager: string,
  ):Promise<any> {
    try {
      const updateD = await this.findDepartment(id);
      if (payload.namedepartment) {
        updateD.namedepartment = payload.namedepartment;
      }
      if (payload.officephone) {
        updateD.officephone = payload.officephone;
      }
      if (payload.manager) {
        updateD.manager = payload.manager;
      }
      updateD.save();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Update Failed!');
    }
  }
  // DeleteOne Department
  async deleteDepartmentInfor(departmentId: string) {
    try {
      const result = await this.departmentModel
        .deleteOne({ _id: departmentId })
        .exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find Department');
      }
    } catch (error) {}
  }

  // find Department by id
  async findDepartment(id: string): Promise<Department> {
    let department;
    try {
      department = await this.departmentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find department.');
    }
    if (!department) {
      throw new NotFoundException('Could not find department.');
    }
    return department;
  }
}
