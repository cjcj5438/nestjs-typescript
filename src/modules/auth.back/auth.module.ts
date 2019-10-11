import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'ssshhhh',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ], // 如果要其他模块，就要导入这个模块。
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {
}
