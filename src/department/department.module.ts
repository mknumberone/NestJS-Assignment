import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from 'src/employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { DepartmentController } from './department.controller';
import { DepartmentSchema } from './department.model';
import { DepartmentService } from './department.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Department', schema: DepartmentSchema },
      { name: 'Employee', schema: EmployeeSchema },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService, EmployeeService],
})
export class DepartmentModule {}
