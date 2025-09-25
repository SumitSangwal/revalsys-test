import RNFS from "react-native-fs";
import { VideoFile } from "react-native-vision-camera";

export const getVideoInfo = async (video: VideoFile) => {
  try {
    const stats = await RNFS.stat(video.path);
    const sizeInMB = stats.size / (1024 * 1024);

    const durationSec = video.duration;
    const minutes = Math.floor(durationSec / 60);
    const seconds = Math.floor(durationSec % 60);

    return {
      path: video.path,
      sizeMB: sizeInMB.toFixed(2),
      duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
      resolution: `${video.width}x${video.height}`,
    };
  } catch (error) {
    console.error("Error getting video info:", error);
    return null;
  }
};
