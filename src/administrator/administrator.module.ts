import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { AdministratorSchema } from './administrator.model';
import { Module } from '@nestjs/common'

import {MongooseModule } from '@nestjs/mongoose'


@Module({
    imports: [MongooseModule.forFeature([{name:'Administrator',schema:AdministratorSchema}])],
    controllers : [AdministratorController],
    providers: [AdministratorService],
})

export class AdministratorModule {}