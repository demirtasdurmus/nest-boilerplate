// import { NestExpressApplication } from '@nestjs/platform-express';

import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { rainbow } from '@colors/colors/safe';

async function bootstrap() {
   /*
  When you pass a type to the NestFactory.create() method, as in the example below, the app object will
  have methods available exclusively for that specific platform.  Note, however, you don't need to 
  specify a type unless you actually want to access the underlying platform API.
  */
   // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
   const app = await NestFactory.create<INestApplication>(AppModule, {
      logger: ['warn', 'error', 'log', 'debug', 'verbose'], // LoggerService | LogLevel[] | false
      abortOnError: true, // default: true
      bufferLogs: false, // default false
      autoFlushLogs: true, // default:true
      cors: false, // | CorsOptions | CorsOptionsDelegate<any>;
      bodyParser: true, // use underlying platform bodyparser
      httpsOptions: undefined, // HttpsOptions
      rawBody: true, // Use `req.rawBody`
      forceCloseConnections: false, // Force close open HTTP connections.
   });

   await app.listen(3000, 'localhost', () => {
      Logger.log(`🚀 ${rainbow(`Nest server is awake on port:${3000}`)}`);
   });
}
bootstrap();
