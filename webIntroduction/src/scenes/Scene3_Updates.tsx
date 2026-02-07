import React from 'react';
import { 
  AbsoluteFill, 
  Img, 
  staticFile, 
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

// 新闻卡片数据
const newsItems = [
  { category: '比赛', title: '德国杯夺冠！樊振东当选MVP', date: '2026-01-05' },
  { category: '比赛', title: '全运会男单卫冕成功', date: '2025-11-16' },
  { category: '媒体', title: '正式加盟德甲萨尔布吕肯俱乐部', date: '2025-06-01' },
  { category: '比赛', title: '巴黎奥运会男单夺冠', date: '2024-08-04' },
];

export const Scene3_Updates: React.FC = () => {
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
        src={staticFile('images/hero-3.jpg')}
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
            marginBottom: '40px',
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
            最新动态
          </span>
        </div>

        {/* 主标题 */}
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: colors.text.primary,
            margin: '0 0 20px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          资讯一手掌握
        </h2>

        <p
          style={{
            fontSize: '28px',
            color: colors.text.secondary,
            margin: '0 0 60px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          比赛 · 媒体 · 全覆盖
        </p>

        {/* 分类标签 */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '50px',
            opacity: interpolate(relativeFrame, [40, 70], [0, 1]),
          }}
        >
          {['全部', '比赛', '媒体'].map((cat, index) => (
            <span
              key={cat}
              style={{
                padding: '12px 28px',
                background: index === 0 ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${index === 0 ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '12px',
                fontSize: '30px',
                color: index === 0 ? colors.gold.DEFAULT : colors.text.secondary,
                fontWeight: index === 0 ? 600 : 400,
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* 新闻卡片网格 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            width: '100%',
            maxWidth: '900px',
          }}
        >
          {newsItems.map((item, index) => {
            const delay = 80 + index * 15;
            const itemProgress = Math.min(1, Math.max(0, (relativeFrame - delay) / 25));
            const itemY = (1 - itemProgress) * 40;
            const itemOpacity = itemProgress;

            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transform: `translateY(${itemY}px)`,
                  opacity: itemOpacity,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    background: item.category === '比赛' ? 'rgba(255, 215, 0, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                    borderRadius: '8px',
                    fontSize: '36px',
                    color: item.category === '比赛' ? colors.gold.DEFAULT : '#60a5fa',
                    marginBottom: '16px',
                  }}
                >
                  {item.category}
                </span>
                <h3
                  style={{
                    fontSize: '26px',
                    fontWeight: 600,
                    color: colors.text.primary,
                    margin: '0 0 12px 0',
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '18px',
                    color: colors.text.muted,
                    margin: 0,
                  }}
                >
                  {item.date}
                </p>
              </div>
            );
          })}
        </div>

        {/* 统计 */}
        <div
          style={{
            marginTop: '50px',
            display: 'flex',
            gap: '50px',
            opacity: interpolate(relativeFrame, [160, 190], [0, 1]),
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '24px 48px',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '40px', fontWeight: 700, color: colors.gold.DEFAULT }}>7</div>
            <div style={{ fontSize: '20px', color: colors.text.secondary }}>动态总数</div>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '24px 48px',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '40px', fontWeight: 700, color: colors.gold.DEFAULT }}>2</div>
            <div style={{ fontSize: '20px', color: colors.text.secondary }}>分类</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
