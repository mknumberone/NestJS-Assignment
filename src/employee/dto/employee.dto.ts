import { ApiProperty } from '@nestjs/swagger';

export class FindEmployeeDto {
  employeename: string;
  photo: string;
  jobtitle: string;
  cellphone: number;
  email: string;
  department: string;
}

export class ResponeEmployeeDto {
  employeename: string;
  photo: string;
  jobtitle: string;
  cellphone: number;
  email: string;
  department: string;
}

export class CreateEmployeeDto {
  @ApiProperty()
  employeename: string;
  @ApiProperty()
  photo: string;

  @ApiProperty()
  jobtitle: string;

  @ApiProperty()
  cellphone: number;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  department: string;
  msg: string;
}

export class UpdateEmployeeDto {
  employeename: string;
  photo: string;
  jobtitle: string;
  cellphone: number;
  email: string;
  department: string;
}
