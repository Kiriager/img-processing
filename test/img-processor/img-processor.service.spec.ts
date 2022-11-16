import { Test, TestingModule } from '@nestjs/testing';
import { ImgProcessorService } from 'src/img-processor/img-processor.service';

describe('ImgProcessorService', () => {
  let service: ImgProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgProcessorService],
    }).compile();

    service = module.get<ImgProcessorService>(ImgProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
