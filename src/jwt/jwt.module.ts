import { Module } from '@nestjs/common';
import { JwtService as _JwtService } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Module({
  providers: [_JwtService, JwtService],
  exports: [JwtService],
})
export class JwtModule {}
