import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('PostgreSQL conectado com sucesso'))
  .catch((err) => console.error('Erro ao conectar no PostgreSQL:', err));

