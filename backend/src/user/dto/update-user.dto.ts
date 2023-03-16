import { Prisma } from '@prisma/client';

export type UpdateUserDto = Omit<
  Prisma.UserUpdateInput,
  'role' | 'status' | 'updatedAt' | 'createdAt' | 'email' | 'password' | 'id'
>;
