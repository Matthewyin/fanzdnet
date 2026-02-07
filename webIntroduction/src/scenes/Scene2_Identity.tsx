import React from 'react';
import { 
  AbsoluteFill, 
  Img, 
  staticFile, 
  useCurrentFrame,
  interpolate,
  spring,
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

export const Scene2_Identity: React.FC = () => {
  const frame = useCurrentFrame();
  // 在 Series.Sequence 中，useCurrentFrame() 已经返回相对帧数（从0开始）
  const relativeFrame = frame;

  // Logo动画
  const logoScale = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 12, stiffness: 100 },
  });

  // 文字动画
  const textOpacity = interpolate(relativeFrame, [30, 60], [0, 1]);
  const textY = interpolate(relativeFrame, [30, 60], [30, 0]);

  // 副标题动画
  const subtitleOpacity = interpolate(relativeFrame, [60, 90], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.primary.dark }}>
      {/* 背景图 */}
      <Img
        src={staticFile('images/OlympicsCamp.avif')}
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

      {/* 金色装饰线 */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          right: '10%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${colors.gold.DEFAULT}, transparent)`,
          opacity: interpolate(relativeFrame, [0, 40], [0, 0.5]),
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
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${0.8 + logoScale * 0.2})`,
            marginBottom: '50px',
          }}
        >
          <Img
            src={staticFile('logo.jpeg')}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '24px',
              boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.2)`,
            }}
          />
        </div>

        {/* 网站名称 */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            marginBottom: '30px',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 800,
              color: colors.gold.DEFAULT,
              margin: 0,
              textShadow: '0 4px 30px rgba(255, 215, 0, 0.5)',
              letterSpacing: '2px',
            }}
          >
            Fanzd.net
          </h1>
        </div>

        {/* 副标题 */}
        <div
          style={{
            opacity: subtitleOpacity,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '44px',
              color: colors.text.primary,
              margin: '0 0 16px 0',
              fontWeight: 600,
            }}
          >
            一个球迷的个人网站
          </p>
          <p
            style={{
              fontSize: '36px',
              color: colors.text.secondary,
              margin: 0,
            }}
          >
            记录 · 分享 · 致敬
          </p>
        </div>
      </div>

      {/* 底部装饰线 */}
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '10%',
          right: '10%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${colors.gold.DEFAULT}, transparent)`,
          opacity: interpolate(relativeFrame, [30, 70], [0, 0.5]),
        }}
      />
    </AbsoluteFill>
  );
};
