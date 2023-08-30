import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [AuthModule, ItemsModule, UserModule, RecommendationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
