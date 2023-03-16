import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3();
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
