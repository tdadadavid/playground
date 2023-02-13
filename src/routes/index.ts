import {Router} from "express";
import { controllerHandler } from "../commons/controlHandler";
import {VideoService} from "../services";
import multer from "multer";

export const router = Router();

const upload = multer({ dest: '/tmp' });

const videoService: VideoService = new VideoService();

router.use(upload.single('file'))
  .post('/rm-audio',controllerHandler(videoService.removeAudio))
  .post('/meta-video',controllerHandler(videoService.getMetadata))
  .post('/new-audio', controllerHandler(videoService.addNewAudio));
