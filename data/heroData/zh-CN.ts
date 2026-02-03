// 樊振东大事记数据 - 更新到2026年2月1日
import { HeroEvent, HeroEventType } from '~/types'

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
    description: '在上海队选手对手一度9:4领先的情况下,樊振东连追7分逆转首局。之后状态爆发,连下三城,以11:5、11:3、11:4的比分获得冠军。这是樊振东在全运会男单项目上的第二次夺冠,成功卫冕。',
    eventType: HeroEventType.WorldChampionship,
    location: '中国澳门',
    achievements: ['全运会男单冠军', '第六枚全运会金牌', '成卫冕成功'],
    finalStanding: '冠军',
    score: '4:1',
    opponent: '对手'
  },
  {
    date: '2025-11-18',
    year: '2025',
    title: '第十五届全运会团体决赛 - 个人轮次战胜',
    description: '第十五届全运会乒乓球男团决赛中，樊振东在第二盘和第四盘单打出场，均取得胜利，为团队贡献关键得分。',
    eventType: HeroEventType.Tournament,
    location: '中国澳门',
    finalStanding: '亚军',
    score: null,
    opponent: '北京队'
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
// === 德甲联赛数据 ===
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
    date: '2025-12-14',
    year: '2025',
    title: '德甲第10轮 - 主场胜利',
    description: '萨尔布吕肯俱乐部主场3:0战胜奥克森豪森队,樊振东在第二盘3:0战胜Kirill,为球队锁定胜局。',
    eventType: HeroEventType.Tournament,
    location: '德国',
    score: '3-0',
    opponent: '奥克森豪森队'
  },
  {
    date: '2026-01-13',
    year: '2026',
    title: '德甲第12轮 - 独得2分',
    description: '在德甲第12轮比赛中,萨尔布吕肯俱乐部主场迎战杜塞尔多夫队。樊振东在第二盘3:0战胜奇里塔,第四盘3:0击败世界冠军卡尔森,独得2分,但队友弗朗西斯卡和约内斯库先后失利,球队最终2:3告负。',
    eventType: HeroEventType.Tournament,
    location: '德国',
    score: '2-3',
    opponent: '杜塞尔多夫队'
  },
  {
    date: '2026-02-20',
    year: '2026',
    title: '欧冠1/4决赛首回合 - 3:0获胜',
    description: '在欧冠1/4决赛首回合比赛中,樊振东3:2逆转法国名将西蒙·高茨,帮助球队客场3:0战胜法国亨尼邦队。',
    eventType: HeroEventType.Tournament,
    location: '法国',
    score: '3-0',
    opponent: '法国亨尼邦队'
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
    date: '2025-12-14',
    year: '2025',
    title: '德甲第10轮 - 主场胜利',
    description: '萨尔布吕肯俱乐部主场3:0战胜奥克森豪森队,樊振东在第二盘3:0战胜Kirill,为球队锁定胜局。',
    eventType: HeroEventType.Tournament,
    location: '德国',
    score: '3-0',
    opponent: '奥克森豪森'
  },
  {
    date: '2026-01-13',
    year: '2026',
    title: '德甲第12轮 - 独得2分惜败',
    description: '在德甲第12轮比赛中,萨尔布吕肯主场2:3负于多特蒙德队。樊振东在第二盘3:0战胜米诺,第四盘3:0击败世界冠军卡尔森,独得2分,但队友弗朗西斯卡连输两盘,球队最终失利。',
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
