import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import { extname } from 'path';
import { access } from 'fs/promises';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ImgProcessorService {
  constructor(private readonly httpService: HttpService) {}

  async extractText(url: string) {
    try {
      await this.imageExists(url);
    } catch (error) {
      throw error;
    }

    const worker = createWorker();

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(url);
    await worker.terminate();

    return text;
  }

  checkImageFormat(url: string) {
    const format = extname(url);
    if (
      format.toLowerCase() === '.jpg' ||
      format.toLowerCase() === '.png' ||
      format.toLowerCase() === '.jpeg'
    ) {
      return true;
    }
    return false;
  }

  async imageExists(path: string) {
    await firstValueFrom(
      this.httpService.get<any>(path).pipe(
        catchError((error: AxiosError) => {
          throw "An error happened! Couldn't download file.";
        }),
      ),
    );
    return true;
  }
}
