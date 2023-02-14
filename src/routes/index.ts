import {Router} from "express";
import { controllerHandler } from "../commons";
import {VideoService} from "../services";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import {addNewAudioSchema, getMetaDataSchema, removeAudioSchema} from "../commons";

export const router = Router();
const upload = multer({ dest: '/tmp' });

const command = ffmpeg();
const videoService: VideoService = new VideoService(command);

router.use(upload.single('file'))
  .post('/rm-audio',controllerHandler(videoService.removeAudio, removeAudioSchema))
  .post('/meta-video',controllerHandler(videoService.getMetadata, getMetaDataSchema))
  .post('/new-audio', controllerHandler(videoService.addNewAudio, addNewAudioSchema));
