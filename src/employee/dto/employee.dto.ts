import { ApiProperty } from '@nestjs/swagger';

export class FindEmployeeDto {
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
}

export class ResponeEmployeeDto {
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
}
