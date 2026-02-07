import React from 'react';
import { 
  AbsoluteFill, 
  Img, 
  staticFile, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate,
  spring,
  Sequence
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

// 冠军数据
const championStats = [
  { icon: '🥇', label: '奥运会', count: 3 },
  { icon: '🏆', label: '世界杯', count: 8 },
  { icon: '🥇', label: '世锦赛', count: 9 },
  { icon: '🏅', label: '全运会', count: 6 },
];

export const Scene1_Achievement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { duration } = sceneTiming.scene1;

  // 背景图动画
  const bgScale = interpolate(frame, [0, duration], [1.1, 1], {
    extrapolateRight: 'clamp',
  });
  const bgOpacity = interpolate(frame, [0, 30], [0, 1]);

  // 标题动画
  const titleOpacity = interpolate(frame, [30, 60], [0, 1]);
  const titleY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateRight: 'clamp',
  });

  // "唯一超级金满贯" 打字机效果
  const fullText = "唯一超级金满贯";
  const textProgress = Math.min(1, Math.max(0, (frame - 60) / 60));
  const charsToShow = Math.floor(fullText.length * textProgress);
  const displayText = fullText.slice(0, charsToShow);

  // 115数字动画
  const numberScale = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // 数据卡片动画
  const cardStartFrame = 180;
  
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
          transform: `scale(${bgScale})`,
          opacity: bgOpacity,
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

      {/* 金色光晕效果 */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: `radial-gradient(ellipse, rgba(255, 215, 0, 0.15) 0%, transparent 70%)`,
          opacity: interpolate(frame, [60, 120], [0, 1]),
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
        {/* 标题区域 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: colors.gold.DEFAULT,
              margin: 0,
              textShadow: '0 4px 30px rgba(255, 215, 0, 0.5)',
              letterSpacing: '4px',
            }}
          >
            樊振东
          </h1>
        </div>

        {/* 副标题 - 打字机效果 */}
        <div
          style={{
            height: '60px',
            marginBottom: '50px',
          }}
        >
          <h2
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: colors.text.primary,
              margin: 0,
              letterSpacing: '2px',
            }}
          >
            {displayText}
            {frame < 120 && (
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '42px',
                  backgroundColor: colors.gold.DEFAULT,
                  marginLeft: '4px',
                  animation: 'blink 0.8s infinite',
                }}
              />
            )}
          </h2>
        </div>

        {/* 115数字 */}
        <div
          style={{
            transform: `scale(${0.5 + numberScale * 0.5})`,
            opacity: frame > 120 ? 1 : 0,
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '160px',
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.gold.light} 0%, ${colors.gold.DEFAULT} 50%, ${colors.gold.dark} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(255, 215, 0, 0.5)',
            }}
          >
            115
          </span>
        </div>

        <div
          style={{
            fontSize: '32px',
            color: colors.text.secondary,
            marginBottom: '60px',
            opacity: frame > 150 ? 1 : 0,
          }}
        >
          个冠军
        </div>

        {/* 数据卡片 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          {championStats.map((stat, index) => {
            const cardDelay = cardStartFrame + index * 15;
            const cardProgress = Math.min(1, Math.max(0, (frame - cardDelay) / 20));
            const cardY = (1 - cardProgress) * 30;
            const cardOpacity = cardProgress;

            return (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: `translateY(${cardY}px)`,
                  opacity: cardOpacity,
                }}
              >
                <span style={{ fontSize: '36px', marginBottom: '8px' }}>{stat.icon}</span>
                <span style={{ fontSize: '28px', fontWeight: 700, color: colors.gold.DEFAULT }}>
                  {stat.count}金
                </span>
                <span style={{ fontSize: '20px', color: colors.text.secondary }}>
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* 省略号 */}
        <div
          style={{
            marginTop: '30px',
            fontSize: '32px',
            color: colors.text.muted,
            opacity: frame > 260 ? 1 : 0,
            letterSpacing: '8px',
          }}
        >
          . . .
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </AbsoluteFill>
  );
};
