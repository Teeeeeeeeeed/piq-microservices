import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ITEMS_PACKAGE_NAME, ITEMS_SERVICE_NAME } from './items.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ITEMS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: ITEMS_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/items.proto',
        },
      },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
