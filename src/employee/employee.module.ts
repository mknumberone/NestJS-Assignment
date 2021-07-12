import { EmployeeService} from './employee.service';
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './employee.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Employee', schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {}
