import { Test, TestingModule } from '@nestjs/testing';
import { ImgProcessorController } from '../../src/img-processor/img-processor.controller';

describe('ImgProcessorController', () => {
  let controller: ImgProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgProcessorController],
    }).compile();

    controller = module.get<ImgProcessorController>(ImgProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
