import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(private readonly config: ConfigService) {
    this.s3 = new S3({
      accessKeyId: config.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: config.get('S3_SECRET_ACCESS_KEY'),
      region: config.get('S3_REGION'),
    });
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: 'user-registration-portal-assessment-regov',
          Body: dataBuffer,
          Key: `upload/${uuid()}-${filename}`,
        })
        .promise();

      return {
        key: uploadResult.Key,
        url: uploadResult.Location,
      };
    } catch (err) {
      console.log(err);
      return { key: 'error', url: err.message };
    }
  }
}
