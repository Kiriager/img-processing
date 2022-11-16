import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ImgProcessorService } from 'src/img-processor/img-processor.service';
import { ImgProcessorController } from '../../src/img-processor/img-processor.controller';
import {
  mockedClientProxy,
  mockedImgProcessorService,
  validRequest,
} from './img-processor.mock';

describe('ImgProcessorController', () => {
  let controller: ImgProcessorController;
  let service: ImgProcessorService;
  let client: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgProcessorController],
      providers: [
        {
          provide: ImgProcessorService,
          useValue: mockedImgProcessorService,
        },
        {
          provide: 'IMG_POCESSING_SERVICE',
          useValue: mockedClientProxy,
        },
        {
          provide: ClientProxy,
          useValue: mockedClientProxy,
        },
      ],
    }).compile();

    controller = module.get<ImgProcessorController>(ImgProcessorController);
    service = module.get<ImgProcessorService>(ImgProcessorService);
    client = module.get<ClientProxy>(ClientProxy);
  });

  it('should add a new image processing request', async () => {
    expect(await controller.sendProcessingRequest(validRequest));
    expect(service.checkImageFormat).toBeCalledWith(validRequest.requestUrl);
  });

  it('should resolve in case of valid request', async () => {
    expect(controller.processRequest(validRequest)).resolves;
  });
});
