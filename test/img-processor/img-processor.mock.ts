/* eslint-disable prettier/prettier */
import { ImageProcessingRequestDto } from 'src/img-processor/dto/image-processing-request.dto';

export const validRequest: ImageProcessingRequestDto = {
  requestUrl: 'https://i.stack.imgur.com/i1Abv.png',
};

export const wrongFormatRequest: ImageProcessingRequestDto = {
  requestUrl: 'https://i.stack.imgur.com/i1Abv.svg',
};

export const invalidUrlRequest: ImageProcessingRequestDto = {
  requestUrl: 'some text',
};

export const unexistingFileRequest: ImageProcessingRequestDto = {
  requestUrl: 'https://iso.500px.com/wp-content/uploads.jpg',
};

export const recognizedText = 
`It was the best of
times, it was the worst
of times, it was the age
of wisdom, it was the
age of foolishness...`;

export const mockedImgProcessorService = {
  extractText: jest.fn(),
  checkImageFormat: jest.fn(),
  imageExists: jest.fn(),
};
