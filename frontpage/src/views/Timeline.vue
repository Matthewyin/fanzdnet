<template>
  <div class="timeline-page">
    <el-container>
      <el-main>
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">樊振东大事记</h1>
          <p class="page-subtitle">记录樊振东职业生涯的重要时刻</p>
        </div>

        <!-- 时间线内容 -->
        <div class="timeline-container">
          <div class="timeline-item" v-for="(event, index) in timelineEvents" :key="index">
            <div class="timeline-marker">
              <div class="timeline-dot"></div>
              <div class="timeline-line" v-if="index < timelineEvents.length - 1"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-date">{{ event.date }}</div>
              <h3 class="timeline-title">{{ event.title }}</h3>
              <p class="timeline-description">{{ event.description }}</p>
              <div class="timeline-tags" v-if="event.tags">
                <el-tag v-for="tag in event.tags" :key="tag" size="small" type="primary">
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 时间线事件数据
const timelineEvents = ref([
  {
    date: '2025年',
    title: '继续征战国际赛场',
    description: '作为中国乒乓球队的核心力量，继续在各项国际赛事中为国争光。',
    tags: ['现在', '国际赛事']
  },
  {
    date: '2023年5月',
    title: '世界乒乓球锦标赛男单冠军',
    description: '在德班世乒赛上夺得男单冠军，实现了个人职业生涯的重大突破。',
    tags: ['世界冠军', '男单']
  },
  {
    date: '2021年7月',
    title: '东京奥运会男团金牌',
    description: '与队友合作夺得东京奥运会乒乓球男团金牌，为国家赢得荣誉。',
    tags: ['奥运会', '团体冠军']
  },
  {
    date: '2019年',
    title: '世界排名第一',
    description: '首次登上世界排名第一的宝座，成为中国乒乓球新生代的领军人物。',
    tags: ['世界第一', '里程碑']
  },
  {
    date: '2016年',
    title: '首次参加奥运会',
    description: '在里约奥运会上首次亮相奥运赛场，展现了年轻选手的实力。',
    tags: ['奥运首秀', '里约']
  },
  {
    date: '2012年',
    title: '进入国家队',
    description: '正式进入中国乒乓球国家队，开始了职业生涯的新篇章。',
    tags: ['国家队', '职业起步']
  },
  {
    date: '1997年1月22日',
    title: '出生',
    description: '樊振东出生于广东广州，从小展现出对乒乓球的天赋和热爱。',
    tags: ['出生', '广州']
  }
])
</script>

<style scoped>
.timeline-page {
  background: linear-gradient(135deg, #e3f2fd 0%, #f8f9ff 50%, #ffffff 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  padding: 60px 16px 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 36px;
  color: #1565c0;
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.timeline-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px 80px;
}

.timeline-item {
  display: flex;
  margin-bottom: 40px;
  position: relative;
}

.timeline-marker {
  flex-shrink: 0;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  background: #1565c0;
  border-radius: 50%;
  border: 3px solid #e3f2fd;
  box-shadow: 0 2px 8px rgba(21, 101, 192, 0.3);
  z-index: 2;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, #1565c0, #e3f2fd);
  margin-top: 8px;
}

.timeline-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(33, 150, 243, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(33, 150, 243, 0.15);
}

.timeline-date {
  font-size: 14px;
  color: #1565c0;
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-title {
  font-size: 20px;
  color: #303133;
  margin-bottom: 12px;
  font-weight: 600;
}

.timeline-description {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 16px;
}

.timeline-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .page-header {
    padding: 40px 16px 30px;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .page-subtitle {
    font-size: 14px;
  }
  
  .timeline-container {
    padding: 0 16px 60px;
  }
  
  .timeline-marker {
    margin-right: 20px;
  }
  
  .timeline-content {
    padding: 20px;
  }
  
  .timeline-title {
    font-size: 18px;
  }
  
  .timeline-description {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }
  
  .timeline-marker {
    margin-right: 16px;
  }
  
  .timeline-content {
    padding: 16px;
  }
  
  .timeline-title {
    font-size: 16px;
  }
}
</style>
