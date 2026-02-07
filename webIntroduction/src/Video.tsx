import React from 'react';
import { Series } from 'remotion';
import { Scene1_Achievement } from './scenes/Scene1_Achievement';
import { Scene2_Identity } from './scenes/Scene2_Identity';
import { Scene3_Home } from './scenes/Scene3_Home';
import { Scene3_Updates } from './scenes/Scene3_Updates';
import { Scene3_Schedule } from './scenes/Scene3_Schedule';
import { Scene3_Timeline } from './scenes/Scene3_Timeline';
import { Scene4_AI } from './scenes/Scene4_AI';
import { Scene5_DataSource } from './scenes/Scene5_DataSource';
import { Scene6_CTA } from './scenes/Scene6_CTA';
import { sceneTiming } from './styles/theme';

// 计算每个场景的时长
const { 
  scene1, scene2, scene3_home, scene3_updates, 
  scene3_schedule, scene3_timeline, scene4_ai, 
  scene5_data, scene6_cta 
} = sceneTiming;

export const Video: React.FC = () => {
  return (
    <Series>
      {/* Scene 1: 超级金满贯介绍 0-10s */}
      <Series.Sequence durationInFrames={scene1.duration}>
        <Scene1_Achievement />
      </Series.Sequence>

      {/* Scene 2: 网站身份 10-15s */}
      <Series.Sequence durationInFrames={scene2.duration}>
        <Scene2_Identity />
      </Series.Sequence>

      {/* Scene 3.1: 首页板块 15-22s */}
      <Series.Sequence durationInFrames={scene3_home.duration}>
        <Scene3_Home />
      </Series.Sequence>

      {/* Scene 3.2: 动态板块 22-29s */}
      <Series.Sequence durationInFrames={scene3_updates.duration}>
        <Scene3_Updates />
      </Series.Sequence>

      {/* Scene 3.3: 赛事板块 29-38s */}
      <Series.Sequence durationInFrames={scene3_schedule.duration}>
        <Scene3_Schedule />
      </Series.Sequence>

      {/* Scene 3.4: 大事记板块 38-45s */}
      <Series.Sequence durationInFrames={scene3_timeline.duration}>
        <Scene3_Timeline />
      </Series.Sequence>

      {/* Scene 4: AI板块 45-50s */}
      <Series.Sequence durationInFrames={scene4_ai.duration}>
        <Scene4_AI />
      </Series.Sequence>

      {/* Scene 5: 数据来源 50-55s */}
      <Series.Sequence durationInFrames={scene5_data.duration}>
        <Scene5_DataSource />
      </Series.Sequence>

      {/* Scene 6: 结尾CTA 55-60s */}
      <Series.Sequence durationInFrames={scene6_cta.duration}>
        <Scene6_CTA />
      </Series.Sequence>
    </Series>
  );
};
