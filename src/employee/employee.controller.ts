import { EmployeeService } from './employee.service';
import {
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../ultis/file-uploading.utils';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeesService: EmployeeService) {}
  // Add Employee
  //Upload Photo
  @Post()
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async uploadedEmployee(
    @Body('name') employeename: string,
    @UploadedFile() file: Express.Multer.File,
    // @Body('photo') photo: string,
    @Body('jobtitle') jobtitle: string,
    @Body('cellphone') cellphone: number,
    @Body('email') email: string,
    @Body('department') department: string,
  ) {
    const result = await this.employeesService.createEmployee(
      employeename,
      file.path,
      jobtitle,
      cellphone,
      email,
      department,
    );
    return result;
  }
  //Update Employee Infor
  @Put(':id')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async updateEm(
    @Param('id') empId: string,
    @Body('name') employeename: string,
    @Body('photo') photo: string,
    @Body('jobtitle') jobtitle: string,
    @Body('cellphone') cellphone: number,
    @Body('email') email: string,
    @Body('department') department: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.employeesService.updateEmployeeInfor(
      empId,
      employeename,
      (photo = file.path),
      jobtitle,
      cellphone,
      email,
      department,
    );
    return result + 'Everything has been updated';
  }
  // Get List Employee
  @Get()
  async getAllEmp() {
    const employee = await this.employeesService.getAllEmployees();
    return employee;
  }

  // Get by id
  @Get(':id')
  async getOneEmp(@Param('id') EmpId: string) {
    return await this.employeesService.getEmployee(EmpId);
  }

  // Delete Employee Infor
  @Delete(':id')
  async removeEmp(@Param('id') empId: string) {
    await this.employeesService.deleteEmloyeeInfor(empId);
    return null;
  }

  // Get image
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
