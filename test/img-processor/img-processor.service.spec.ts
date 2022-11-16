/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ImgProcessorService } from 'src/img-processor/img-processor.service';
import {
  unexistingFileRequest,
  validRequest,
  wrongFormatRequest,
} from './img-processor.mock';

describe('ImgProcessorService', () => {
  let service: ImgProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgProcessorService],
      imports: [HttpModule],
    }).compile();

    service = module.get<ImgProcessorService>(ImgProcessorService);
  });

  it('should provide text value from image if valid path provided', async () => {
    let resultType = '';
    await service.extractText(validRequest.requestUrl).then((text) => {
      resultType = typeof text;
    });
    expect(resultType).toEqual('string');
  });

  it('should throw error if unexisting url was provided', async () => {
    let error = undefined;
    await service
      .extractText(unexistingFileRequest.requestUrl)
      .then()
      .catch((err) => {
        error = err;
      });
    expect(typeof error).toEqual('string');
  });

  it('should return false if incorrect file format was provided by url', async () => {
    expect(service.checkImageFormat(wrongFormatRequest.requestUrl)).toEqual(
      false,
    );
  });

  it('should return true if supported file format (jpg or png) was provided by url', async () => {
    expect(service.checkImageFormat(validRequest.requestUrl)).toEqual(true);
  });
});
