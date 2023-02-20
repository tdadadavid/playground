import {RequestsArgs, ReturnValue} from "../utils";
import {FfmpegCommand, FfprobeData} from "fluent-ffmpeg";
import {MediaProcessingError} from "../commons";
import {FileService} from "./fileService";

//TODO: so the video is processing check on how to stream it
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
      // get the file information
        const [extension, outputPath, fileName]: Array<string> = this.fileService.getFileInfo(file);
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

        // return the file name being processed.
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
    // get necessary file information
    const [extension, outputMediaPath, fileName]: Array<string> = this.fileService.getFileInfo(file, 'mp3');
    this.manipulator.input(file.path)
      .format(extension)
      .noVideo()
      .save(outputMediaPath)

    // return desired output
    return {
        code: 200,
        message: "Audio output will be ready soon",
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
    getMetadata = async ({ file }: RequestsArgs): Promise<ReturnValue> => {
      let result: any;
      await this.manipulator.input(file.path)
        .ffprobe((err: Error, data: FfprobeData): FfprobeData => {
          if (err){
            throw new MediaProcessingError(err.message);
          }
          result = data;
          return data;
        })
      //TODO: i have to stream this .
      return {
        code: 200,
        message: "You must be a Geek!!!",
        data: result,
      }
    }

    /**
     * @description removes the existing audio in the video file
     * and adds a new audio to it.
     * @param {RequestsArgs}
     * @returns {Promise<ReturnValue>}
     */
    addNewAudio = async ({}: RequestsArgs): Promise<ReturnValue> => {
        return {}
    }

    extractAudio = async ({file, body}: RequestsArgs): Promise<ReturnValue> => {
      const { startTime, endTime  } = body;

      // get the duration of audio to be extracted
      const duration: number = startTime - endTime;

      // extract file information
      const [outputMediaPath, fileName]: Array<string> = this.fileService.getFileInfo(file, 'mp3', 'extracted');
      this.manipulator.input(file.path)
            .setStartTime(startTime)
            .setDuration(duration)
            .output(outputMediaPath)
            .run();

      // return the file name for the user to fetch later.
      return {
        code: 200,
        message: "Extracting your desire from the noise around",
        data: {
          file: fileName,
        }
      }
    }

  /**
   * @description returns the processed video.
   * @param {RequestsArgs} param
   * @returns {Promise<ReturnValue>}
   */
  getVideo = async ({ param }: RequestsArgs): Promise<ReturnValue> => {
        return {};
    }
}
