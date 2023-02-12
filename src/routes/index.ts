import {Router} from "express";
import { controllerHandler } from "../commons/controlHandler";
import { VidoeService } from "../services/getVideoMetaData";

const router = Router();

const videoService = new VidoeService();

router.post('/rm-audio', controllerHandler(videoService.removeAudio));