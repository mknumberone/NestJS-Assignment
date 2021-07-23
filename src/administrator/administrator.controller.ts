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
  Query
} from '@nestjs/common';
import { AdministratorService } from './administrator.service'
import { AuthGuard } from '@nestjs/passport';
import { Put } from '@nestjs/common';
import { AdminResponeDto, CreateAdminDto, FindAdminsResponesDto, loginDTO, UpdateAdminRespone } from './dto/administrator.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from '../role/roles.guard';

@Controller('administrators')
export class AdministratorController {
  constructor(
    private readonly administratorService: AdministratorService,
    private readonly authService: AuthService,
  ) { }

  // Pagination
  @ApiQuery({name:'page'})
  @Get('paginate')
  async pagination(@Query('page') page: number = 1) {
    let options = {};
    const query = this.administratorService.find(options);
    const currentPage: number = parseInt(page as any) || 1;
    const limit = 9;
    const total = await this.administratorService.count(options);
    const data = await query.skip((currentPage - 1) * limit).limit(limit).exec();

    return {
      success:"Success",
      data,
      total,
      page,
      last_page: Math.ceil(total / limit)
    };
  }

  // Login
  @UseGuards(AuthGuard('local'))
  @ApiBearerAuth()
  @ApiBody({ type: loginDTO })
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.user._doc)
    return this.authService.login(req.user._doc);
  }

  // add account
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AdminResponeDto })
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async addAdmin(@Body() body: CreateAdminDto): Promise<AdminResponeDto> {
    const result = await this.administratorService.insertAccount(body);
    return result;
  }
  // get all Administrator

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getAllAdmin(): Promise<FindAdminsResponesDto[]> {
    const Admins = await this.administratorService.getAdministrators();
    return Admins;
  }

  //Get one administrator
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getAdmin(@Param('id') adminId: string): Promise<FindAdminsResponesDto> {
    return await this.administratorService.getSingleAdministrator(adminId);
  }

  //Update account
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async updateAdmin(@Param('id') adminId: string, @Body() body: UpdateAdminRespone,
  ): Promise<any> {
    await this.administratorService.updateAdmin(body, adminId);
    return null;
  }
  // Delete account
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiBody({ type: AdminResponeDto })
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async removeAdmin(@Param('id') adminId: string) {
    await this.administratorService.deleteAdmin(adminId);
    return null;
  }

  // Change password
  @Put('change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiBody({ type: AdminResponeDto })
  @ApiOkResponse({ description: "OK" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
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

