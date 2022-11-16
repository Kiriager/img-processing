import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ImageProcessingRequestDto } from './dto/image-processing-request.dto';
import { ImgProcessorService } from './img-processor.service';

@Controller('img-processor')
export class ImgProcessorController {
  constructor(
    @Inject('IMG_POCESSING_SERVICE')
    private readonly imageProcessingService: ClientProxy,
    private readonly imgProcessorService: ImgProcessorService,
  ) {}

  @EventPattern({ cmd: 'add-request' })
  async addRequest(data: ImageProcessingRequestDto) {
    try {
      console.log(
        'Result of extraction: ' +
          (await this.imgProcessorService.extractText(data.requestUrl)),
      );
    } catch (error) {
      console.error(error);
    }
  }

  @Post()
  async sendProcessingRequest(@Body() dto: ImageProcessingRequestDto) {
    if (!this.imgProcessorService.checkImageFormat(dto.requestUrl)) {
      throw new BadRequestException('Wrong format');
    }
    return this.imageProcessingService.emit({ cmd: 'add-request' }, dto);
  }
}
