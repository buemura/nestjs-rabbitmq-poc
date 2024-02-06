export interface IMessageBroker {
  publishMessage: (
    exchange: string,
    routingKey: string,
    message: unknown,
  ) => void;
}
