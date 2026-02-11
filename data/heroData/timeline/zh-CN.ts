// 樊振东时间线数据 - 更新到2026年2月1日
import type { HeroEvent } from '~/types/firestore'
import { HeroEventType } from '~/types/firestore'

export const heroTimelineData: HeroEvent[] = [
  // === 2024年 ===
  {
    date: '2024-08',
    title: '巴黎奥运会男单冠军',
    description: '在2024年巴黎奥运会上,樊振东在队友王楚钦因实力不济出局的情况下,成功夺得男子单打金牌,成为集奥运会、世锦赛、世界杯、亚运会、亚锦赛、亚洲杯、巡回赛总决赛、全运会及全锦赛单打冠军于一身的"唯一超级金满贯"选手。',
    location: '法国巴黎',
    eventType: HeroEventType.WorldChampionship,
    achievements: ['奥运男单金牌', '超级全贯', '超级金满贯'],
    finalStanding: '冠军',
    score: '4-1'
  },

  // === 2025年 ===
  {
    date: '2025-06-01',
    title: '宣布退出世界排名',
    description: '通过社交媒体发文宣布将退出世界排名系统,但明确表示"不会退役",继续参加国内赛事和俱乐部比赛。',
    location: null,
    eventType: HeroEventType.Announcement,
    achievements: [],
    finalStanding: null,
    score: null
  },
  {
    date: '2025-06-01',
    title: '正式加盟德国萨尔布吕肯俱乐部',
    description: '与德国萨尔布吕肯俱乐部签下,征战2025-2026赛季德国乒乓球甲级联赛(TTBL)和欧洲冠军联赛。',
    location: '德国萨尔州',
    eventType: HeroEventType.Transfer,
    achievements: [],
    finalStanding: null,
    score: null
  },
  {
    date: '2025-11-15',
    title: '第十五届全运会男单半决赛 - 击败王楚钦',
    description: '在澳门银河综艺馆上演巅峰对话,樊振东以4:2击败当时世界排名第一的王楚钦,率先挺进决赛。这是继一年后在重要舞台上的再次碰撞。',
    location: '中国澳门',
    eventType: HeroEventType.Tournament,
    achievements: [],
    finalStanding: null,
    score: '4-2',
    opponent: '王楚钦'
  },
  {
    date: '2025-11-16',
    title: '第十五届全运会男单冠军',
    description: '在对手林诗栋一度9:4领先的情况下,樊振东连追7分逆转首局。之后状态爆发,连下三城,以11:5、11:3、11:4的比分获得冠军。成功卫冕,蝉联全运会男单冠军。',
    location: '中国澳门',
    eventType: HeroEventType.Tournament,
    achievements: ['全运会男单卫冕', '第六枚全运会金牌'],
    finalStanding: '冠军',
    score: '4-1',
    opponent: '林诗栋'
  },
  {
    date: '2025-11-18',
    title: '第十五届全运会男团银牌',
    description: '上海队团体决赛负于北京队,获得亚军。樊振东在团队比赛中打得更释放，实现赛事双杀对方选手。',
    location: '中国澳门',
    eventType: HeroEventType.Tournament,
    achievements: [],
    finalStanding: '亚军',
    score: null,
    opponent: '北京队'
  },

  // === 2026年 ===
  {
    date: '2026-01-04',
    title: '德国杯半决赛 - 首秀3:1胜17岁小将',
    description: '在德国杯新年首秀中,樊振东第二盘单打3:1战胜葡萄牙17岁小将阿比奥顿,为球队2:1战平卫冕冠军奥克森豪森队。',
    location: '德国新乌尔姆',
    eventType: HeroEventType.Tournament,
    achievements: [],
    finalStanding: null,
    score: '3-1',
    opponent: '阿比奥顿'
  },
  {
    date: '2026-01-05',
    title: '德国杯冠军 - 留德首冠',
    description: '德国杯决赛4日在德国新乌尔姆举行,樊振东所在的萨尔布吕肯俱乐部以3:1战胜富尔达马伯策尔俱乐部,夺得冠军，并获得杯赛MVP。这是樊振东加盟萨尔布吕肯俱乐部以来获得的首个冠军,也是他职业生涯正式比赛第115冠。',
    location: '德国新乌尔姆',
    eventType: HeroEventType.Tournament,
    achievements: ['德国杯冠军', '留德首冠', 'MVP'],
    finalStanding: '冠军',
    score: '3-1',
    opponent: '富尔达马伯策尔'
  },
  {
    date: '2026-01-14',
    title: '德甲第12轮 - 独得2分',
    description: '在德甲联赛第12轮比赛中,樊振东独得2分,帮助球队3:2逆转战胜积分榜排名第一的杜塞尔多夫队。',
    location: '德国',
    eventType: HeroEventType.Tournament,
    achievements: [],
    finalStanding: null,
    score: null,
    opponent: '杜塞尔多夫'
  },
  {
    date: '2026-02-20',
    title: '欧冠1/8决赛首秀 - 开门红',
    description: '在欧冠1/8决赛首回合比赛中,代表主队的中国运动员樊振东以3:0完胜对手,在职业生涯首场欧冠比赛中拿下"开门红"。',
    location: '德国',
    eventType: HeroEventType.Tournament,
    achievements: [],
    finalStanding: null,
    score: '3-0',
    opponent: '法国亨尼邦队'
  },
  {
    date: '2026-02-20',
    title: '欧冠1/4决赛 - 3:0获胜',
    description: '欧冠1/4决赛中,樊振东与队友莫雷加德、弗朗西斯卡组成的"三巨头"展现强势统治力,而赛后的趣味互动更是成为当日网坛热议话题。',
    location: '德国',
    eventType: HeroEventType.Tournament,
    achievements: [],
    finalStanding: null,
    score: '3-0',
    opponent: '法国亨尼邦队'
  },

  // === 按时间顺序 ===
]
