import React from 'react';
import { 
  AbsoluteFill, 
  Img, 
  staticFile, 
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

export const Scene6_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 在 Series.Sequence 中，useCurrentFrame() 已经返回相对帧数（从0开始）
  const relativeFrame = frame;

  // URL弹跳动画
  const urlScale = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // 副标题动画
  const subtitleOpacity = interpolate(relativeFrame, [40, 70], [0, 1]);
  const subtitleY = interpolate(relativeFrame, [40, 70], [30, 0]);

  // 粒子效果
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 5,
    x: Math.random() * 100 - 50,
    y: Math.random() * -100 - 50,
    size: Math.random() * 8 + 4,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.primary.dark }}>
      {/* 背景图 */}
      <Img
        src={staticFile('images/hero-7.jpg')}
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
          background: `linear-gradient(180deg, ${colors.overlay.medium} 0%, ${colors.overlay.heavy} 100%)`,
        }}
      />

      {/* 金色粒子效果 */}
      {particles.map((particle) => {
        const particleProgress = Math.min(1, Math.max(0, (relativeFrame - 60 - particle.delay) / 60));
        const particleY = particleProgress * particle.y;
        const particleOpacity = 1 - particleProgress;

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `50%`,
              top: '60%',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: colors.gold.DEFAULT,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 215, 0, 0.6)`,
              transform: `translate(${particle.x}px, ${particleY}px)`,
              opacity: particleOpacity,
            }}
          />
        );
      })}

      {/* 主内容 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 40px',
        }}
      >
        {/* 网址 */}
        <div
          style={{
            transform: `scale(${0.8 + urlScale * 0.2})`,
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '100px',
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.gold.light} 0%, ${colors.gold.DEFAULT} 50%, ${colors.gold.dark} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              textShadow: '0 0 60px rgba(255, 215, 0, 0.5)',
              letterSpacing: '4px',
            }}
          >
            fanzd.net
          </h1>
        </div>

        {/* 欢迎语 */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '52px',
              fontWeight: 600,
              color: colors.text.primary,
              margin: '0 0 16px 0',
            }}
          >
            欢迎樊振东球迷访问！
          </p>
          <p
            style={{
              fontSize: '36px',
              color: colors.text.secondary,
              margin: 0,
            }}
          >
            记录冠军之路，致敬超级金满贯
          </p>
        </div>

        {/* 装饰线 */}
        <div
          style={{
            marginTop: '60px',
            width: '200px',
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${colors.gold.DEFAULT}, transparent)`,
            opacity: interpolate(relativeFrame, [80, 110], [0, 1]),
          }}
        />

        {/* 底部小字 */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            opacity: interpolate(relativeFrame, [100, 130], [0, 1]),
          }}
        >
          <p
            style={{
              fontSize: '28px',
              color: colors.text.muted,
              margin: 0,
            }}
          >
            非官方球迷网站 · 仅供学习交流
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
