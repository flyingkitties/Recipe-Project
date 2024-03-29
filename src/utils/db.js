/* eslint-disable operator-linebreak */
/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
