import { v4 as uuidv4 } from "uuid";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export type FileUpload = {
  fieldName: string;
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadStream;
};

export class S3ClientService {
  private static instance: S3ClientService;
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.COGNITO_REGION });
  }

  public static getInstance(): S3ClientService {
    if (!S3ClientService.instance) {
      S3ClientService.instance = new S3ClientService();
    }
    return S3ClientService.instance;
  }

  public async uploadImage(file: FileUpload): Promise<string> {
    const { createReadStream, filename, mimetype, encoding } = await file;
    const stream = createReadStream();

    const key = `uploads/${uuidv4()}-${filename}`;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: stream,
      ContentType: mimetype,
      ContentEncoding: encoding,
    };

    try {
      const upload = new Upload({
        client: this.s3Client,
        params: params,
      });
      await upload.done();
      return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.error("[uploadImage] error:", error);
      throw new Error(`Failed to upload image. ${JSON.stringify(error)}`);
    }
  }
}
