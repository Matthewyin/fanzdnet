// 星空配置文件 - 580颗星星分三级
// 生成完全随机位置的星星，避免网格化布局

// 生成随机星星的函数 - 完全随机分布，避免网格化
function generateRandomStars(count, sizeRange, opacityRange, colors) {
  const stars = []
  const usedPositions = new Set() // 避免位置重复
  
  for (let i = 0; i < count; i++) {
    let x, y, positionKey
    let attempts = 0
    
    // 使用更精细的随机分布，避免网格化
    do {
      // 完全随机的浮点数位置，精确到小数点后一位
      x = Math.round(Math.random() * 1000) / 10 // 0.0 到 100.0
      y = Math.round(Math.random() * 1000) / 10 // 0.0 到 100.0
      
      // 使用更小的网格来检查重复，但允许更多变化
      positionKey = `${Math.floor(x * 2)}-${Math.floor(y * 2)}` // 0.5%精度网格
      attempts++
      
      // 如果尝试太多次还是重复，就放宽条件
      if (attempts > 50) {
        positionKey = `${Math.floor(x * 4)}-${Math.floor(y * 4)}` // 0.25%精度网格
      }
      if (attempts > 100) {
        break // 避免无限循环
      }
    } while (usedPositions.has(positionKey))
    
    usedPositions.add(positionKey)
    
    // 随机选择尺寸和透明度
    const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])
    const opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0])
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    stars.push({
      x: Math.round(x * 10) / 10, // 保留一位小数
      y: Math.round(y * 10) / 10, // 保留一位小数
      size: Math.round(size * 10) / 10, // 保留一位小数
      opacity: Math.round(opacity * 100) / 100, // 保留两位小数
      color: color
    })
  }
  
  return stars
}

// 定义星星颜色
const starColors = [
  'rgba(255, 255, 255, {opacity})', // 白色
  'rgba(224, 231, 255, {opacity})', // 淡蓝色
  'rgba(221, 214, 254, {opacity})', // 淡紫色
]

// 天蝎座主要恒星（左半边左下角，垂直压缩）
export const scorpiusStars = [
  { x: 10, y: 40, size: 7.0, opacity: 1.0, color: 'rgba(135, 206, 235, {opacity})' }, // 星1 - 起始点
  { x: 10.2, y: 44.5, size: 6.5, opacity: 0.95, color: 'rgba(176, 224, 230, {opacity})' }, // 星2 - 第二点
  { x: 10.3, y: 48, size: 6.0, opacity: 0.9, color: 'rgba(173, 216, 230, {opacity})' }, // 星3 - 第三点
  { x: 10.1, y: 53, size: 6.0, opacity: 0.9, color: 'rgba(135, 206, 235, {opacity})' }, // 星4 - 第四点
  { x: 8.8, y: 46.5, size: 6.5, opacity: 0.85, color: 'rgba(176, 224, 230, {opacity})' }, // 星5 - 分支1
  { x: 8.1, y: 49, size: 6.0, opacity: 0.85, color: 'rgba(173, 216, 230, {opacity})' }, // 星6 - 分支2
  { x: 7.8, y: 52.5, size: 6.5, opacity: 0.8, color: 'rgba(135, 206, 235, {opacity})' }, // 星7 - 分支3
  { x: 7.4, y: 58, size: 6.0, opacity: 0.8, color: 'rgba(176, 224, 230, {opacity})' }, // 星8 - 下方1
  { x: 7.6, y: 64, size: 6.5, opacity: 0.75, color: 'rgba(173, 216, 230, {opacity})' }, // 星9 - 下方2
  { x: 7.7, y: 70, size: 6.0, opacity: 0.75, color: 'rgba(135, 206, 235, {opacity})' }, // 星10 - 下方3
  { x: 6.5, y: 72, size: 6.0, opacity: 0.7, color: 'rgba(176, 224, 230, {opacity})' }, // 星11 - 分支4
  { x: 5.2, y: 72.5, size: 6.0, opacity: 0.7, color: 'rgba(173, 216, 230, {opacity})' }, // 星12 - 分支5
  { x: 3.6, y: 72, size: 6.5, opacity: 0.7, color: 'rgba(135, 206, 235, {opacity})' }, // 星13 - 分支6
  { x: 4.4, y: 68.5, size: 6.0, opacity: 0.65, color: 'rgba(176, 224, 230, {opacity})' }, // 星14 - 分支7
  { x: 5.2, y: 63.5, size: 6.0, opacity: 0.65, color: 'rgba(173, 216, 230, {opacity})' }, // 星15 - 分支8
  { x: 3.6, y: 60.5, size: 6.0, opacity: 0.65, color: 'rgba(135, 206, 235, {opacity})' }, // 星16 - 末端
]

