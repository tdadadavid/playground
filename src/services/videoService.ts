import {RequestsArgs, ReturnValue} from "../utils";

/**
 * @author @Anonymous.
 */
export class VideoService {

    /**
     * @description removes audio from a video file
     * @param {RequestsArgs}
     * @returns {Promise<ReturnValue>}
     */
    async removeAudio({}: RequestsArgs): Promise<ReturnValue> {
        return {}
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
    async addNewAudio({}: RequestsArgs): Promise<ReturnValue>{
        return {}
    }
}
