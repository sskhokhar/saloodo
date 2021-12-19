import { Module } from '@nestjs/common';
import { AuthService } from './services/';
import { AuthController } from './controllers';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
