import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from '../../types/payload';
import { sign } from 'jsonwebtoken';
import { UserService } from '../../user/services';
import { environment } from '../../../environments/environment';
import { LoginDTO } from '../../dtos';
import * as bcrypt from 'bcrypt';
import { User } from '../../types/user';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(credentials: LoginDTO) {
    const user = await this.userService.findByEmail(credentials.email);
    if (await bcrypt.compare(credentials.password, user.password)) {
      const payload = {
        email: user.email,
      };
      const token = await this.signPayload(payload);

      return { user: this.sanitizeUser(user), token };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
  async signPayload(payload: Payload) {
    return sign(payload, environment.secretKey, { expiresIn: '7d' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
