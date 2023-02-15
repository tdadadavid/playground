import {Router} from "express";
import { controllerHandler } from "../commons";
import {VideoService} from "../services";
import multer from "multer";
import {addNewAudioSchema, getMetaDataSchema, removeAudioSchema} from "../commons";
import {command} from "../services/ffmpegService";

export const router = Router();

/**
 * @desc File storage configuration
 */
const storage = multer.diskStorage({
  destination: '../../tmp/'
})
const upload = multer({ storage, });

/**
 * @desc video manipulation service.
 */
const videoService: VideoService = new VideoService(command);

/**
 * @desc routers [endpoints].
 * endpoints to edit media files.
 */
router.use(upload.single('file'))
  .post('/rm-audio',controllerHandler(videoService.removeAudio, removeAudioSchema))
  .post('/meta-video',controllerHandler(videoService.getMetadata, getMetaDataSchema))
  .post('/new-audio', controllerHandler(videoService.addNewAudio, addNewAudioSchema));

/**
 * @desc routers [endpoints].
 * endpoints to get edited media files.
 */
router
  .get('/video/:videoName', controllerHandler(videoService.getVideo))
