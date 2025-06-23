<template>
  <div class="interview-page">
    <el-container>
      <el-main>
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">樊振东专访</h1>
          <p class="page-subtitle">深度访谈，了解樊振东的内心世界</p>
        </div>

        <!-- 采访列表 -->
        <div class="interview-container">
          <div class="interview-card" v-for="(interview, index) in interviews" :key="index">
            <div class="interview-header">
              <div class="interview-meta">
                <span class="interview-date">{{ interview.date }}</span>
                <el-tag :type="interview.type === '视频' ? 'primary' : 'success'" size="small">
                  {{ interview.type }}
                </el-tag>
              </div>
              <h3 class="interview-title">{{ interview.title }}</h3>
              <p class="interview-source">来源：{{ interview.source }}</p>
            </div>
            
            <div class="interview-content">
              <p class="interview-excerpt">{{ interview.excerpt }}</p>
              
              <div class="interview-highlights" v-if="interview.highlights">
                <h4 class="highlights-title">精彩片段</h4>
                <ul class="highlights-list">
                  <li v-for="highlight in interview.highlights" :key="highlight">
                    {{ highlight }}
                  </li>
                </ul>
              </div>
              
              <div class="interview-actions">
                <el-button type="primary" size="small" @click="viewInterview(interview)">
                  阅读全文
                </el-button>
                <el-button size="small" @click="shareInterview(interview)">
                  分享
                </el-button>
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
import { ElMessage } from 'element-plus'

// 采访数据
const interviews = ref([
  {
    date: '2024年12月',
    title: '樊振东：永远保持对胜利的渴望',
    source: '中国体育报',
    type: '文字',
    excerpt: '在最新的专访中，樊振东谈到了自己对乒乓球的理解和对未来的规划。他表示，无论取得多少成就，都要保持对胜利的渴望和对技术的追求。',
    highlights: [
      '谈到技术提升：每天都在寻找可以改进的地方',
      '关于心态调整：比赛中要保持冷静和专注',
      '对年轻选手的建议：要有耐心，成功需要时间积累'
    ]
  },
  {
    date: '2024年10月',
    title: '世界冠军的成长之路',
    source: '央视体育',
    type: '视频',
    excerpt: '樊振东回顾了自己从青少年选手到世界冠军的成长历程，分享了训练中的酸甜苦辣和比赛中的心路历程。',
    highlights: [
      '回忆首次进入国家队的紧张心情',
      '分享世锦赛夺冠后的激动时刻',
      '感谢教练和队友的支持与帮助'
    ]
  },
  {
    date: '2024年8月',
    title: '技术革新与战术思考',
    source: '乒乓世界杂志',
    type: '文字',
    excerpt: '在这次深度访谈中，樊振东详细解析了自己的技术特点和战术理念，以及如何在比赛中应对不同类型的对手。',
    highlights: [
      '解析反手技术的演进过程',
      '分享对战术变化的理解',
      '谈论如何研究对手的打法'
    ]
  },
  {
    date: '2024年6月',
    title: '奥运梦想与团队精神',
    source: '新华社体育',
    type: '视频',
    excerpt: '樊振东谈到了对即将到来的奥运会的期待，以及中国乒乓球队的团队文化对自己成长的重要影响。',
    highlights: [
      '表达对奥运会的期待和准备',
      '强调团队合作的重要性',
      '分享与队友的友谊和竞争'
    ]
  }
])

// 方法
const viewInterview = (interview) => {
  ElMessage.info(`正在打开：${interview.title}`)
  // 这里可以实现跳转到详细页面的逻辑
}

const shareInterview = (interview) => {
  ElMessage.success(`已复制分享链接：${interview.title}`)
  // 这里可以实现分享功能
}
</script>

<style scoped>
.interview-page {
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

.interview-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px 80px;
}

.interview-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(33, 150, 243, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.interview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(33, 150, 243, 0.15);
}

.interview-header {
  margin-bottom: 20px;
}

.interview-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.interview-date {
  font-size: 14px;
  color: #1565c0;
  font-weight: 600;
}

.interview-title {
  font-size: 20px;
  color: #303133;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1.4;
}

.interview-source {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.interview-content {
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
}

.interview-excerpt {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 20px;
}

.interview-highlights {
  margin-bottom: 20px;
}

.highlights-title {
  font-size: 16px;
  color: #303133;
  margin-bottom: 12px;
  font-weight: 600;
}

.highlights-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.highlights-list li {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;
}

.highlights-list li::before {
  content: '•';
  color: #1565c0;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.interview-actions {
  display: flex;
  gap: 12px;
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
  
  .interview-container {
    padding: 0 16px 60px;
  }
  
  .interview-card {
    padding: 20px;
  }
  
  .interview-title {
    font-size: 18px;
  }
  
  .interview-excerpt {
    font-size: 13px;
  }
  
  .highlights-title {
    font-size: 15px;
  }
  
  .highlights-list li {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }
  
  .interview-card {
    padding: 16px;
  }
  
  .interview-title {
    font-size: 16px;
  }
  
  .interview-actions {
    flex-direction: column;
  }
}
</style>
