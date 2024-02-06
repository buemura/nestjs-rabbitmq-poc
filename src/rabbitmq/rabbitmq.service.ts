import { Injectable } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

import { IMessageBroker } from '../interfaces/IMessageBroker';

@Injectable()
export class RabbitMqService implements IMessageBroker {
  private connection: Connection;
  private channel: Channel;

  async connect(url: string) {
    this.connection = await connect(url);
    this.channel = await this.connection.createChannel();
  }

  publishMessage(exchange: string, routingKey: string, message: unknown) {
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
    );
    console.log('[PRODUCER] ::', { exchange, routingKey, message });
  }
}
