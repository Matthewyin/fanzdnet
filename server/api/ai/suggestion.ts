
const suggestions = [
  "设计一款应援毛巾，上面有樊振东的Q版卡通形象和他标志性的庆祝动作，背景是燃烧的乒乓球火焰",
  "生成一张手机壁纸，风格为赛博朋克，主体是樊振东的剪影，周围环绕着代表速度和力量的霓虹线条",
  "创作一个'东'字的书法艺术logo，将乒乓球的旋转轨迹融入笔画之中",
  "设计一款T恤图案，正面是'FAN Zhendong'的艺术字体，背后是他的名言：'Stay humble, stay hungry'",
  "制作一个动画表情包，内容是樊振东在场上冷静思考和大力抽球的两种状态切换",
  "设计一个应援手幅，主题是'东方巨龙'，将龙的元素与乒乓球拍结合起来",
  "创作一幅数字油画，描绘樊振东在奥运赛场上赢得最后一分的瞬间，背景是飘扬的国旗",
  "设计一个系列的徽章，每个徽章代表他获得的一次世界冠军，并刻上比赛日期和地点"
];

export default defineEventHandler((event) => {
  const randomIndex = Math.floor(Math.random() * suggestions.length);
  return {
    suggestion: suggestions[randomIndex]
  }
})
