import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ImgProcessorController } from './img-processor.controller';
import { ImgProcessorService } from './img-processor.service';

@Module({
  controllers: [ImgProcessorController],
  providers: [
    ImgProcessorService,
    {
      provide: 'IMG_POCESSING_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_QUEUE,
            queueOptions: {
              durable: true,
              noAck: true,
            },
          },
        });
      },
    },
  ],
})
export class ImgProcessorModule {}
