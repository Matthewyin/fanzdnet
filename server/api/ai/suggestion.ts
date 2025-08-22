
import { getFirestoreAdmin } from '~/server/utils/firebase'
import { COLLECTIONS } from '~/types/firestore'
import type { AIsuggestion, SupportedLanguage } from '~/types/firestore'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const language = (query.lang as SupportedLanguage) || 'zh'

    const db = getFirestoreAdmin()

    // 获取所有活跃的 AI 建议
    const suggestionsSnapshot = await db
      .collection(COLLECTIONS.AI_SUGGESTIONS)
      .where('isActive', '==', true)
      .get()

    if (suggestionsSnapshot.empty) {
      return {
        success: false,
        error: language === 'zh' ? '暂无灵感，请稍后再试。' : 'No inspiration available, please try again later.'
      }
    }

    // 收集所有建议文本
    const allSuggestions: string[] = []

    suggestionsSnapshot.docs.forEach(doc => {
      const data = doc.data() as AIsuggestion
      data.suggestions.forEach(suggestionGroup => {
        const text = suggestionGroup[language] || suggestionGroup.zh
        if (text) {
          allSuggestions.push(text)
        }
      })
    })

    if (allSuggestions.length === 0) {
      return {
        success: false,
        error: language === 'zh' ? '暂无该语言的灵感，请稍后再试。' : 'No inspiration available in this language, please try again later.'
      }
    }

    // 随机选择一个建议
    const randomIndex = Math.floor(Math.random() * allSuggestions.length)
    const suggestion = allSuggestions[randomIndex]

    return {
      success: true,
      suggestion: suggestion,
      language: language
    }

  } catch (error) {
    console.error('Error getting AI suggestion:', error)

    // 回退到静态建议
    const fallbackSuggestions = {
      zh: "设计一款应援毛巾，上面有樊振东的Q版卡通形象和他标志性的庆祝动作，背景是燃烧的乒乓球火焰",
      en: "Design a support towel featuring Fan Zhendong's Q-version cartoon image and his signature celebration pose, with burning ping pong ball flames in the background",
      fr: "Concevez une serviette de soutien avec l'image de dessin animé Q-version de Fan Zhendong et sa pose de célébration signature",
      de: "Entwerfen Sie ein Support-Handtuch mit Fan Zhendongs Q-Version-Cartoon-Bild und seiner charakteristischen Siegespose",
      ja: "樊振東のQバージョンのカートゥーンイメージと彼の特徴的な祝勝ポーズを描いた応援タオルをデザイン",
      ko: "팬 전동의 Q버전 만화 이미지와 그의 시그니처 세리머니 포즈가 있는 응원 타월을 디자인",
      sv: "Designa en supporthandduk med Fan Zhendongs Q-version tecknad bild och hans signaturpose för firande"
    }

    const query = getQuery(event)
    const language = (query.lang as SupportedLanguage) || 'zh'

    return {
      success: true,
      suggestion: fallbackSuggestions[language] || fallbackSuggestions.zh,
      language: language,
      fallback: true
    }
  }
})
