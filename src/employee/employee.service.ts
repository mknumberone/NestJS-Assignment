import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee')
    private readonly employeesModel: Model<Employee>,
  ) {}

  // Create new employee
  async createEmployee(
    employeename: string,
    file: string,
    jobtitle: string,
    cellphone: number,
    email: string,
    department: string,
  ) {
    try {
      // let file = '';
      const newEmployee = new this.employeesModel({
        employeename,
        photo: file,
        jobtitle,
        cellphone,
        email,
        department,
      });
      // newEmployee.photo = file;
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
    employeeId: string,
    employeename: string,
    photo: string,
    jobtitle: string,
    cellphone: number,
    email: string,
    department: string,
  ) {
    try {
      let file = '';
      const updateEm = await this.findEmId(employeeId);
      if (employeename) {
        updateEm.name = employeename;
      }
      if (photo) {
        updateEm.photo = photo = file;
      }
      if (jobtitle) {
        updateEm.jobtitle = jobtitle;
      }
      if (cellphone) {
        updateEm.cellphone = cellphone;
      }
      if (email) {
        updateEm.email = email;
      }
      if (department) {
        updateEm.department = department;
      }

      updateEm.save();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Update false');
    }
  }
  // Get all list employee
  async getAllEmployees() {
    try {
      const employees = await this.employeesModel.find().exec();
      return employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        photo: employee.photo,
        jobtitle: employee.jobtitle,
        cellphone: employee.cellphone,
        email: employee.email,
        department: employee.department,
      }));
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Get Failed!');
    }
  }
  // Get Employee by id
  async getEmployee(employeeId: string) {
    try {
      const employee = await this.findEmId(employeeId);
      if (!employee) {
        return 'Not found Employee';
      } else {
        return {
          id: employee.id,
          name: employee.name,
          photo: employee.photo,
          jobtitle: employee.jobtitle,
          cellphone: employee.cellphone,
          email: employee.email,
          department: employee.department,
        };
      }
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
