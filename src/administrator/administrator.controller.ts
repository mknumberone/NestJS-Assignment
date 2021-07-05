import { 
  Controller, 
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete, } from '@nestjs/common';
// Import AdministratorService
import {AdministratorService} from './administrator.service'
@Controller('administrators')
export class AdministratorController {
    constructor(private readonly administratorService:AdministratorService){}

 // add account
  @Post()
  async addAdmin(
    @Body('username') adminUsername: string,
    @Body('password') adminPassword: string,
    @Body('state') adminState: boolean,
  ) {
    const generatedId = await this.administratorService.insertAccount(
        adminUsername,
        adminPassword,
        adminState,
    );
    return { id: generatedId };
  }
  // get all Administrator

  @Get()
  async getAllAdmin() {
    const Admins = await this.administratorService.getAdministrators();
    console.log('Admins');
    
    return Admins;
  }

  //Get one administrator 

 @Get(':id')
  getProduct(@Param('id') adminId: string) {
    return this.administratorService.getSingleAdministrator(adminId);
  }

  //Update account  

  @Patch(':id')
  async updateAdmin(
    @Param('id') adminId: string,
     @Body('username') adminUsername: string,
    @Body('password') adminPassword: string,
    @Body('state') adminState: boolean,
  ) {
    await this.administratorService.updateAdmin(adminId,adminUsername,adminPassword,adminState);
    return null;
  }
  // Delete account
   @Delete(':id')
  async removeAdmin(@Param('id') adminId: string) {
      await this.administratorService.deleteAdmin(adminId);
      return null;
  }

}
