import { Controller, Inject, Post } from '@nestjs/common';

import { IMessageBroker } from './interfaces/IMessageBroker';
import { TYPES } from './types/types';

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
}
