import { ApiProperty } from "@nestjs/swagger";

export class FindDepartmentDto{
    @ApiProperty()
    namedepartment:string;

    @ApiProperty()
    officephone:number;

    @ApiProperty()
    manager:string;
}

export class CreateDepartmentDto {
  @ApiProperty()
  namedepartment: string;

  @ApiProperty()
  officephone: number;

  @ApiProperty()
  manager: string;

  msg:string;
} 

export class DepartmentResponeDto {
  @ApiProperty()
  namedepartment: string;

  @ApiProperty()
  officephone: number;

  @ApiProperty()
  manager: string;
}

export class DepartmentUpdateDto {
  namedepartment: string;
  officephone: number;
  manager: string;
}