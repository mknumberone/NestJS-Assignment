import { Module } from '@nestjs/common';
// Database
import {MongooseModule} from '@nestjs/mongoose'
import { AdministratorModule } from './administrator/administrator.module';

@Module({
  imports: [AdministratorModule,MongooseModule.forRoot('mongodb+srv://xuanthai123:xuanthai123@cluster0.icygv.mongodb.net/assignment?retryWrites=true&w=majority')],
  controllers: [],
  providers: [],
})
export class AppModule {}
