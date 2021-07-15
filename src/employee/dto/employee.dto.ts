export class FindEmployeeDto {
  employeename:string;
  photo:string;
  jobtitle:string;
  cellphone:number;
  email:string;
  department:string;
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
  employeename: string;
  photo: string;
  jobtitle: string;
  cellphone: number;
  email: string;
  department: string;
  msg:string;
}

export class UpdateEmployeeDto {  
  employeename: string;
  photo: string;
  jobtitle: string;
  cellphone: number;
  email: string;
  department: string;
}