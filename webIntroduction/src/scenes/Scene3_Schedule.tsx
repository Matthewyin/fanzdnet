import React from 'react';
import { 
  AbsoluteFill, 
  Img, 
  staticFile, 
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

// 即将开始的比赛
const upcomingMatches = [
  { event: '德甲联赛', round: '第16轮', date: '2026-02-11', opponent: '格瑞扎', flag: '🇩🇪' },
  { event: '欧冠联赛', round: '1/4决赛', date: '2026-02-14', opponent: '亨尼邦', flag: '🇫🇷' },
];

// 历史战绩分类
const categories = [
  { label: '奥运会', icon: '🥇', count: 10 },
  { label: '全运会', icon: '🏆', count: 10 },
  { label: '德甲', icon: '🇩🇪', count: 11 },
  { label: '德国杯', icon: '⚽', count: 5 },
];

export const Scene3_Schedule: React.FC = () => {
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
        src={staticFile('images/hero-6.jpg')}
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
            赛事信息
          </span>
        </div>

        {/* 主标题 */}
        <h2
          style={{
            fontSize: '44px',
            fontWeight: 700,
            color: colors.text.primary,
            margin: '0 0 16px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
          }}
        >
          赛程战绩一站看
        </h2>

        <p
          style={{
            fontSize: '26px',
            color: colors.text.secondary,
            margin: '0 0 50px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
          }}
        >
          即将比赛 + 历史战绩
        </p>

        {/* 视图切换按钮 */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '40px',
            opacity: interpolate(relativeFrame, [40, 70], [0, 1]),
          }}
        >
          {['即将比赛', '历史战绩'].map((tab, index) => (
            <span
              key={tab}
              style={{
                padding: '14px 36px',
                background: index === 0 ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${index === 0 ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`,
                borderRadius: '14px',
                fontSize: '24px',
                color: index === 0 ? colors.gold.DEFAULT : colors.text.secondary,
                fontWeight: index === 0 ? 600 : 400,
              }}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* 即将比赛卡片 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            maxWidth: '800px',
            marginBottom: '40px',
          }}
        >
          {upcomingMatches.map((match, index) => {
            const delay = 80 + index * 20;
            const itemProgress = Math.min(1, Math.max(0, (relativeFrame - delay) / 25));
            const itemX = (1 - itemProgress) * 60;
            const itemOpacity = itemProgress;

            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '28px 32px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transform: `translateX(${itemX}px)`,
                  opacity: itemOpacity,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '40px',
                      color: colors.gold.DEFAULT,
                      marginBottom: '8px',
                      fontWeight: 600,
                    }}
                  >
                    {match.event} · {match.round}
                  </div>
                  <div style={{ fontSize: '18px', color: colors.text.muted }}>
                    {match.date}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', marginBottom: '4px' }}>
                    🇨🇳 VS {match.flag}
                  </div>
                  <div style={{ fontSize: '20px', color: colors.text.secondary }}>
                    樊振东 vs {match.opponent}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 分类筛选 */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: interpolate(relativeFrame, [140, 170], [0, 1]),
          }}
        >
          {categories.map((cat, index) => (
            <div
              key={cat.label}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                padding: '16px 24px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '28px' }}>{cat.icon}</span>
              <div>
                <div style={{ fontSize: '20px', color: colors.text.primary, fontWeight: 600 }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '16px', color: colors.text.muted }}>
                  {cat.count}场
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
