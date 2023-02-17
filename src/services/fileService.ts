import {join} from "path";
import {randomBytes} from "crypto";

export class FileService {
  public getFileInfo= (file: Express.Multer.File, desiredOutputExtension?: string, extra: string = "edited") => {
    let extension = this.getExtension(file, desiredOutputExtension);

    const fileName = `${this.generateOutputName(extra)}.${extension}`
    const outputMediaPath = join(__dirname, `../../media/output/${fileName}`);
    return [extension, outputMediaPath, fileName];
  }

  private getExtension = (file: Express.Multer.File, outputExtension?: string) => {
    return outputExtension ? outputExtension : file.originalname.split('.')[1];
  }

  private generateOutputName = (extra: string) => {
    const hexString = randomBytes(8).toString('hex');

    if (extra) return `${hexString}-${extra}`

    return hexString;
  }
}
