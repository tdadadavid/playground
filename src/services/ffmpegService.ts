import ffmpeg from "fluent-ffmpeg";
import ffmpegBinary from "@ffmpeg-installer/ffmpeg";

//@ts-ignore
import  ffprobeBinary from "@ffprobe-installer/ffprobe";

export const command = ffmpeg();

command.setFfmpegPath(ffmpegBinary.path);
command.setFfprobePath(ffprobeBinary.path);
