import React from 'react';
import { 
  AbsoluteFill, 
  Img, 
  staticFile, 
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

// 蜂巢数据
const honeycombData = [
  ['青年赛事'], 
  ['亚运会', '全运会'], 
  ['亚洲杯', '奥运会', '全锦赛'], 
  ['亚锦赛', '世锦赛', '世界杯', 'ITTF'],
  ['地表最强', 'WTT', 'WTT', 'WTT', '德国杯', '军运会']
];

export const Scene3_Home: React.FC = () => {
  const frame = useCurrentFrame();
  // 在 Series.Sequence 中，useCurrentFrame() 已经返回相对帧数（从0开始）
  const relativeFrame = frame;

  // 标题动画
  const titleOpacity = interpolate(relativeFrame, [0, 30], [0, 1]);
  const titleY = interpolate(relativeFrame, [0, 30], [40, 0]);

  // 蜂巢动画
  const honeycombOpacity = interpolate(relativeFrame, [30, 60], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.primary.dark }}>
      {/* 背景图 */}
      <Img
        src={staticFile('images/hero-1.jpg')}
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
            首页
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
            textAlign: 'center',
          }}
        >
          超级全满贯荣誉墙
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
          115个冠军完整记录 · 16个赛事类别
        </p>

        {/* 蜂巢金字塔可视化 */}
        <div
          style={{
            opacity: honeycombOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '-10px',
          }}
        >
          {honeycombData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '-15px',
              }}
            >
              {row.map((item, colIndex) => {
                const delay = rowIndex * 8 + colIndex * 4;
                const itemProgress = Math.min(1, Math.max(0, (relativeFrame - 60 - delay) / 20));
                const itemScale = 0.5 + itemProgress * 0.5;
                const itemOpacity = itemProgress;

                return (
                  <div
                    key={colIndex}
                    style={{
                      width: rowIndex === 0 ? '100px' : rowIndex === 4 ? '70px' : '85px',
                      height: rowIndex === 0 ? '115px' : rowIndex === 4 ? '80px' : '98px',
                      background: rowIndex === 0 || rowIndex === 4 && colIndex % 5 === 0 
                        ? `linear-gradient(135deg, #b8860b, #8b6914)`
                        : `linear-gradient(135deg, ${colors.gold.DEFAULT}, ${colors.gold.dark})`,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px',
                      transform: `scale(${itemScale})`,
                      opacity: itemOpacity,
                      boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: rowIndex === 4 ? '14px' : '16px',
                        fontWeight: 700,
                        color: '#1a1a2e',
                        textAlign: 'center',
                        lineHeight: 1.2,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 统计信息 */}
        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            gap: '60px',
            opacity: interpolate(relativeFrame, [150, 180], [0, 1]),
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 800,
                color: colors.gold.DEFAULT,
              }}
            >
              115
            </div>
            <div style={{ fontSize: '24px', color: colors.text.secondary }}>
              总冠军数
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 800,
                color: colors.gold.DEFAULT,
              }}
            >
              16
            </div>
            <div style={{ fontSize: '24px', color: colors.text.secondary }}>
              赛事类别
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
