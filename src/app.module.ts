import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImgProcessorModule } from './img-processor/img-processor.module';

@Module({
  imports: [ImgProcessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
