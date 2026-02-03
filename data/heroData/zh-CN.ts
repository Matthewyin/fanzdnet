// 樊振东大事记数据 - 更新到2026年2月1日
import { HeroEvent, HeroEventType } from '~/types/firestore'

export const heroDataZh = [
  {
    url: 'https://placehold.co/1920x1080/0a1428/FFF?text=Fanzd.net',
    title: '',
    subtitle: '',
    quote: '',
    description: '',
    isOpening: true,
    openingText: [
      '在竞技体育中，有些运动员参加比赛。',
      '而另一些，他们改变比赛。',
      '他们用身体重新定义物理极限，',
      '用意志铸就无人能及的王朝。',
      '在乒乓球这项速度与力量的艺术中，',
      '我们正身处在这样一个世界，',
      '一个由他，定义的世界。'
    ]
  },
  {
    url: '/images/carousel/hero-1.jpg', imgPosition: 'right top',
    title: '2016 · 德国 萨尔布吕肯 · 世界杯',
    subtitle: '初露锋芒——首夺世界杯',
    quote: '"世界知道他的名字，但他们还不了解他的野心。"',
    description: '那一年，他还只是一个19岁的少年，一个天赋异禀的"挑战者"。但在德国的赛场上，他用最纯粹的力量和渴望，撕碎了所有的既定剧本。这不是一次胜利，这是一次宣告。一个新时代的王子，踏上了属于他的领地。'
  },
  {
    url: '/images/carousel/hero-2.jpg', imgPosition: 'right top',
    title: '2018 · 法国 巴黎 · 世界杯',
    subtitle: '领地宣誓——卫冕世界杯',
    quote: '"当人们以为你已经到达顶峰，你必须向他们展示，顶峰之上，还有天空。"',
    description: '两年后，他不再是挑战者，他是被挑战的王。在欧洲传奇的主场，面对山呼海啸的对手拥趸，他必须赢，以此证明他的统治不是偶然。他走进对手的宫殿，然后平静地把它变成了自己的。这是一种成熟，更是一种宣示。'
  },
  {
    url: '/images/carousel/hero-3.jpg',
    title: '2019 · 中国 成都 · 世界杯',
    subtitle: '捍卫王座——三夺世界杯',
    quote: '"真正的王者，不惧怕任何前来叩门的挑战者。在他的王国里，他就是律法。"',
    description: '卫冕，比第一次夺冠更难。因为它考验的不是天赋，而是意志。在自己的国土上，压力变成了具体的、可触摸的东西。对手是年轻的、无畏的、渴望颠覆旧秩序的新星。但樊振东用行动告诉世界：时代，还不是你的。'
  },
  {
    url: '/images/carousel/hero-4.jpg',
    title: '2020 · 中国 威海 · 世界杯',
    subtitle: '铸就神话——四夺世界杯，达成世界杯三连冠',
    quote: '"要成为传奇，你必须击败传奇。在决赛的第七局，一切技术都已褪去，那是一场灵魂的较量。"',
    description: '三连冠。这个前无古人的纪录，是在击败了神之后，亲手为自己戴上的。他不再是王子，他建立了自己的王朝。一场七局的史诗，一场意志力的极限拉扯，将对手脖子踩在脚下。'
  },
  {
    url: '/images/carousel/hero-5.jpg', imgPosition: 'center top',
    title: '2021 · 美国 休斯敦 · 世乒赛',
    subtitle: '驱逐心魔——首夺世乒赛',
    quote: '"有些奖杯，你不是为了战胜对手而赢，而是为了战胜过去的自己。"',
    description: '4-0的比分背后，是多年等待的终结。他终于亲手抓住了那个"鬼魂"，完成了自我救赎。圣·勃莱德杯，世锦赛的王冠，是他心中萦绕多年的"鬼魂"。他曾两次无限接近，又两次看着它从指缝溜走。这一次，他不再允许有任何意外。'
  },
  {
    url: '/images/carousel/hero-6.jpg',
    title: '2023 · 南非 德班 · 世乒赛',
    subtitle: '传承与压制——卫冕世乒赛',
    quote: '"最危险的敌人，是那个和你穿着同样队服、和你一同训练、最了解你的年轻人。"',
    description: '他赢了。向所有人，尤其是向未来证明：我的时代，还没有结束。王座之下，新的继承人已经崭露头角。这场决赛，既是队友间的切磋，也是王权的交接仪式……或者说，是现任国王对权杖的再一次紧握。'
  },
  {
    url: '/images/carousel/hero-7.jpg',
    title: '2024 · 法国 巴黎 · 奥运会',
    subtitle: '王权加冕——首夺奥运会男单冠军',
    quote: '"人们总说，拿到这枚金牌，你就拥有一切。但他们错了。拿到它，一切才刚刚开始。因为从这一刻起，你不再是追逐者，你就是那座山。"',
    description: '奥运会。这是最后的圣杯，是通往万神殿的唯一门票。他背负着一个时代的重量走上决赛场，对手是宿命的重逢，仿佛历史的剧本早已写好，只等他亲手翻开最后一页。这不是为纪录而战，也不是为头衔而战。这是为"应得的"而战。金牌挂上脖颈的那一刻，超级金满贯的钟声敲响。樊振东，这个名字，从此与不朽并列。他没有完成最后一舞，他只是开启了一个由他定义的新时代。'
  }
]

