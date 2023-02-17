import {RequestsArgs, ReturnValue} from "../utils";
import {FfmpegCommand} from "fluent-ffmpeg";
import {MediaProcessingError} from "../commons";
import path from "path";
import {randomUUID} from "crypto";

//TODO: so the video is processing check on how to stream it
//TODO: I also think I need to store the processed file in a folder
//TODO: then create an endpoint to retrieve it.
//TODO: read on seeking in mp4

/**
 * @author @Anonymous.
 */
export class MediaService {

    constructor(public readonly manipulator: FfmpegCommand) {}
    /**
     * @description removes audio from a video file
     * @param {RequestsArgs} file
     * @returns {Promise<ReturnValue>}
     */
    removeAudio = async ({ file }: RequestsArgs): Promise<ReturnValue> => {
        const [extension, outputPath] = this.getFilePathAndExtension(file);
        const output = this.manipulator.input(file.path)
          .noAudio()
          .format(extension)
          .on('progress', (data) => {
              console.log(`Processing is at ${data.percent.toFixed(2)} %`)
          })
          .on('end', () => console.log("done!!!"))
          .on('error', (error) => {
            throw new MediaProcessingError("Error: " + error.message);
          })
          .save(outputPath);

        const outputFileName = (output as any)['_outputs'][0]['target'].split('/').at(-1);
        return {
          code: 200,
          message: "Audio content removed in a giffy",
          data: {
              file: outputFileName,
          }
        }
    }

  /**
   * @description removes all frames from a video input.
   * @param {RequestsArgs} file
   * @returns {Promise<ReturnValue>}
   */
  removeVideo = async ({ file }: RequestsArgs): Promise<ReturnValue> => {
    const [extension, outputMediaPath] = this.getFilePathAndExtension(file, 'mp3');
    const output = this.manipulator.input(file.path)
      .format(extension)
      .noVideo()
      .save(outputMediaPath)

    const outputFileName = (output as any)['_outputs'][0]['target'].split('/').at(-1);

    return {
        code: 200,
        message: "Video frames are being removed",
        data: outputFileName,
      }
    }

    /**
     * @description extracts and sends video metadata
     * @param {RequestsArgs}
     * @returns {Promise<ReturnValue>}
     */
    async getMetadata({}: RequestsArgs): Promise<ReturnValue> {
        return {}
    }

    /**
     * @description removes the existing audio in the video file
     * and adds a new audio to it.
     * @param {RequestsArgs}
     * @returns {Promise<ReturnValue>}
     */
    async addNewAudio({}: RequestsArgs): Promise<ReturnValue> {
        return {}
    }

    getVideo = async ({ param }: RequestsArgs): Promise<ReturnValue> => {
        return {};
    }

    private getFilePathAndExtension = (file: Express.Multer.File, extension?: string ): Array<string>  => {

      if(!extension){ extension = file.originalname.split('.')[1]; }

      const fileName = file.originalname;
      const randomId = randomUUID().toString();
      const outputMediaPath = path.join(__dirname, `../../media/output/${fileName}-${randomId}.${extension}`);
      return [extension, outputMediaPath];
    }
}
