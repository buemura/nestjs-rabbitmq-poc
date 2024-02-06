import { Controller, Inject, Post } from '@nestjs/common';

import { IMessageBroker } from './interfaces/IMessageBroker';
import { TYPES } from './types/types';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject(TYPES.MessageBroker)
    private readonly messageBroker: IMessageBroker,
  ) {}

  @Post('publish')
  async publishMessage(): Promise<void> {
    this.messageBroker.publishMessage('test', 'bla.*', 'bla');
  }

  @EventPattern('bla.bla', Transport.RMQ)
  async blaBla(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: 'bla.bla', payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }
}
