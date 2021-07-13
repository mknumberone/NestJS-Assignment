import { Delete, Get } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly departmentService: DepartmentService,
  ) {}

  //Add new Department
  @Post()
  async addDepartment(
    @Body('id') id: string,
    @Body('namedepartment') namedepartment: string,
    @Body('officephone') officephone: number,
    @Body('manager') manager: string,
  ) {
    const result = await this.departmentService.createDepartment(
      id,
      namedepartment,
      officephone,
      manager,
    );
    return result;
  }
  @Get(':id/employee')
  getEmployee(@Param() param) {
    return this.employeeService.getEmployeeByDeparmentId(param);
  }
  // Get List Department
  @Get()
  async getAllDeparment() {
    const department = await this.departmentService.getAllDepartment();
    return department;
  }
  //Get Department by id
  @Get(':id')
  async getOneDepartment(@Param('id') departmentId: string) {
    return await this.departmentService.getOneDepartment(departmentId);
  }
  // Update Department Infor
  @Put(':id')
  async updateDepartmentInfor(
    @Param('id') id: string,
    @Body('namedepartment') namedepartment: string,
    @Body('officephone') officephone: number,
    @Body('manager') manager: string,
  ) {
    const newInfor = await this.departmentService.updateDepartmentInfor(
      id,
      namedepartment,
      officephone,
      manager,
    );
    return newInfor + 'Everything has been updated';
  }
  // Delete Department
  @Delete(':id')
  async removeDepartment(@Param('id') departmentId: string) {
    await this.departmentService.deleteDepartmentInfor(departmentId);
    return null;
  }
}
