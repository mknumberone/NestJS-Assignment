import { Injectable } from '@nestjs/common';
import { AdministratorService } from '../administrator/administrator.service';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private userService: AdministratorService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserName(username);
    const userRow = user[0];
    const match = await bcrypt.compare(password, userRow.password);
    if (user && match) {
      const { password, ...result } = userRow;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      password: user.password
    };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: 60 * 60 }),
      expiresIn: 60 * 60,
    };
  }
  async logOut(user:any){
    
  }
}
