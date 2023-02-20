import {Router} from "express";
import multer, {StorageEngine} from "multer";
import {isContentTypeValid,controllerHandler} from "../middlewares";
import {
  removeVideoSchema,
  addNewAudioSchema,
  getMetaDataSchema,
  removeAudioSchema, extractAudioSchema,
} from "../commons";
import {
  command,
  FileService,
  MediaService
} from "../services";


export const router = Router();

/**
 * @desc File storage configuration
 */
const storage: StorageEngine = multer.diskStorage({
  destination: '../../tmp/'
})
const upload = multer({ storage, });

/**
 * @desc video manipulation service.
 */
const fileService: FileService = new FileService();
const mediaService: MediaService = new MediaService(command, fileService);

/**
 * @desc routers [endpoints].
 * endpoints to edit media files.
 */
router
  .use(isContentTypeValid) // middleware for validating multipart/form-data requests.
  .use(upload.single('file')) // middleware to extract files from the request.
  .post('/rm-audio',controllerHandler.handle(mediaService.removeAudio, removeAudioSchema))
  .post('/rm-video', controllerHandler.handle(mediaService.removeVideo, removeVideoSchema))
  .post('/meta-video',controllerHandler.handle(mediaService.getMetadata, getMetaDataSchema))
  .post('/new-audio', controllerHandler.handle(mediaService.addNewAudio, addNewAudioSchema))
  .post('/ex-audio', controllerHandler.handle(mediaService.extractAudio, extractAudioSchema))

/**
 * @desc routers [endpoints].
 * endpoints to get edited media files.
 */
router
  .get('/video/:videoName', controllerHandler.handle(mediaService.getVideo))
