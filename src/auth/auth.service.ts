import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findOneByUsername(username);

      if (!user) throw new Error(`User with username: ${username} not found`);

      const compareResult = await compare(pass, user.passwordHash);

      if (!compareResult) throw new UnauthorizedException();

      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