// 水瓶座主要恒星（左半边右上角）- 按照SVG参考图布局
export const aquariusStars = [
  { x: 28, y: 5, size: 7.0, opacity: 1.0, color: 'rgba(135, 206, 235, {opacity})' }, // 星1 - 右上角起始点
  { x: 23, y: 10, size: 6.5, opacity: 0.95, color: 'rgba(176, 224, 230, {opacity})' }, // 星2 - 第二点
  { x: 18.5, y: 14.5, size: 6.5, opacity: 0.9, color: 'rgba(173, 216, 230, {opacity})' }, // 星3 - 主要转折点
  { x: 18, y: 21.5, size: 6.0, opacity: 0.9, color: 'rgba(135, 206, 235, {opacity})' }, // 星4 - 中段左侧
  { x: 16.5, y: 21, size: 6.0, opacity: 0.85, color: 'rgba(176, 224, 230, {opacity})' }, // 星5 - 中段
  { x: 15.7, y: 24, size: 6.0, opacity: 0.85, color: 'rgba(173, 216, 230, {opacity})' }, // 星6 - 下段起点
  { x: 22.3, y: 22.5, size: 6.5, opacity: 0.8, color: 'rgba(135, 206, 235, {opacity})' }, // 星7 - 右侧连接
  { x: 26, y: 20, size: 6.0, opacity: 0.8, color: 'rgba(176, 224, 230, {opacity})' }, // 星8 - 右上连接
  { x: 19.6, y: 35.9, size: 6.5, opacity: 0.75, color: 'rgba(173, 216, 230, {opacity})' }, // 星9 - 下方主星
  { x: 20.6, y: 29.2, size: 6.0, opacity: 0.75, color: 'rgba(135, 206, 235, {opacity})' }, // 星10 - 中下连接
  { x: 23.4, y: 29.6, size: 6.0, opacity: 0.7, color: 'rgba(176, 224, 230, {opacity})' }, // 星11 - 右中连接
  { x: 23.8, y: 31.7, size: 6.0, opacity: 0.7, color: 'rgba(173, 216, 230, {opacity})' }, // 星12 - 右下连接
  { x: 25.7, y: 35.7, size: 6.5, opacity: 0.7, color: 'rgba(135, 206, 235, {opacity})' }, // 星13 - 最右下角
]

// 生成第1层星星 (80颗) - 最大最亮，8秒闪烁
export function generateLayer1Stars() {
  return generateRandomStars(
    20,
    [3.0, 4.0], // 尺寸范围 3.0px-4.0px
    [0.8, 1.0], // 透明度范围 0.8-1.0
    starColors
  )
}

// 生成第2层星星 (150颗) - 中等大小，10秒反向闪烁
export function generateLayer2Stars() {
  return generateRandomStars(
    200,
    [2.0, 3.0], // 尺寸范围 2.0px-3.0px
    [0.6, 0.8], // 透明度范围 0.6-0.8
    starColors
  )
}

// 生成第3层星星 (300颗) - 最小最暗，12秒闪烁
export function generateLayer3Stars() {
  return generateRandomStars(
    300,
    [1.0, 2.0], // 尺寸范围 1.0px-2.0px
    [0.4, 0.6], // 透明度范围 0.4-0.6
    starColors
  )
}

// 将星星数组转换为CSS radial-gradient字符串
export function generateStarCSS(stars) {
  return stars.map(star => {
    const color = star.color.replace('{opacity}', star.opacity)
    return `radial-gradient(${star.size}px ${star.size}px at ${star.x}% ${star.y}%, ${color}, transparent)`
  }).join(',\n    ')
}

// 生成完整的星空CSS - 每次调用都生成全新的随机布局，避免网格化
export function generateFullStarfield() {
  // 每次都重新生成随机星星，确保布局完全不同
  const layer1Stars = generateLayer1Stars()
  const layer2Stars = generateLayer2Stars()
  const layer3Stars = generateLayer3Stars()
  
  // 星座位置固定，但背景星星完全随机
  const scorpiusCSS = generateStarCSS(scorpiusStars)
  const aquariusCSS = generateStarCSS(aquariusStars)
  const layer1CSS = generateStarCSS(layer1Stars)
  const layer2CSS = generateStarCSS(layer2Stars)
  const layer3CSS = generateStarCSS(layer3Stars)
  
  // 添加随机种子确保每次生成都不同
  const timestamp = Date.now()
  console.log(`星空生成时间戳: ${timestamp}`)
  
  return {
    scorpius: scorpiusCSS,
    aquarius: aquariusCSS,
    layer1: layer1CSS,
    layer2: layer2CSS,
    layer3: layer3CSS,
    total: scorpiusStars.length + aquariusStars.length + layer1Stars.length + layer2Stars.length + layer3Stars.length,
    timestamp: timestamp
  }
}

// 星云效果配置
export const nebulae = [
  // 水瓶座专属星云 - 左半边右上角
  { x: 20, y: 8, width: 15, height: 12, color: 'rgba(135, 206, 235, 0.06)' },
  { x: 17, y: 18, width: 12, height: 10, color: 'rgba(176, 224, 230, 0.04)' },
  { x: 23, y: 25, width: 10, height: 8, color: 'rgba(173, 216, 230, 0.05)' },
  
  // 天蝎座专属星云 - 左半边左下角
  { x: 6, y: 50, width: 8, height: 12, color: 'rgba(135, 206, 235, 0.04)' },
  { x: 4, y: 65, width: 6, height: 15, color: 'rgba(176, 224, 230, 0.03)' },
  { x: 8, y: 72, width: 5, height: 8, color: 'rgba(173, 216, 230, 0.04)' },
  
  // 深空星云
  { x: 60, y: 20, width: 50, height: 25, color: 'rgba(10, 15, 28, 0.12)' },
  { x: 80, y: 60, width: 45, height: 22, color: 'rgba(15, 23, 42, 0.10)' },
  { x: 15, y: 80, width: 40, height: 20, color: 'rgba(30, 27, 75, 0.08)' },
  { x: 90, y: 30, width: 35, height: 18, color: 'rgba(25, 25, 112, 0.06)' },
  { x: 50, y: 85, width: 30, height: 15, color: 'rgba(72, 61, 139, 0.07)' },
  { x: 40, y: 15, width: 25, height: 12, color: 'rgba(106, 90, 205, 0.05)' },
]

// 生成星云CSS
export function generateNebulaCSS(nebulae) {
  return nebulae.map(nebula => 
    `radial-gradient(ellipse ${nebula.width}px ${nebula.height}px at ${nebula.x}% ${nebula.y}%, ${nebula.color}, transparent)`
  ).join(',\n    ')
} 