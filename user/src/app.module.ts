import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'micro_auth',
      username: 'postgres',
      password: 'password',
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['src/migrations/*.ts'],
      synchronize: true, // never true in production!
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
