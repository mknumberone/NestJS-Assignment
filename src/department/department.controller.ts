import { Delete, Get } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAdminDto } from 'src/administrator/dto/administrator.dto';
import { EmployeeService } from '../employee/employee.service';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, DepartmentUpdateDto, FindDepartmentDto } from './dto/department.dto';

@Controller('department')
export class DepartmentController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly departmentService: DepartmentService,
  ) {}

  //Add new Department
  @Post()
  async addDepartment(
    @Body('') body: CreateDepartmentDto,
    // @Body('id') id: string,
    // @Body('namedepartment') namedepartment: string,
    // @Body('officephone') officephone: number,
    // @Body('manager') manager: string,
  ): Promise<any> {
    const result = await this.departmentService.createDepartment(body);
    return result;
  }
  @Get(':id/employee')
  getEmployee(@Param() param) {
    return this.employeeService.getEmployeeByDeparmentId(param);
  }
  // Get List Department
  @Get()
  async getAllDeparment(): Promise<FindDepartmentDto[]> {
    const department = await this.departmentService.getAllDepartment();
    return department;
  }
  //Get Department by id
  @Get(':id')
  async getOneDepartment(
    @Param('id') departmentId: string,
  ): Promise<FindDepartmentDto> {
    return await this.departmentService.getOneDepartment(departmentId);
  }
  // Update Department Infor
  @Put(':id')
  async updateDepartmentInfor(
    @Param('id') id: string,
    @Body() body: DepartmentUpdateDto,
    // @Body('namedepartment') namedepartment: string,
    // @Body('officephone') officephone: number,
    // @Body('manager') manager: string,
  ):Promise<any> {
    const newInfor = await this.departmentService.updateDepartmentInfor(
      id,
      body
      // namedepartment,
      // officephone,
      // manager,
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
