import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  ForbiddenException,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  findAll(@GetUser() user: User) {
    // Only admins can see all users
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Forbidden');
    }
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() data: UpdateUserDto,
  ) {
    if (user.id !== +id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Forbidden');
    }
    return this.userService.update(+id, data);
  }

  @Patch('approve/:id')
  approve(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() data: UpdateStatusDto,
  ) {
    // Only admins can approve users
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Forbidden');
    }
    return this.userService.approve(+id, data);
  }
}
