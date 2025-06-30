/**
 * 增强版Canvas渲染引擎
 * 支持多元素组合渲染和复杂视觉效果
 */

export class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.elements = []
    this.animations = []
  }

  // 设置画布尺寸
  setSize(width, height) {
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'
  }

  // 清空画布
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // 添加元素
  addElement(element) {
    this.elements.push({
      id: element.id || Date.now(),
      type: element.type,
      ...element
    })
  }

  // 移除元素
  removeElement(elementId) {
    this.elements = this.elements.filter(el => el.id !== elementId)
  }

  // 渲染所有元素
  render() {
    this.clear()
    
    // 按层级排序
    const sortedElements = this.elements.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
    
    sortedElements.forEach(element => {
      this.renderElement(element)
    })
  }

  // 渲染单个元素
  renderElement(element) {
    this.ctx.save()
    
    // 应用变换
    if (element.x || element.y) {
      this.ctx.translate(element.x || 0, element.y || 0)
    }
    
    if (element.rotation) {
      this.ctx.rotate(element.rotation * Math.PI / 180)
    }
    
    if (element.scaleX || element.scaleY) {
      this.ctx.scale(element.scaleX || 1, element.scaleY || 1)
    }
    
    if (element.opacity !== undefined) {
      this.ctx.globalAlpha = element.opacity
    }

    // 根据类型渲染
    switch (element.type) {
      case 'background':
        this.renderBackground(element)
        break
      case 'text':
        this.renderText(element)
        break
      case 'icon':
        this.renderIcon(element)
        break
      case 'shape':
        this.renderShape(element)
        break
      case 'effect':
        this.renderEffect(element)
        break
      case 'pattern':
        this.renderPattern(element)
        break
      case 'bubble':
        this.renderBubble(element)
        break
      default:
        this.renderCustom(element)
    }
    
    this.ctx.restore()
  }

  // 渲染背景
  renderBackground(element) {
    if (element.gradient) {
      const gradient = this.createGradient(element.gradient)
      this.ctx.fillStyle = gradient
    } else if (element.pattern) {
      const pattern = this.createPattern(element.pattern)
      this.ctx.fillStyle = pattern
    } else {
      this.ctx.fillStyle = element.color || '#ffffff'
    }
    
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // 渲染文字
  renderText(element) {
    this.ctx.font = `${element.fontWeight || 'normal'} ${element.fontSize || 16}px ${element.fontFamily || 'Arial'}`
    this.ctx.fillStyle = element.color || '#000000'
    this.ctx.textAlign = element.textAlign || 'left'
    this.ctx.textBaseline = element.textBaseline || 'top'
    
    // 文字阴影
    if (element.shadow) {
      this.ctx.shadowColor = element.shadow.color || '#000000'
      this.ctx.shadowBlur = element.shadow.blur || 0
      this.ctx.shadowOffsetX = element.shadow.offsetX || 0
      this.ctx.shadowOffsetY = element.shadow.offsetY || 0
    }
    
    // 文字描边
    if (element.stroke) {
      this.ctx.strokeStyle = element.stroke.color || '#000000'
      this.ctx.lineWidth = element.stroke.width || 1
      this.ctx.strokeText(element.text, 0, 0)
    }
    
    // 多行文字处理
    if (element.maxWidth) {
      this.renderMultilineText(element.text, 0, 0, element.maxWidth, element.lineHeight || element.fontSize * 1.2)
    } else {
      this.ctx.fillText(element.text, 0, 0)
    }
  }

  // 渲染多行文字
  renderMultilineText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''
    let currentY = y

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = this.ctx.measureText(testLine)
      const testWidth = metrics.width
      
      if (testWidth > maxWidth && n > 0) {
        this.ctx.fillText(line, x, currentY)
        line = words[n] + ' '
        currentY += lineHeight
      } else {
        line = testLine
      }
    }
    this.ctx.fillText(line, x, currentY)
  }

  // 渲染SVG图标
  renderIcon(element) {
    if (element.svgData) {
      this.renderSVG(element.svgData, element.width || 50, element.height || 50)
    } else if (element.imageData) {
      this.ctx.drawImage(element.imageData, 0, 0, element.width || 50, element.height || 50)
    }
  }

  // 渲染SVG
  renderSVG(svgString, width, height) {
    const img = new Image()
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)
    }
    
    img.src = url
  }

  // 渲染形状
  renderShape(element) {
    this.ctx.fillStyle = element.fillColor || '#000000'
    this.ctx.strokeStyle = element.strokeColor || '#000000'
    this.ctx.lineWidth = element.strokeWidth || 1

    switch (element.shape) {
      case 'rectangle':
        if (element.fillColor) {
          this.ctx.fillRect(0, 0, element.width, element.height)
        }
        if (element.strokeColor) {
          this.ctx.strokeRect(0, 0, element.width, element.height)
        }
        break
        
      case 'circle':
        this.ctx.beginPath()
        this.ctx.arc(element.radius, element.radius, element.radius, 0, 2 * Math.PI)
        if (element.fillColor) {
          this.ctx.fill()
        }
        if (element.strokeColor) {
          this.ctx.stroke()
        }
        break
        
      case 'polygon':
        if (element.points && element.points.length > 0) {
          this.ctx.beginPath()
          this.ctx.moveTo(element.points[0].x, element.points[0].y)
          for (let i = 1; i < element.points.length; i++) {
            this.ctx.lineTo(element.points[i].x, element.points[i].y)
          }
          this.ctx.closePath()
          if (element.fillColor) {
            this.ctx.fill()
          }
          if (element.strokeColor) {
            this.ctx.stroke()
          }
        }
        break
    }
  }

  // 渲染特效
  renderEffect(element) {
    switch (element.effectType) {
      case 'glow':
        this.renderGlowEffect(element)
        break
      case 'sparkle':
        this.renderSparkleEffect(element)
        break
      case 'particle':
        this.renderParticleEffect(element)
        break
    }
  }

  // 渲染光晕效果
  renderGlowEffect(element) {
    const gradient = this.ctx.createRadialGradient(
      element.centerX || 0, element.centerY || 0, 0,
      element.centerX || 0, element.centerY || 0, element.radius || 50
    )
    
    gradient.addColorStop(0, element.innerColor || 'rgba(255, 215, 0, 0.8)')
    gradient.addColorStop(0.5, element.middleColor || 'rgba(255, 165, 0, 0.4)')
    gradient.addColorStop(1, element.outerColor || 'rgba(255, 140, 0, 0)')
    
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(
      (element.centerX || 0) - (element.radius || 50),
      (element.centerY || 0) - (element.radius || 50),
      (element.radius || 50) * 2,
      (element.radius || 50) * 2
    )
  }

  // 渲染闪烁效果
  renderSparkleEffect(element) {
    const sparkles = element.sparkles || this.generateSparkles(element)
    
    sparkles.forEach(sparkle => {
      this.ctx.save()
      this.ctx.translate(sparkle.x, sparkle.y)
      this.ctx.rotate(sparkle.rotation || 0)
      this.ctx.fillStyle = sparkle.color || '#FFD700'
      
      // 绘制星形
      this.drawStar(0, 0, sparkle.size || 5, sparkle.size || 5, 5)
      
      this.ctx.restore()
    })
  }

  // 绘制星形
  drawStar(cx, cy, outerRadius, innerRadius, points) {
    this.ctx.beginPath()
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i * Math.PI) / points
      const x = cx + Math.cos(angle) * radius
      const y = cy + Math.sin(angle) * radius
      
      if (i === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }
    }
    
    this.ctx.closePath()
    this.ctx.fill()
  }

  // 生成闪烁点
  generateSparkles(element) {
    const sparkles = []
    const count = element.count || 10
    
    for (let i = 0; i < count; i++) {
      sparkles.push({
        x: Math.random() * (element.width || this.canvas.width),
        y: Math.random() * (element.height || this.canvas.height),
        size: Math.random() * 8 + 2,
        rotation: Math.random() * Math.PI * 2,
        color: element.colors ? element.colors[Math.floor(Math.random() * element.colors.length)] : '#FFD700'
      })
    }
    
    return sparkles
  }

  // 渲染气泡
  renderBubble(element) {
    // 绘制气泡主体
    this.ctx.fillStyle = element.fillColor || 'white'
    this.ctx.strokeStyle = element.strokeColor || '#333333'
    this.ctx.lineWidth = element.strokeWidth || 2
    
    // 圆角矩形气泡
    this.roundRect(0, 0, element.width || 100, element.height || 60, element.borderRadius || 10)
    this.ctx.fill()
    this.ctx.stroke()
    
    // 绘制气泡尾巴
    if (element.tail) {
      this.ctx.beginPath()
      this.ctx.moveTo(element.tail.x1, element.tail.y1)
      this.ctx.lineTo(element.tail.x2, element.tail.y2)
      this.ctx.lineTo(element.tail.x3, element.tail.y3)
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  // 绘制圆角矩形
  roundRect(x, y, width, height, radius) {
    this.ctx.beginPath()
    this.ctx.moveTo(x + radius, y)
    this.ctx.lineTo(x + width - radius, y)
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.ctx.lineTo(x + width, y + height - radius)
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.ctx.lineTo(x + radius, y + height)
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.ctx.lineTo(x, y + radius)
    this.ctx.quadraticCurveTo(x, y, x + radius, y)
    this.ctx.closePath()
  }

  // 创建渐变
  createGradient(gradientConfig) {
    let gradient
    
    if (gradientConfig.type === 'linear') {
      gradient = this.ctx.createLinearGradient(
        gradientConfig.x1 || 0, gradientConfig.y1 || 0,
        gradientConfig.x2 || this.canvas.width, gradientConfig.y2 || 0
      )
    } else if (gradientConfig.type === 'radial') {
      gradient = this.ctx.createRadialGradient(
        gradientConfig.x1 || this.canvas.width / 2, gradientConfig.y1 || this.canvas.height / 2, gradientConfig.r1 || 0,
        gradientConfig.x2 || this.canvas.width / 2, gradientConfig.y2 || this.canvas.height / 2, gradientConfig.r2 || Math.min(this.canvas.width, this.canvas.height) / 2
      )
    }
    
    if (gradient && gradientConfig.stops) {
      gradientConfig.stops.forEach(stop => {
        gradient.addColorStop(stop.offset, stop.color)
      })
    }
    
    return gradient
  }

  // 创建图案
  createPattern(patternConfig) {
    // 创建临时canvas用于图案
    const patternCanvas = document.createElement('canvas')
    patternCanvas.width = patternConfig.width || 50
    patternCanvas.height = patternConfig.height || 50
    const patternCtx = patternCanvas.getContext('2d')
    
    // 根据图案类型绘制
    if (patternConfig.type === 'dots') {
      patternCtx.fillStyle = patternConfig.backgroundColor || '#f0f0f0'
      patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height)
      
      patternCtx.fillStyle = patternConfig.dotColor || '#ddd'
      const dotSize = patternConfig.dotSize || 4
      const spacing = patternConfig.spacing || 20
      
      for (let x = spacing / 2; x < patternCanvas.width; x += spacing) {
        for (let y = spacing / 2; y < patternCanvas.height; y += spacing) {
          patternCtx.beginPath()
          patternCtx.arc(x, y, dotSize / 2, 0, 2 * Math.PI)
          patternCtx.fill()
        }
      }
    }
    
    return this.ctx.createPattern(patternCanvas, 'repeat')
  }

  // 导出为图片
  toDataURL(type = 'image/png', quality = 1.0) {
    return this.canvas.toDataURL(type, quality)
  }

  // 导出为Blob
  toBlob(callback, type = 'image/png', quality = 1.0) {
    this.canvas.toBlob(callback, type, quality)
  }

  // 添加动画
  addAnimation(elementId, animation) {
    this.animations.push({
      elementId,
      ...animation,
      startTime: Date.now()
    })
  }

  // 更新动画
  updateAnimations() {
    const currentTime = Date.now()
    
    this.animations = this.animations.filter(animation => {
      const elapsed = currentTime - animation.startTime
      const progress = Math.min(elapsed / animation.duration, 1)
      
      const element = this.elements.find(el => el.id === animation.elementId)
      if (element) {
        // 应用动画变换
        if (animation.property === 'opacity') {
          element.opacity = animation.from + (animation.to - animation.from) * progress
        } else if (animation.property === 'rotation') {
          element.rotation = animation.from + (animation.to - animation.from) * progress
        } else if (animation.property === 'scale') {
          const scale = animation.from + (animation.to - animation.from) * progress
          element.scaleX = scale
          element.scaleY = scale
        }
      }
      
      return progress < 1
    })
  }

  // 开始动画循环
  startAnimationLoop() {
    const animate = () => {
      this.updateAnimations()
      this.render()
      requestAnimationFrame(animate)
    }
    animate()
  }
}
