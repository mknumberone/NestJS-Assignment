import { EmployeeService } from './employee.service';
import { Controller, Delete, Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Put } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeesService: EmployeeService) {}
  // Add Employee
  @Post()
  async addEmployee(
    @Body('name') employeename: string,
    @Body('photo') photo: string,
    @Body('jobtitle') jobtitle: string,
    @Body('cellphone') cellphone: number,
    @Body('email') email: string,
    @Body('department') department: string,
  ) {
    const result = await this.employeesService.createEmployee(
      employeename,
      photo,
      jobtitle,
      cellphone,
      email,
      department,
    );
    return result;
  }

  // Get List Employee
  @Get()
  async getAllEmp(){
      const employee = await this.employeesService.getAllEmployees()
      return employee
  }

  // Get by id
  @Get(':id')
  async getOneEmp(@Param('id') EmpId: string){
      return await this.employeesService.getEmployee(EmpId)
  }
  //Update Employee Infor
  @Put(':id')
  async updateEm(
    @Param('id') empId: string,
    @Body('name') employeename: string,
    @Body('photo') photo: string,
    @Body('jobtitle') jobtitle: string,
    @Body('cellphone') cellphone: number,
    @Body('email') email: string,
    @Body('department') department: string,
      ){
        const newInfor = await this.employeesService.updateEmployeeInfor(
          empId,
          employeename,
          photo,
          jobtitle,
          cellphone,
          email,
          department,
        );
        return newInfor + 'Everything has been updated';
      }
    @Delete(':id')
    async removeEmp(@Param('id') empId: string){
        await this.employeesService.deleteEmloyeeInfor(empId)
        return null;
    }
}
