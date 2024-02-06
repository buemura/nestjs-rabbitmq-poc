import { Module } from '@nestjs/common';

import { TYPES } from '../types/types';
import { RabbitMqService } from './rabbitmq.service';

@Module({
  providers: [
    {
      provide: TYPES.MessageBroker,
      useFactory: async () => {
        const rabbitmq = new RabbitMqService();
        await rabbitmq.connect('amqp://guest:guest@localhost:5672/');
        return rabbitmq;
      },
    },
  ],
  exports: [TYPES.MessageBroker],
})
export class RabbitMqModule {}
