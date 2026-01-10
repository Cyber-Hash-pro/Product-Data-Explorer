import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';


export const prisma = new PrismaClient();

async function bootstrap() {

  await prisma.$connect().then(() => {
    console.log('Connected to the database successfully.');

  }).catch((error) => {
    console.error('Error connecting to the database:', error);
  });


  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT));
}
bootstrap();
