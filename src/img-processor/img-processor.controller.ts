import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ImageProcessingRequestDto } from './dto/image-processing-request.dto';
import { ImgProcessorService } from './img-processor.service';

@Controller('img-processor')
export class ImgProcessorController {
  constructor(
    @Inject('IMG_POCESSING_SERVICE')
    private imageProcessingService: ClientProxy,
    private readonly imgProcessorService: ImgProcessorService,
  ) {}

  @EventPattern({ cmd: 'add-request' })
  async addRequest(data: ImageProcessingRequestDto) {
    console.log(
      'Rasult of extraction: ' +
        (await this.imgProcessorService.extractText(data.requestUrl)),
    );
  }

  @Post()
  async sendProcessingRequest(@Body() dto: ImageProcessingRequestDto) {
    return this.imageProcessingService.emit({ cmd: 'add-request' }, dto);
  }
}
