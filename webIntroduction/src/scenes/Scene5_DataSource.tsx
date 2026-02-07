import React from 'react';
import { 
  AbsoluteFill, 
  Img, 
  staticFile, 
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { colors, sceneTiming } from '../styles/theme';

export const Scene5_DataSource: React.FC = () => {
  const frame = useCurrentFrame();
  // 在 Series.Sequence 中，useCurrentFrame() 已经返回相对帧数（从0开始）
  const relativeFrame = frame;

  // 标题动画
  const titleOpacity = interpolate(relativeFrame, [0, 30], [0, 1]);
  const titleY = interpolate(relativeFrame, [0, 30], [40, 0]);

  // Logo动画
  const logoOpacity = interpolate(relativeFrame, [40, 70], [0, 1]);

  // 勾选动画
  const checkScale = interpolate(relativeFrame, [80, 100], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.primary.dark }}>
      {/* 背景图 */}
      <Img
        src={staticFile('images/hero-2.jpg')}
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
          justifyContent: 'center',
          padding: '80px 40px',
        }}
      >
        {/* 勾选图标 */}
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.gold.DEFAULT}, ${colors.gold.dark})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            transform: `scale(${checkScale})`,
            boxShadow: `0 0 40px rgba(255, 215, 0, 0.4)`,
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary.dark}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* 主标题 */}
        <h2
          style={{
            fontSize: '44px',
            fontWeight: 700,
            color: colors.text.primary,
            margin: '0 0 20px 0',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
          }}
        >
          数据来源于官方赛事记录
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
          力求准确可靠
        </p>

        {/* 数据来源标识 */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            opacity: logoOpacity,
          }}
        >
          {[
            { name: 'ITTF', full: '国际乒联' },
            { name: 'WTT', full: '世界乒联' },
            { name: 'CTTA', full: '中国乒协' },
          ].map((source, index) => {
            const delay = index * 15;
            const itemProgress = Math.min(1, Math.max(0, (relativeFrame - 70 - delay) / 25));
            const itemY = (1 - itemProgress) * 30;
            const itemOpacity = itemProgress;

            return (
              <div
                key={source.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '32px 48px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  textAlign: 'center',
                  transform: `translateY(${itemY}px)`,
                  opacity: itemOpacity,
                  minWidth: '160px',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 800,
                    color: colors.gold.DEFAULT,
                    marginBottom: '12px',
                    letterSpacing: '2px',
                  }}
                >
                  {source.name}
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    color: colors.text.secondary,
                  }}
                >
                  {source.full}
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部说明 */}
        <div
          style={{
            marginTop: '60px',
            padding: '24px 40px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: interpolate(relativeFrame, [120, 150], [0, 1]),
          }}
        >
          <p
            style={{
              fontSize: '32px',
              color: colors.text.muted,
              margin: 0,
              textAlign: 'center',
            }}
          >
            所有比赛数据均来自官方赛事记录，如有遗漏欢迎指正
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
