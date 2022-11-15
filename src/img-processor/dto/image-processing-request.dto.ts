/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUrl } from 'class-validator';

export class ImageProcessingRequestDto {
  @IsNotEmpty()
  @IsUrl()
  readonly requestUrl: string;
}