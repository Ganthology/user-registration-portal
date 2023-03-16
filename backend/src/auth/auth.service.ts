import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import * as argon from 'argon2';

import { AuthDto, RegisterDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  // Register user
  async register(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          fullName: dto.fullName,
          age: dto.age,
          address: dto.address,
          employment: dto.employment,
          job: dto.job,
          imageFront: dto.imageFront,
          imageBack: dto.imageBack,
          imageType: dto.imageType,
          role: 'USER',
        },
      });

      return {
        message: `User with email ${dto.email} has been registered.`,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // unique duplicate error
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `Email ${dto.email} is already registered.`,
          );
        }
      }
      throw error;
    }
  }

  async createAdmin(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          role: 'ADMIN',
        },
      });
      return {
        message: `Admin with email ${dto.email} has been created.`,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // unique duplicate error
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `Email ${dto.email} is already registered.`,
          );
        }
      }
      throw error;
    }
  }

  // Login user
  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user)
      throw new ForbiddenException(`User with email ${dto.email} not found`);

    const passwordMatches = await argon.verify(user.password, dto.password);

    if (!passwordMatches) throw new ForbiddenException(`Password is incorrect`);

    return this.signToken(user.id, user.email);
  }

  // Generate JWT token
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
