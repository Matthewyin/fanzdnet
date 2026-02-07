import { Config } from "@remotion/cli/config";

export const config: Config = {
  // 视频尺寸: 1080x1920 (垂直视频)
  width: 1080,
  height: 1920,
  // 帧率: 30fps
  fps: 30,
  // 默认时长: 60秒
  durationInFrames: 1800,
  // 默认渲染: mp4
  defaultCodec: "h264",
};

export default config;
