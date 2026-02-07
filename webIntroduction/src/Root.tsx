import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { Video } from './Video';

// 视频配置
const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;
const FPS = 30;
const DURATION_IN_SECONDS = 60;
const DURATION_IN_FRAMES = FPS * DURATION_IN_SECONDS;

export const Root: React.FC = () => {
  return (
    <Composition
      id="Video"
      component={Video}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      defaultProps={{}}
    />
  );
};

registerRoot(Root);
