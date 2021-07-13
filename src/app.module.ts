import { Module } from '@nestjs/common';
// Database
import {MongooseModule} from '@nestjs/mongoose'
import { AdministratorModule } from './administrator/administrator.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://xuanthai123:xuanthai123@cluster0.icygv.mongodb.net/assignment?retryWrites=true&w=majority',
    ),
    DepartmentModule,
    EmployeeModule,
    AdministratorModule,
    AuthModule,
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