export const heroEventsData: HeroEvent[] = [
  // === 2024年 ===
  {
    date: '2024-12-27',
    year: '2024',
    title: '宣布退出世界排名',
    description: '通过社交媒体发文宣布将退出世界排名系统,但明确表示"不会退役",继续参加国内赛事和俱乐部比赛。这是对WTT新规中不参赛就罚款政策的回应。',
    eventType: HeroEventType.Announcement,
    location: null
  },

  // === 2025年 ===
  {
    date: '2025-06-01',
    year: '2025',
    title: '正式加盟德国萨尔布吕肯俱乐部',
    description: '与德国萨尔布吕肯俱乐部正式签约,加盟2025-2026赛季德国乒乓球甲级联赛(TTBL)和欧洲冠军联赛。基础年薪120万欧元,创外国球员加盟德甲的历史新高。',
    eventType: HeroEventType.Transfer,
    location: '德国萨尔布吕肯'
  },
  {
    date: '2025-09-06',
    year: '2025',
    title: '德甲第2轮 - 迎来首胜',
    description: '客场挑战巴特柯尼希斯霍芬队,樊振东在第二盘3:1战胜Zeljko Filip,第四盘3:1战胜Andre Bertelsmeier,取得个人德甲首胜,帮助球队3:0获胜。',
    eventType: HeroEventType.Tournament,
    location: '德国',
    score: '3-0',
    opponent: '巴特柯尼希斯霍芬'
  },
  {
    date: '2025-09-14',
    year: '2025',
    title: '德甲第3轮 - 继续连胜',
    description: '樊振东3:0战胜Cedric Nuytinck,帮助球队3:0轻取贝格诺伊施塔特队。',
    eventType: HeroEventType.Tournament,
    location: '德国',
    score: '3-0',
    opponent: '贝格诺伊施塔特'
  },
  {
    date: '2025-11-15',
    year: '2025',
    title: '全运会男单半决赛 - 击败王楚钦',
    description: '在澳门银河综艺馆上演巅峰对话,樊振东以4:2击败当时世界排名第一的王楚钦,率先挺进决赛。这场比赛展现了樊振东即使在无世界排名的情况下,依然是世界顶尖水平。',
    eventType: HeroEventType.Tournament,
    location: '中国澳门'
  },
  {
    date: '2025-11-16',
    year: '2025',
    title: '第十五届全运会男单冠军 - 成卫冕成功',
    description: '在上海队选手林诗栋一度9:4领先的情况下,樊振东连追7分逆转首局。之后状态爆发,连下三城,以11:5、11:3、11:4的比分获得冠军。这是樊振东在全运会男单项目上的第二次夺冠,成功卫冕。',
    eventType: HeroEventType.WorldChampionship,
    location: '中国澳门',
    achievements: ['全运会男单冠军', '第六枚全运会金牌', '成卫冕成功'],
    finalStanding: '冠军',
    score: '4:1',
    opponent: '林诗栋'
  },
  {
    date: '2025-11-18',
    year: '2025',
    title: '第十五届全运会团体决赛 - 个人轮次战胜王楚钦',
    description: '第十五届全运会乒乓球男团决赛中，樊振东在个人轮次中战胜王楚钦，为团队贡献关键得分。',
    eventType: HeroEventType.Tournament,
    location: '中国澳门',
    finalStanding: '亚军',
    score: null,
    opponent: '北京队'
  },
  {
    date: '2025-12-14',
    year: '2025',
    title: '德甲第10轮 - 主场胜利',
    description: '萨尔布吕肯俱乐部主场3:0战胜奥克森豪森队,樊振东在第二盘3:0战胜对手,为球队锁定胜局。',
    eventType: HeroEventType.Tournament,
    location: '德国',
    score: '3-0',
    opponent: '奥克森豪森队'
  },

  // === 2026年 ===
  {
    date: '2026-01-04',
    year: '2026',
    title: '德国杯半决赛 - 首秀开门红',
    description: '德国杯新年首秀中,樊振东在第二盘和第四盘连续出场,以3:1战胜葡萄牙17岁小将阿比奥顿,为球队2:1战平卫冕冠军奥克森豪森队,晋级决赛。',
    eventType: HeroEventType.Tournament,
    location: '德国新乌尔姆',
    score: '3-1',
    opponent: '奥克森豪森队'
  },
  {
    date: '2026-01-05',
    year: '2026',
    title: '德国杯冠军 - 留洋首冠',
    description: '德国杯决赛4日在德国新乌尔姆市举行。首盘樊振东3:0横扫德国名将奥恰洛夫,为萨尔布吕肯先拔头筹。第四盘樊振东3:0战胜菲卢斯,为球队锁定胜局。一天四战全胜,当选MVP。这是樊振东加盟萨尔布吕肯俱乐部以来获得的首个冠军。',
    eventType: HeroEventType.WorldChampionship,
    location: '德国新乌尔姆',
    achievements: ['德国杯冠军', '留洋首冠', 'MVP'],
    finalStanding: '冠军',
    score: '3-1',
    opponent: '富尔达马伯策尔'
  },
  {
    date: '2026-01-13',
    year: '2026',
    title: '德甲第12轮 - 独得2分惜败',
    description: '在德甲第12轮比赛中,萨尔布吕肯主场2:3负于多特蒙德队。樊振东在第二盘3:0战胜米诺,第四盘3:0击败世界冠军卡尔森,独得2分,但队友先后失利,球队最终失利。',
    eventType: HeroEventType.Tournament,
    location: '德国',
    score: '2-3',
    opponent: '多特蒙德'
  },
  {
    date: '2026-02-20',
    year: '2026',
    title: '欧冠1/4决赛首回合 - 3:0获胜',
    description: '在欧冠1/4决赛首回合比赛中,樊振东在第二盘3:2逆转法国名将西蒙·高茨,帮助球队客场3:0战胜法国亨尼邦队,在两回合较量中抢占先机。',
    eventType: HeroEventType.Tournament,
    location: '法国',
    score: '3-0',
    opponent: '法国亨尼邦队'
  }
]
