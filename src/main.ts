import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const QUEUES = [
  // 'bla',
  'bla.bla',
  // 'bla.lab',
  // 'bla.lab.bla'
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  QUEUES.forEach((queue) =>
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/'],
        queue,
        noAck: false,
        persistent: true,
        deserializer: {
          deserialize(value) {
            return { pattern: queue, data: value };
          },
        },
      },
    }),
  );

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
