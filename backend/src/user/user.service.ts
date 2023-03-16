import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'USER',
      },
    });
    // Remove password from response
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    // Remove password from response
    delete user.password;
    return user;
  }

  approve(id: number, data: UpdateStatusDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        status: data.status,
      },
    });
  }

  // User can update their own profile except approved status
  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
