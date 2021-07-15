import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { AdministratorSchema } from './administrator.model';
import { Module } from '@nestjs/common'
import {MongooseModule } from '@nestjs/mongoose'
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Administrator', schema: AdministratorSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 },
    }),
  ],
  controllers: [AdministratorController],
  providers: [AdministratorService, AuthService],
  exports: [AdministratorService],
})
export class AdministratorModule {}