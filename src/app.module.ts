import { DepartmentService } from './department/department.service';
import { AdministratorService } from './administrator/administrator.service';
import { Module } from '@nestjs/common';
// Database
import {MongooseModule} from '@nestjs/mongoose'
import { AdministratorModule } from './administrator/administrator.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://xuanthai123:xuanthai123@cluster0.icygv.mongodb.net/assignment?retryWrites=true&w=majority',
    ),
    EmployeeModule,
    AdministratorModule,
    DepartmentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
