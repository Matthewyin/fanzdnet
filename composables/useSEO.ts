import type { SupportedLanguage } from '~/types/firestore'

interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
}

export const useSEO = () => {
  const currentLanguage = ref<SupportedLanguage>('zh')

  // 多语言 SEO 配置
  const seoConfig: Record<SupportedLanguage, Record<string, SEOConfig>> = {
    zh: {
      home: {
        title: '樊振东球迷网站 - Fanzd.net',
        description: '樊振东球迷网站，提供最新赛事动态、职业生涯时间线、AI灵感站等内容。关注乒乓球超级金满贯冠军樊振东精彩的职业生涯。',
        keywords: ['樊振东', '乒乓球', '超级金满贯', '奥运冠军', '世界冠军', '中国乒乓球', '体育', '球迷网站'],
        ogTitle: '樊振东球迷网站 - 乒乓球超级金满贯冠军',
        ogDescription: '探索樊振东的传奇职业生涯，从青年才俊到超级金满贯冠军的精彩历程。',
        ogImage: '/images/og/home-zh.jpg'
      },
      timeline: {
        title: '樊振东职业生涯大事记 - Fanzd.net',
        description: '回顾樊振东从2012年进入国家队到2024年奥运夺冠的完整职业生涯历程，见证乒乓球传奇的诞生。',
        keywords: ['樊振东', '职业生涯', '大事记', '时间线', '乒乓球历史', '冠军之路'],
        ogTitle: '樊振东职业生涯大事记 - 从青年才俊到超级金满贯冠军',
        ogDescription: '完整记录樊振东职业生涯的重要时刻和辉煌成就。'
      },
      'ai-gallery': {
        title: 'AI 灵感站 - 樊振东创意生成器 - Fanzd.net',
        description: '使用AI技术为樊振东球迷生成创意灵感，包括应援物品设计、壁纸创作、文案策划等多种创意内容。',
        keywords: ['樊振东', 'AI', '创意生成', '应援', '设计', '灵感', '球迷创作'],
        ogTitle: 'AI 灵感站 - 为樊振东球迷提供无限创意',
        ogDescription: '让AI为你的樊振东应援创作提供无限灵感和创意。'
      }
    },
    en: {
      home: {
        title: 'Fan Zhendong Unofficial Fan Site - Fanzd.net',
        description: 'Unofficial fan site for Fan Zhendong, featuring latest match updates, career timeline, AI gallery and more. Follow the Grand Slam champion\'s incredible journey.',
        keywords: ['Fan Zhendong', 'Table Tennis', 'Grand Slam', 'Olympic Champion', 'World Champion', 'Chinese Table Tennis', 'Sports', 'Fan Site'],
        ogTitle: 'Fan Zhendong Unofficial Fan Site - Table Tennis Grand Slam Champion',
        ogDescription: 'Explore Fan Zhendong\'s legendary career from young talent to Grand Slam champion.',
        ogImage: '/images/og/home-en.jpg'
      },
      timeline: {
        title: 'Fan Zhendong Career Timeline - Fanzd.net',
        description: 'Explore Fan Zhendong\'s complete career journey from joining the national team in 2012 to winning Olympic gold in 2024.',
        keywords: ['Fan Zhendong', 'Career', 'Timeline', 'Table Tennis History', 'Champion Journey'],
        ogTitle: 'Fan Zhendong Career Timeline - From Young Talent to Grand Slam Champion',
        ogDescription: 'Complete record of Fan Zhendong\'s career milestones and achievements.'
      },
      'ai-gallery': {
        title: 'AI Gallery - Fan Zhendong Creative Generator - Fanzd.net',
        description: 'Use AI technology to generate creative inspiration for Fan Zhendong fans, including support item designs, wallpapers, and creative content.',
        keywords: ['Fan Zhendong', 'AI', 'Creative Generation', 'Fan Support', 'Design', 'Inspiration', 'Fan Creation'],
        ogTitle: 'AI Gallery - Unlimited Creativity for Fan Zhendong Fans',
        ogDescription: 'Let AI provide unlimited inspiration for your Fan Zhendong fan creations.'
      }
    },
    fr: {
      home: {
        title: 'Site Non-Officiel des Fans de Fan Zhendong - Fanzd.net',
        description: 'Site non-officiel des fans de Fan Zhendong, avec les dernières actualités, chronologie de carrière, galerie IA et plus. Suivez le parcours incroyable du champion du Grand Chelem.',
        keywords: ['Fan Zhendong', 'Tennis de Table', 'Grand Chelem', 'Champion Olympique', 'Champion du Monde', 'Tennis de Table Chinois', 'Sports', 'Site de Fans'],
        ogTitle: 'Site Non-Officiel des Fans de Fan Zhendong - Champion du Grand Chelem de Tennis de Table',
        ogDescription: 'Explorez la carrière légendaire de Fan Zhendong, du jeune talent au champion du Grand Chelem.'
      },
      timeline: {
        title: 'Chronologie de la Carrière de Fan Zhendong - Fanzd.net',
        description: 'Explorez le parcours complet de Fan Zhendong depuis son entrée dans l\'équipe nationale en 2012 jusqu\'à sa victoire olympique en 2024.',
        keywords: ['Fan Zhendong', 'Carrière', 'Chronologie', 'Histoire du Tennis de Table', 'Parcours de Champion']
      },
      'ai-gallery': {
        title: 'Galerie IA - Générateur Créatif Fan Zhendong - Fanzd.net',
        description: 'Utilisez la technologie IA pour générer de l\'inspiration créative pour les fans de Fan Zhendong.',
        keywords: ['Fan Zhendong', 'IA', 'Génération Créative', 'Support des Fans', 'Design', 'Inspiration']
      }
    },
    de: {
      home: {
        title: 'Fan Zhendong Offizieller Fan-Site - Fanzd.net',
        description: 'Offizielle Fan-Site für Fan Zhendong mit neuesten Match-Updates, Karriere-Timeline, AI-Galerie und mehr.',
        keywords: ['Fan Zhendong', 'Tischtennis', 'Grand Slam', 'Olympiasieger', 'Weltmeister', 'Chinesisches Tischtennis', 'Sport', 'Fan-Site']
      },
      timeline: {
        title: 'Fan Zhendong Karriere-Timeline - Fanzd.net',
        description: 'Erkunden Sie Fan Zhendongs komplette Karrierereise von 2012 bis 2024.',
        keywords: ['Fan Zhendong', 'Karriere', 'Timeline', 'Tischtennis-Geschichte', 'Champion-Reise']
      },
      'ai-gallery': {
        title: 'AI-Galerie - Fan Zhendong Kreativ-Generator - Fanzd.net',
        description: 'Nutzen Sie AI-Technologie für kreative Inspiration für Fan Zhendong Fans.',
        keywords: ['Fan Zhendong', 'AI', 'Kreative Generierung', 'Fan-Unterstützung', 'Design', 'Inspiration']
      }
    },
    ja: {
      home: {
        title: '樊振東公式ファンサイト - Fanzd.net',
        description: '樊振東公式ファンサイト。最新試合情報、キャリアタイムライン、AIギャラリーなど。グランドスラムチャンピオンの素晴らしい旅路をフォロー。',
        keywords: ['樊振東', '卓球', 'グランドスラム', 'オリンピックチャンピオン', '世界チャンピオン', '中国卓球', 'スポーツ', 'ファンサイト']
      },
      timeline: {
        title: '樊振東キャリアタイムライン - Fanzd.net',
        description: '2012年のナショナルチーム入りから2024年のオリンピック金メダルまでの完全なキャリアを探索。',
        keywords: ['樊振東', 'キャリア', 'タイムライン', '卓球歴史', 'チャンピオンの道']
      },
      'ai-gallery': {
        title: 'AIギャラリー - 樊振東クリエイティブジェネレーター - Fanzd.net',
        description: 'AI技術を使用して樊振東ファンのためのクリエイティブなインスピレーションを生成。',
        keywords: ['樊振東', 'AI', 'クリエイティブ生成', 'ファンサポート', 'デザイン', 'インスピレーション']
      }
    },
    ko: {
      home: {
        title: '팬 전동 비공식 팬 사이트 - Fanzd.net',
        description: '팬 전동 비공식 팬 사이트. 최신 경기 업데이트, 커리어 타임라인, AI 갤러리 등. 그랜드 슬램 챔피언의 놀라운 여정을 팔로우하세요.',
        keywords: ['팬 전동', '탁구', '그랜드 슬램', '올림픽 챔피언', '세계 챔피언', '중국 탁구', '스포츠', '팬 사이트']
      },
      timeline: {
        title: '팬 전동 커리어 타임라인 - Fanzd.net',
        description: '2012년 국가대표팀 입단부터 2024년 올림픽 금메달까지의 완전한 커리어 여정을 탐색하세요.',
        keywords: ['팬 전동', '커리어', '타임라인', '탁구 역사', '챔피언의 길']
      },
      'ai-gallery': {
        title: 'AI 갤러리 - 팬 전동 크리에이티브 제너레이터 - Fanzd.net',
        description: 'AI 기술을 사용하여 팬 전동 팬들을 위한 창의적 영감을 생성하세요.',
        keywords: ['팬 전동', 'AI', '창의적 생성', '팬 서포트', '디자인', '영감']
      }
    },
    sv: {
      home: {
        title: 'Fan Zhendong Officiell Fan-sajt - Fanzd.net',
        description: 'Officiell fan-sajt för Fan Zhendong med senaste matchuppdateringar, karriärtidslinje, AI-galleri och mer.',
        keywords: ['Fan Zhendong', 'Bordtennis', 'Grand Slam', 'Olympisk Mästare', 'Världsmästare', 'Kinesisk Bordtennis', 'Sport', 'Fan-sajt']
      },
      timeline: {
        title: 'Fan Zhendong Karriärtidslinje - Fanzd.net',
        description: 'Utforska Fan Zhendongs kompletta karriärresa från 2012 till 2024.',
        keywords: ['Fan Zhendong', 'Karriär', 'Tidslinje', 'Bordtennis Historia', 'Mästarens Resa']
      },
      'ai-gallery': {
        title: 'AI-galleri - Fan Zhendong Kreativ Generator - Fanzd.net',
        description: 'Använd AI-teknik för att generera kreativ inspiration för Fan Zhendong-fans.',
        keywords: ['Fan Zhendong', 'AI', 'Kreativ Generering', 'Fan Support', 'Design', 'Inspiration']
      }
    }
  }

  // 获取页面 SEO 配置
  const getPageSEO = (page: string, language: SupportedLanguage = 'zh'): SEOConfig => {
    const langConfig = seoConfig[language] || seoConfig.zh
    const pageConfig = langConfig[page] || langConfig.home
    
    return {
      ...pageConfig,
      ogImage: pageConfig.ogImage || '/images/og/default.jpg',
      twitterImage: pageConfig.twitterImage || pageConfig.ogImage || '/images/og/default.jpg'
    }
  }

  // 设置页面 SEO
  const setPageSEO = (page: string, language: SupportedLanguage = 'zh', customConfig?: Partial<SEOConfig>) => {
    const config = getPageSEO(page, language)
    const finalConfig = { ...config, ...customConfig }

    // 设置页面标题和描述
    useHead({
      title: finalConfig.title,
      meta: [
        { name: 'description', content: finalConfig.description },
        { name: 'keywords', content: finalConfig.keywords.join(', ') },
        
        // Open Graph
        { property: 'og:title', content: finalConfig.ogTitle || finalConfig.title },
        { property: 'og:description', content: finalConfig.ogDescription || finalConfig.description },
        { property: 'og:image', content: finalConfig.ogImage },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Fanzd.net' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: finalConfig.twitterTitle || finalConfig.ogTitle || finalConfig.title },
        { name: 'twitter:description', content: finalConfig.twitterDescription || finalConfig.ogDescription || finalConfig.description },
        { name: 'twitter:image', content: finalConfig.twitterImage },
        
        // 语言和地区
        { name: 'language', content: language },
        { property: 'og:locale', content: getLocaleCode(language) },
        
        // 其他 SEO 标签
        { name: 'author', content: 'Fanzd.net' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        // Canonical URL
        { rel: 'canonical', href: getCanonicalUrl(page, language) },
        
        // Hreflang 标签
        ...generateHreflangLinks(page)
      ]
    })
  }

  // 获取语言代码
  const getLocaleCode = (language: SupportedLanguage): string => {
    const localeMap = {
      zh: 'zh_CN',
      en: 'en_US',
      fr: 'fr_FR',
      de: 'de_DE',
      ja: 'ja_JP',
      ko: 'ko_KR',
      sv: 'sv_SE'
    }
    return localeMap[language] || 'zh_CN'
  }

  // 获取规范 URL
  const getCanonicalUrl = (page: string, language: SupportedLanguage): string => {
    const baseUrl = 'https://fanzd.net'
    const path = page === 'home' ? '' : `/${page}`
    const langPrefix = language === 'zh' ? '' : `/${language}`
    
    return `${baseUrl}${langPrefix}${path}`
  }

  // 生成 hreflang 链接
  const generateHreflangLinks = (page: string) => {
    const links = []
    const supportedLanguages: SupportedLanguage[] = ['zh', 'en', 'es', 'fr', 'de', 'ja', 'ko', 'sv']
    
    for (const lang of supportedLanguages) {
      links.push({
        rel: 'alternate',
        hreflang: getLocaleCode(lang).replace('_', '-').toLowerCase(),
        href: getCanonicalUrl(page, lang)
      })
    }
    
    // 添加 x-default
    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: getCanonicalUrl(page, 'zh')
    })
    
    return links
  }

  // 生成结构化数据
  const generateStructuredData = (page: string, language: SupportedLanguage = 'zh') => {
    const config = getPageSEO(page, language)
    
    const baseStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Fanzd.net',
      description: config.description,
      url: 'https://fanzd.net',
      author: {
        '@type': 'Organization',
        name: 'Fanzd.net'
      },
      inLanguage: getLocaleCode(language).replace('_', '-').toLowerCase()
    }

    if (page === 'home') {
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://fanzd.net/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    }

    return baseStructuredData
  }

  return {
    currentLanguage: readonly(currentLanguage),
    getPageSEO,
    setPageSEO,
    generateStructuredData,
    getCanonicalUrl,
    generateHreflangLinks
  }
}
