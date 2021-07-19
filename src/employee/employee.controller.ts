import { EmployeeService } from './employee.service';
import {
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
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
import { ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiForbiddenResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiFile } from '../ultis/apifile';
import { RolesGuard } from 'src/role/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import path from 'path'
console.log(path);


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeesService: EmployeeService) {}
  // Add Employee
  //Upload Photo
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiForbiddenResponse({ description: "Forbidden" })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async updateEm(
    @Param('id') empId: string,
    @Body() body: UpdateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    body.photo = file.path;
    const result = await this.employeesService.updateEmployeeInfor(body, empId);
    return result + 'Everything has been updated';
  }
  // Get List Employee
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getAllEmp(): Promise<FindEmployeeDto[]> {
    
    const employee = await this.employeesService.getAllEmployees();
    return employee;
  }

  // Get by id
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getOneEmp(@Param('id') EmpId: string): Promise<FindEmployeeDto> {
    return await this.employeesService.getEmployee(EmpId);
  }

  // Delete Employee Infor
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async removeEmp(@Param('id') empId: string) {
    await this.employeesService.deleteEmloyeeInfor(empId);
    return null;
  }

}
