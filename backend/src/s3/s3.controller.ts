import {
  Controller,
  Post,
  UseInterceptors,
  // Request,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // @Request() req,
  ): Promise<any> {
    const result = await this.s3Service.uploadPublicFile(
      file.buffer,
      file.originalname,
    );
    return {
      key: result.key,
      url: result.url,
    };
  }
}
