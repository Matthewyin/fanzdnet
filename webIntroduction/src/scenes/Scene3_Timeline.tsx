import React from 'react';
import { 
  AbsoluteFill, 
  Img, 
  staticFile, 
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

// 时间线里程碑
const milestones = [
  { year: '2013', title: '国家队首秀', desc: '16岁入选国家一队' },
  { year: '2016', title: '世界杯首冠', desc: '19岁夺得首个世界冠军' },
  { year: '2021', title: '世乒赛夺冠', desc: '首夺圣·勃莱德杯' },
  { year: '2024', title: '奥运大满贯', desc: '巴黎奥运会男单冠军' },
  { year: '2026', title: '征服欧洲', desc: '德国杯留洋首冠' },
];

export const Scene3_Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  // 在 Series.Sequence 中，useCurrentFrame() 已经返回相对帧数（从0开始）
  const relativeFrame = frame;

  // 标题动画
  const titleOpacity = interpolate(relativeFrame, [0, 30], [0, 1]);
  const titleY = interpolate(relativeFrame, [0, 30], [40, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.primary.dark }}>
      {/* 背景图 */}
      <Img
        src={staticFile('images/hero-5.jpg')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      
      {/* 深色遮罩 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: colors.overlay.heavy,
        }}
      />

      {/* 主内容 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '80px 40px',
        }}
      >
        {/* 板块标签 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: '30px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'rgba(255, 215, 0, 0.15)',
              border: '1px solid rgba(255, 215, 0, 0.4)',
              borderRadius: '50px',
              fontSize: '32px',
              color: colors.gold.DEFAULT,
              fontWeight: 600,
            }}
          >
            大事记
          </span>
        </div>

        {/* 主标题 */}
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: colors.text.primary,
            margin: '0 0 16px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          冠军之路
        </h2>

        <p
          style={{
            fontSize: '26px',
            color: colors.text.secondary,
            margin: '0 0 60px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          2013-2026 职业生涯全记录
        </p>

        {/* 时间线 */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            paddingLeft: '40px',
          }}
        >
          {/* 时间线主线 */}
          <div
            style={{
              position: 'absolute',
              left: '70px',
              top: '20px',
              bottom: '20px',
              width: '4px',
              background: `linear-gradient(180deg, ${colors.gold.DEFAULT}, ${colors.gold.dark})`,
              borderRadius: '2px',
              transform: `scaleY(${interpolate(relativeFrame, [50, 150], [0, 1])})`,
              transformOrigin: 'top',
            }}
          />

          {/* 里程碑 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
            }}
          >
            {milestones.map((milestone, index) => {
              const delay = 60 + index * 20;
              const itemProgress = Math.min(1, Math.max(0, (relativeFrame - delay) / 25));
              const itemX = (1 - itemProgress) * 40;
              const itemOpacity = itemProgress;

              return (
                <div
                  key={milestone.year}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '30px',
                    transform: `translateX(${itemX}px)`,
                    opacity: itemOpacity,
                  }}
                >
                  {/* 年份节点 */}
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: colors.gold.DEFAULT,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                      zIndex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '22px',
                        fontWeight: 800,
                        color: colors.primary.dark,
                      }}
                    >
                      {milestone.year}
                    </span>
                  </div>

                  {/* 内容卡片 */}
                  <div
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '38px',
                        fontWeight: 700,
                        color: colors.gold.DEFAULT,
                        margin: '0 0 8px 0',
                      }}
                    >
                      {milestone.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '28px',
                        color: colors.text.secondary,
                        margin: 0,
                      }}
                    >
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
