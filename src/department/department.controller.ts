import { Delete, Get, UseGuards } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/role/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateDepartmentDto})
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async addDepartment(
    @Body() body: CreateDepartmentDto,
  ): Promise<any> {
    const result = await this.departmentService.createDepartment(body);
    return result;
  }

  
  @Get(':id/employee')
  @ApiBearerAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  getEmployee(@Param() param) {
    return this.employeeService.getEmployeeByDeparmentId(param);
  }
  // Get List Department
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getAllDeparment(): Promise<FindDepartmentDto[]> {
    const department = await this.departmentService.getAllDepartment();
    return department;
  }
  //Get Department by id
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getOneDepartment(
    @Param('id') departmentId: string,
  ): Promise<FindDepartmentDto> {
    return await this.departmentService.getOneDepartment(departmentId);
  }
  // Update Department Infor
  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateDepartmentInfor(
    @Param('id') id: string,
    @Body() body: DepartmentUpdateDto,
  ):Promise<any> {
    const newInfor = await this.departmentService.updateDepartmentInfor(id,body);
    return newInfor + 'Everything has been updated';
  }
  // Delete Department
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  async removeDepartment(@Param('id') departmentId: string) {
    await this.departmentService.deleteDepartmentInfor(departmentId);
    return null;
  }
}
