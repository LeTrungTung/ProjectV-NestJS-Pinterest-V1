import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

// import express from 'express';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(express.json()); // Sử dụng middleware bodyParser
  app.useGlobalPipes(new ValidationPipe());

  // Kích hoạt CORS
  const corsOrigin = [
    'http://localhost:5050',
    'http://localhost:5000',
    'http://localhost:8080',
  ];

  //middleware
  const corsOptions = {
    origin: corsOrigin,
    credentials: true, // access-control-allow-credentials: true
    optionsSuccessStatus: 200, // Sửa tên thuộc tính thành optionsSuccessStatus
  };

  app.enableCors(corsOptions);
  app.use(cookieParser());

  app.useStaticAssets('uploads'); // Serve ảnh từ thư mục uploads

  const PORT = process.env.APP_PORT || 8000;
  await app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
}
bootstrap();
