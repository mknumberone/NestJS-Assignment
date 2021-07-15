import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.model';
import { CreateEmployeeDto, FindEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeesModel: Model<Employee>,
  ) {}

  // Create new employee
  async createEmployee(payload: CreateEmployeeDto): Promise<any> {
    try {
      let employees = { ...payload };
      const employee = await this.employeesModel.find({
        employeename: employees.employeename,
      });
      if (!employee) return { msg: 'Đã tồn tại' };
      const newEmployee = await new this.employeesModel({
        employeename: employees.employeename,
        photo: employees.photo,
        jobtitle: employees.jobtitle,
        cellphone: employees.cellphone,
        email: employees.email,
        department: employees.department,
      });
      // Save to database
      const result = await newEmployee.save();
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Insert Failed!');
    }
  }
  // Update Employee Infor
  async updateEmployeeInfor(
    payload: UpdateEmployeeDto,
    employeeId: string,
    // employeename: string,
    // photo: string,
    // jobtitle: string,
    // cellphone: number,
    // email: string,
    // department: string,
  ):Promise<any> {
    try {
      const updateEm = await this.findEmId(employeeId);
      if(payload.employeename) {updateEm.employeename = payload.employeename;}
      if(payload.photo) {updateEm.employeename = payload.photo;}
      if(payload.jobtitle) {updateEm.jobtitle = payload.jobtitle;}      // let file = '';
      if(payload.cellphone) {updateEm.cellphone = payload.cellphone;} 
      if (payload.email) {updateEm.email = payload.email;} 
      if(payload.department){updateEm.department = payload.department;}
      updateEm.save();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Update false');
    }
  }
  // Get all list employee
  async getAllEmployees(): Promise<FindEmployeeDto[]> {
    try {
      const employees = await this.employeesModel.find();
      return employees;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Get Failed!');
    }
  }
  // Get Employee by id
  async getEmployee(employeeId: string): Promise<FindEmployeeDto> {
    try {
      const employee = await this.findEmId(employeeId);
      if (!employee) {
        return null;
      }
      return employee;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Get Failed!');
    }
  }
  // Delete Employee Infor
  async deleteEmloyeeInfor(employeeId: string) {
    try {
      const result = await this.employeesModel
        .deleteOne({ _id: employeeId })
        .exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find employee.');
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Delete Failed!');
    }
  }

  //Get Em by DepartmentID
  async getEmployeeByDeparmentId(departmentId: any): Promise<any> {
    console.log(departmentId.id);
    const employees = await this.employeesModel.find({
      department: departmentId.id,
    });
    //  employees.filter((employee) => return employee.department == departmentId.id;
    // const department = this.departmentModel.find({ _id: departmentId.id });
    return employees;
  }
  //Find by Emloyee by ID
  async findEmId(id: string): Promise<Employee> {
    let employee;
    try {
      employee = await this.employeesModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find employee.');
    }
    if (!employee) {
      throw new NotFoundException('Could not find employee.');
    }
    return employee;
  }
}
