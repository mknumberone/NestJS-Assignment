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
import {
  CreateEmployeeDto,
  FindEmployeeDto,
  UpdateEmployeeDto,
} from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeesService: EmployeeService) {}
  // Add Employee
  //Upload Photo
  @Post()
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async uploadedEmployee(
    @Body('') body: CreateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    body.photo = file.path;
    const result = await this.employeesService.createEmployee(body);
    return result;
  }
  //Update Employee Infor
  @Put(':id')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async updateEm(
    @Param('id') empId: string,
    @Body('') body: UpdateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    body.photo = file.path;
    const result = await this.employeesService.updateEmployeeInfor(body, empId);
    return result + 'Everything has been updated';
  }
  // Get List Employee
  @Get()
  async getAllEmp(): Promise<FindEmployeeDto[]> {
    const employee = await this.employeesService.getAllEmployees();
    return employee;
  }

  // Get by id
  @Get(':id')
  async getOneEmp(@Param('id') EmpId: string): Promise<FindEmployeeDto> {
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
