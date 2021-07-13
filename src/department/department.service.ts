import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './department.model';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel('Department')
    private readonly departmentModel: Model<Department>,
  ) {}

  // Create new Department
  async createDepartment(
    id: string,
    namedepartment: string,
    officephone: number,
    manager: string,
  ) {
    try {
      const newDepartment = new this.departmentModel({
        id,
        namedepartment,
        officephone,
        manager,
      });
      if(id ===newDepartment.id){
        return "Phòng này đã tồn tại!"
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
  async getAllDepartment() {
    try {
      const departments = await this.departmentModel.find().exec();
      return departments.map((department) => ({
        id: department.id,
        namedepartment: department.namedepartment,
        officephone: department.officephone,
        manager: department.manager,
      }));
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Get Failed!');
    }
  }
  // Get department by id
  async getOneDepartment(id: string) {
    try {
      const department = await this.findDepartment(id);
      if (!department) {
        return 'Not found Department';
      } else {
        return {
          id: department.id,
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
    namedepartment: string,
    officephone: number,
    manager: string,
  ) {
      try {
          const updateD = await this.findDepartment(id)
          if(namedepartment){
              updateD.namedepartment = namedepartment;
          }
          if(officephone){
              updateD.officephone= officephone;
          }
          if(manager){
              updateD.manager = manager;
          }
          updateD.save();
      } catch (error) {
         console.log(error);
         throw new NotFoundException('Update Failed!'); 
      }
  }
  // DeleteOne Department
  async deleteDepartmentInfor(departmentId:string){
      try {
          const result = await this.departmentModel.deleteOne({ _id:departmentId}).exec()
        if (result.n === 0) {
          throw new NotFoundException('Could not find Department');
        }
        } catch (error) {
          
      }
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
