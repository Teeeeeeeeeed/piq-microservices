import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.TCP,
        name: 'ITEMS',
        options: {
          port: 3001,
        },
      },
      {
        transport: Transport.TCP,
        name: 'RECOMMENDATIONS',
        options: {
          port: 3002,
        },
      },
      {
        transport: Transport.TCP,
        name: 'RESTAURANTS',
        options: {
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
