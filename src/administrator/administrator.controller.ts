import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import {AdministratorService} from './administrator.service'
import { AuthGuard } from '@nestjs/passport';
import { Put } from '@nestjs/common';
import { FindAdminsResponesDto } from './dto/administrator.dto';
import { AuthService } from 'src/auth/auth.service';
@Controller('administrators')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService,
              private readonly authService:AuthService) {}
  // Login
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // add account
  @Post()
  async addAdmin(
    @Body('username') adminUsername: string,
    // @Body('password') adminPassword: string,
    @Body('email') adminEmail: string,
    @Body('role') adminRole: string,
    @Body('state') adminState: boolean,
  ) {
    const result = await this.administratorService.insertAccount(
      adminUsername,
      // adminPassword,
      adminEmail,
      adminRole,
      adminState,
    );
    return result;
  }
  // get all Administrator

  @Get()
  async getAllAdmin():Promise<FindAdminsResponesDto[]> {
    const Admins = await this.administratorService.getAdministrators();
    return Admins;
  }

  //Get one administrator

  @Get(':id')
  async getAdmin(@Param('id') adminId: string):Promise<FindAdminsResponesDto> {
    return await this.administratorService.getSingleAdministrator(adminId);
  }

  //Update account
  @Patch(':id')
  async updateAdmin(
    @Param('id') adminId: string,
    @Body('username') adminUsername: string,
    @Body('password') adminPassword: string,
    @Body('email') adminEmail: string,
    @Body('role') adminRole: string,
    @Body('state') adminState: boolean,
  ) {
    await this.administratorService.updateAdmin(
      adminId,
      adminUsername,
      adminPassword,
      adminEmail,
      adminRole,
      adminState,
    );
    return null;
  }
  // Delete account
  @Delete(':id')
  async removeAdmin(@Param('id') adminId: string) {
    await this.administratorService.deleteAdmin(adminId);
    return null;
  }

  // Change password
  //@UseGuards(JwtAuthGuard)
  @Put('change-password')
  async updatePassword(
    @Body('username') username: string,
    @Body('oldPass') oldPass: string,
    @Body('newPass') newPass: string,
    @Body('confirmPass') confirmPass: string,
  ) {
    return await this.administratorService.changePassword(
      username,
      oldPass,
      newPass,
      confirmPass,
    );
  }
  
}

