import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

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
        name: 'USER',
        options: {
          port: 3003,
        },
      },
    ]),
    AuthModule,
    ItemsModule,
    UserModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
