import {RequestsArgs, ReturnValue} from "../utils";
import {FfmpegCommand} from "fluent-ffmpeg";
import * as fs from "fs";
import {MediaProcessingError} from "../commons";
import path from "path";
/**
 * @author @Anonymous.
 */
export class VideoService {

    constructor(public readonly manipulator: FfmpegCommand) {}
    /**
     * @description removes audio from a video file
     * @param {RequestsArgs}
     * @returns {Promise<ReturnValue>}
     */
    removeAudio = async ({ file }: RequestsArgs): Promise<ReturnValue> => {
        const output = await this.manipulator.input(file.path)
          .noAudio()
          .format('ismv')
          .on('start', () => {
            console.log('Processing started')
          })
          .on('progress', (data) => {
            console.log('Current progress', data.percent)
          })
          .on('end', (data)=>{
            return {
              code: 200,
              message: "Audio content removed",
              data,
            }
          })
          .on('error', (error, inputStreamError, outputStreamError) => {
            console.log(inputStreamError, outputStreamError);
            throw new MediaProcessingError("Error:" + error.message);
          });

        console.log(output);

        //TODO: so the video is processing check on how to stream it
        //TODO: I also think I need to store the processed file in a folder
        //TODO: then create an endpoint to retrieve it.
        //TODO: read on seeking in mp4

        return {
          code: 200,
          message: "Audio content removed",
          data: output,
        }
    }

    /**
     * @description extracts and sends video dats
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
}
