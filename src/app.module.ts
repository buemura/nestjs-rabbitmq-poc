import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMqModule],
  controllers: [AppController],
})
export class AppModule {}
