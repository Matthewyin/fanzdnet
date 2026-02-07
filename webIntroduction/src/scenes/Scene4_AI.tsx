import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

export const Scene4_AI: React.FC = () => {
  const frame = useCurrentFrame();
  // 在 Series.Sequence 中，useCurrentFrame() 已经返回相对帧数（从0开始）
  const relativeFrame = frame;

  // 标题动画
  const titleOpacity = interpolate(relativeFrame, [0, 30], [0, 1]);
  const titleY = interpolate(relativeFrame, [0, 30], [40, 0]);

  // 卡片动画
  const cardScale = interpolate(relativeFrame, [50, 80], [0.8, 1]);
  const cardOpacity = interpolate(relativeFrame, [50, 80], [0, 1]);

  // 按钮脉冲效果
  const pulseScale = 1 + Math.sin(relativeFrame * 0.15) * 0.05;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, rgba(88, 28, 135, 0.9) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(30, 58, 138, 0.9) 100%)`,
      }}
    >
      {/* 紫色光晕装饰 */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          opacity: interpolate(relativeFrame, [0, 60], [0, 1]),
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          opacity: interpolate(relativeFrame, [20, 80], [0, 1]),
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
          padding: '80px 40px',
        }}
      >
        {/* 板块标签 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'rgba(168, 85, 247, 0.25)',
              border: '1px solid rgba(168, 85, 247, 0.5)',
              borderRadius: '50px',
              fontSize: '44px',
              color: colors.purple.light,
              fontWeight: 600,
            }}
          >
            ✨ AI 灵感站
          </span>
        </div>

        {/* 主标题 */}
        <h2
          style={{
            fontSize: '52px',
            fontWeight: 700,
            color: colors.text.primary,
            margin: '0 0 20px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
            textShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
          }}
        >
          AI 创意生成
        </h2>

        <p
          style={{
            fontSize: '28px',
            color: colors.text.secondary,
            margin: '0 0 60px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
          }}
        >
          应援物设计灵感
        </p>

        {/* 灵感卡片 */}
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            overflow: 'hidden',
            transform: `scale(${cardScale})`,
            opacity: cardOpacity,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 40px rgba(168, 85, 247, 0.15)',
          }}
        >
          {/* 卡片头部 */}
          <div
            style={{
              background: 'rgba(168, 85, 247, 0.15)',
              padding: '24px 32px',
              borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '28px' }}>✨</span>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 600,
                color: colors.purple.light,
              }}
            >
              创意灵感
            </span>
          </div>

          {/* 卡片内容 */}
          <div
            style={{
              padding: '48px 40px',
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontSize: '36px',
                fontStyle: 'italic',
                color: colors.text.primary,
                textAlign: 'center',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              "设计一款樊振东主题的应援灯牌，融合金色乒乓拍元素与星空背景，展现他作为超级全满贯得主的王者风范..."
            </p>
          </div>

          {/* 卡片按钮 */}
          <div
            style={{
              padding: '24px 32px',
              background: 'rgba(168, 85, 247, 0.1)',
              borderTop: '1px solid rgba(168, 85, 247, 0.2)',
              display: 'flex',
              gap: '16px',
            }}
          >
            <button
              style={{
                flex: 1,
                padding: '16px 24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: colors.text.primary,
                fontSize: '20px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              📋 复制
            </button>
            <button
              style={{
                flex: 1,
                padding: '16px 24px',
                background: `linear-gradient(135deg, ${colors.purple.DEFAULT}, #6366f1)`,
                border: 'none',
                borderRadius: '12px',
                color: colors.text.primary,
                fontSize: '20px',
                fontWeight: 600,
                cursor: 'pointer',
                transform: `scale(${pulseScale})`,
                boxShadow: `0 8px 25px rgba(168, 85, 247, 0.4)`,
              }}
            >
              ✨ 给我一条灵感！
            </button>
          </div>
        </div>

        {/* 推荐工具 */}
        <div
          style={{
            marginTop: '50px',
            display: 'flex',
            gap: '20px',
            opacity: interpolate(relativeFrame, [100, 130], [0, 1]),
          }}
        >
          {['Midjourney', 'DALL·E', 'Stable Diffusion'].map((tool) => (
            <div
              key={tool}
              style={{
                padding: '16px 28px',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '20px',
                color: colors.text.secondary,
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
