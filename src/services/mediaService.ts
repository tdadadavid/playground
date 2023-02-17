import {RequestsArgs, ReturnValue} from "../utils";
import {FfmpegCommand} from "fluent-ffmpeg";
import {MediaProcessingError} from "../commons";
import { join } from "path";
import {randomBytes, randomUUID} from "crypto";
import {FileService} from "./fileService";

//TODO: so the video is processing check on how to stream it
//TODO: I also think I need to store the processed file in a folder
//TODO: then create an endpoint to retrieve it.
//TODO: read on seeking in mp4

/**
 * @author @Anonymous.
 */
export class MediaService {

    constructor(
      public readonly manipulator: FfmpegCommand,
      public readonly fileService: FileService
    ) {}
    /**
     * @description removes audio from a video file
     * @param {RequestsArgs} file
     * @returns {Promise<ReturnValue>}
     */
    removeAudio = async ({ file }: RequestsArgs): Promise<ReturnValue> => {
        const [extension, outputPath, fileName] = this.fileService.getFileInfo(file);
        this.manipulator.input(file.path)
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

        return {
          code: 200,
          message: "Audio content removed in a giffy",
          data: {
              file: fileName,
          }
        }
    }

  /**
   * @description removes all frames from a video input.
   * @param {RequestsArgs} file
   * @returns {Promise<ReturnValue>}
   */
  removeVideo = async ({ file }: RequestsArgs): Promise<ReturnValue> => {
    const [extension, outputMediaPath, fileName] = this.fileService.getFileInfo(file, 'mp3');
    this.manipulator.input(file.path)
      .format(extension)
      .noVideo()
      .save(outputMediaPath)

    return {
        code: 200,
        message: "Video frames are being removed",
        data: {
          file: fileName
        }
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
}
