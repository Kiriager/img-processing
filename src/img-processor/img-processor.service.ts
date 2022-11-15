import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class ImgProcessorService {
  constructor(private readonly httpService: HttpService) {}

  async extractText(url: string) {
    const worker = createWorker({
      logger: (m) => console.log(m),
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(url);
    await worker.terminate();

    return text;
  }
}
