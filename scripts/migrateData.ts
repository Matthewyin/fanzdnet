// 数据迁移脚本：将现有静态数据迁移到 Firestore
import { getFirestoreAdmin } from '../server/utils/firebase'
import { heroImages } from '../data/heroData'
import { timelineData } from '../data/timelineData'
import type { HeroItem, TimelineEvent, AIsuggestion, MultiLanguageText } from '../types/firestore'
import { COLLECTIONS } from '../types/firestore'

// AI 建议的多语言数据
const aiSuggestionsData = [
  {
    zh: "设计一款应援毛巾，上面有樊振东的Q版卡通形象和他标志性的庆祝动作，背景是燃烧的乒乓球火焰",
    en: "Design a support towel featuring Fan Zhendong's Q-version cartoon image and his signature celebration pose, with burning ping pong ball flames in the background",
    fr: "Concevez une serviette de soutien avec l'image de dessin animé Q-version de Fan Zhendong et sa pose de célébration signature, avec des flammes de balle de ping-pong brûlantes en arrière-plan",
    de: "Entwerfen Sie ein Support-Handtuch mit Fan Zhendongs Q-Version-Cartoon-Bild und seiner charakteristischen Siegespose, mit brennenden Tischtennisball-Flammen im Hintergrund",
    ja: "樊振東のQバージョンのカートゥーンイメージと彼の特徴的な祝勝ポーズを描いた応援タオルをデザインし、背景には燃える卓球ボールの炎を配置",
    ko: "팬 전동의 Q버전 만화 이미지와 그의 시그니처 세리머니 포즈가 있는 응원 타월을 디자인하고, 배경에는 타오르는 탁구공 불꽃을 넣어주세요",
    sv: "Designa en supporthandduk med Fan Zhendongs Q-version tecknad bild och hans signaturpose för firande, med brinnande pingisbolls-flammor i bakgrunden"
  },
  {
    zh: "生成一张手机壁纸，风格为赛博朋克，主体是樊振东的剪影，周围环绕着代表速度和力量的霓虹线条",
    en: "Generate a mobile wallpaper in cyberpunk style, featuring Fan Zhendong's silhouette surrounded by neon lines representing speed and power",
    fr: "Générez un fond d'écran mobile de style cyberpunk, avec la silhouette de Fan Zhendong entourée de lignes néon représentant la vitesse et la puissance",
    de: "Erstellen Sie ein Handy-Wallpaper im Cyberpunk-Stil mit Fan Zhendongs Silhouette, umgeben von Neonlinien, die Geschwindigkeit und Kraft darstellen",
    ja: "サイバーパンクスタイルのスマートフォン壁紙を生成し、樊振東のシルエットを中心に、スピードとパワーを表すネオンラインで囲む",
    ko: "사이버펑크 스타일의 휴대폰 배경화면을 생성하고, 팬 전동의 실루엣을 중심으로 속도와 힘을 나타내는 네온 라인으로 둘러싸세요",
    sv: "Generera en mobilbakgrund i cyberpunk-stil med Fan Zhendongs silhuett omgiven av neonlinjer som representerar hastighet och kraft"
  }
]

export async function migrateData() {
  const db = getFirestoreAdmin()
  
  try {
    console.log('开始数据迁移...')

    // 1. 迁移 Hero 数据
    console.log('迁移 Hero 数据...')
    for (let i = 0; i < heroImages.length; i++) {
      const item = heroImages[i]
      
      const heroItem: Omit<HeroItem, 'id'> = {
        url: item.url,
        isOpening: item.isOpening || false,
        order: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // 如果是开场项，添加开场文本
      if (item.isOpening && item.openingText) {
        heroItem.openingText = item.openingText.map(text => ({
          zh: text,
          en: text, // 暂时使用中文，后续需要翻译
          fr: text,
          de: text,
          ja: text,
          ko: text,
          sv: text
        }))
      }

      // 添加其他多语言字段
      if (item.title) {
        heroItem.title = {
          zh: item.title,
          en: item.title, // 暂时使用中文，后续需要翻译
          fr: item.title,
          de: item.title,
          ja: item.title,
          ko: item.title,
          sv: item.title
        }
      }

      if (item.subtitle) {
        heroItem.subtitle = {
          zh: item.subtitle,
          en: item.subtitle,
          fr: item.subtitle,
          de: item.subtitle,
          ja: item.subtitle,
          ko: item.subtitle,
          sv: item.subtitle
        }
      }

      if (item.quote) {
        heroItem.quote = {
          zh: item.quote,
          en: item.quote,
          fr: item.quote,
          de: item.quote,
          ja: item.quote,
          ko: item.quote,
          sv: item.quote
        }
      }

      if (item.description) {
        heroItem.description = {
          zh: item.description,
          en: item.description,
          fr: item.description,
          de: item.description,
          ja: item.description,
          ko: item.description,
          sv: item.description
        }
      }

      await db.collection(COLLECTIONS.HERO_ITEMS).add(heroItem)
    }

    // 2. 迁移时间线数据
    console.log('迁移时间线数据...')
    for (let i = 0; i < timelineData.length; i++) {
      const event = timelineData[i]
      
      const timelineEvent: Omit<TimelineEvent, 'id'> = {
        year: event.year,
        title: {
          zh: event.title,
          en: event.title, // 暂时使用中文，后续需要翻译
          fr: event.title,
          de: event.title,
          ja: event.title,
          ko: event.title,
          sv: event.title
        },
        description: {
          zh: event.description,
          en: event.description,
          fr: event.description,
          de: event.description,
          ja: event.description,
          ko: event.description,
          sv: event.description
        },
        order: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection(COLLECTIONS.TIMELINE_EVENTS).add(timelineEvent)
    }

    // 3. 迁移 AI 建议数据
    console.log('迁移 AI 建议数据...')
    for (let i = 0; i < aiSuggestionsData.length; i++) {
      const suggestion = aiSuggestionsData[i]
      
      const aiSuggestion: Omit<AIsuggestion, 'id'> = {
        suggestions: [suggestion], // 每个建议作为一个数组项
        category: 'general',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection(COLLECTIONS.AI_SUGGESTIONS).add(aiSuggestion)
    }

    console.log('数据迁移完成！')
    
  } catch (error) {
    console.error('数据迁移失败:', error)
    throw error
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  migrateData()
    .then(() => {
      console.log('迁移成功完成')
      process.exit(0)
    })
    .catch((error) => {
      console.error('迁移失败:', error)
      process.exit(1)
    })
}
