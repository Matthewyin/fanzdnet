"""
AI服务核心逻辑
"""

import asyncio
import json
import time
from typing import Dict, Any, Optional, List
from loguru import logger
import google.generativeai as genai
from PIL import Image, ImageDraw, ImageFont
import io
import os

from app.core.config import settings
from app.core.database import get_db
from app.core.redis_client import get_redis


class AIService:
    """AI服务主类"""
    
    def __init__(self):
        self.gemini_model = None
        self.is_initialized = False
        self.generation_queue = asyncio.Queue()
        self.worker_tasks = []
        
    async def initialize(self):
        """初始化AI服务"""
        try:
            # 配置Gemini API
            if settings.GEMINI_API_KEY:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.gemini_model = genai.GenerativeModel('gemini-pro')
                logger.info("Gemini AI模型初始化成功")
            else:
                logger.warning("未配置Gemini API密钥，将使用模拟模式")
            
            # 启动工作线程
            for i in range(settings.MAX_CONCURRENT_REQUESTS):
                task = asyncio.create_task(self._generation_worker(f"worker-{i}"))
                self.worker_tasks.append(task)
            
            self.is_initialized = True
            logger.info(f"AI服务初始化完成，启动了{len(self.worker_tasks)}个工作线程")
            
        except Exception as e:
            logger.error(f"AI服务初始化失败: {e}")
            raise
    
    def is_ready(self) -> bool:
        """检查服务是否就绪"""
        return self.is_initialized
    
    async def cleanup(self):
        """清理资源"""
        # 取消所有工作任务
        for task in self.worker_tasks:
            task.cancel()
        
        # 等待任务完成
        if self.worker_tasks:
            await asyncio.gather(*self.worker_tasks, return_exceptions=True)
        
        logger.info("AI服务清理完成")
    
    async def generate_content(self, task_id: str, generation_type: str, 
                             prompt: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """生成内容的主入口"""
        try:
            # 将任务加入队列
            task_data = {
                'task_id': task_id,
                'type': generation_type,
                'prompt': prompt,
                'parameters': parameters,
                'created_at': time.time()
            }
            
            await self.generation_queue.put(task_data)
            logger.info(f"任务已加入队列: {task_id}")
            
            return {
                'status': 'queued',
                'task_id': task_id,
                'message': '任务已加入生成队列'
            }
            
        except Exception as e:
            logger.error(f"生成内容失败: {e}")
            return {
                'status': 'error',
                'task_id': task_id,
                'error': str(e)
            }
    
    async def _generation_worker(self, worker_name: str):
        """生成工作线程"""
        logger.info(f"工作线程 {worker_name} 启动")
        
        while True:
            try:
                # 从队列获取任务
                task_data = await self.generation_queue.get()
                task_id = task_data['task_id']
                
                logger.info(f"工作线程 {worker_name} 开始处理任务: {task_id}")
                
                # 更新任务状态为处理中
                await self._update_task_status(task_id, 'processing', 10)
                
                # 根据类型调用相应的生成方法
                if task_data['type'] == 'banner':
                    result = await self._generate_banner(task_data)
                elif task_data['type'] == 'slogan':
                    result = await self._generate_slogan(task_data)
                elif task_data['type'] == 'emoji':
                    result = await self._generate_emoji(task_data)
                else:
                    raise ValueError(f"不支持的生成类型: {task_data['type']}")
                
                # 更新任务状态为完成
                await self._update_task_status(task_id, 'completed', 100, result)
                
                logger.info(f"工作线程 {worker_name} 完成任务: {task_id}")
                
            except asyncio.CancelledError:
                logger.info(f"工作线程 {worker_name} 被取消")
                break
            except Exception as e:
                logger.error(f"工作线程 {worker_name} 处理任务时出错: {e}")
                if 'task_id' in locals():
                    await self._update_task_status(task_id, 'failed', 0, {'error': str(e)})
            finally:
                if 'task_data' in locals():
                    self.generation_queue.task_done()
    
    async def _generate_banner(self, task_data: Dict[str, Any]) -> Dict[str, Any]:
        """生成应援横幅"""
        task_id = task_data['task_id']
        prompt = task_data['prompt']
        parameters = task_data['parameters']

        logger.info(f"开始生成横幅: {task_id}")

        # 更新进度
        await self._update_task_status(task_id, 'processing', 30)

        # 生成横幅设计方案
        if self.gemini_model:
            # 使用真实的Gemini API生成完整设计方案
            enhanced_prompt = f"""
            为樊振东球迷创建一个应援横幅的完整设计方案。
            用户需求: {prompt}
            用户参数: {json.dumps(parameters, ensure_ascii=False)}

            请生成一个包含以下元素的横幅设计方案：

            1. 主标题文字（8-16个字，简洁有力）
            2. 副标题文字（可选，补充说明）
            3. 视觉元素选择（从以下选项中选择3-5个）：
               - 樊振东相关：fzd-portrait, fzd-silhouette
               - 乒乓球元素：ping-pong-ball, paddle, table-tennis-table
               - 荣誉元素：gold-trophy, medal
               - 中国元素：china-flag, chinese-knot
               - 装饰元素：star, crown, lightning, ribbon
               - 特效元素：glow-effect, sparkle-effect

            4. 布局设计：
               - 主标题位置（top, center, bottom）
               - 副标题位置
               - 视觉元素位置和大小
               - 整体构图风格（对称、非对称、居中等）

            5. 颜色方案：
               - 主色调
               - 辅助色
               - 文字颜色
               - 特效颜色

            请以JSON格式返回设计方案：
            {{
                "mainTitle": "主标题文字",
                "subTitle": "副标题文字（可选）",
                "visualElements": [
                    {{
                        "id": "元素ID",
                        "position": {{"x": 100, "y": 50}},
                        "size": {{"width": 60, "height": 60}},
                        "zIndex": 1
                    }}
                ],
                "layout": {{
                    "style": "布局风格",
                    "mainTitlePosition": "center",
                    "composition": "对称"
                }},
                "colors": {{
                    "primary": "#FF0000",
                    "secondary": "#FFD700",
                    "textColor": "#FFFFFF",
                    "effectColor": "#FFA500"
                }},
                "effects": [
                    {{
                        "type": "glow",
                        "target": "mainTitle",
                        "intensity": 0.8
                    }}
                ]
            }}

            确保设计方案体现樊振东的特点和球迷的热情支持。
            """

            response = await asyncio.to_thread(
                self.gemini_model.generate_content, enhanced_prompt
            )

            try:
                # 解析JSON响应
                import re
                json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
                if json_match:
                    design_data = json.loads(json_match.group())
                else:
                    raise ValueError("无法解析AI响应")
            except Exception as e:
                logger.warning(f"解析AI响应失败: {e}，使用默认设计")
                design_data = self._get_default_banner_design(prompt)

        else:
            # 模拟模式
            await asyncio.sleep(2)
            design_data = self._get_default_banner_design(prompt)
        
        # 更新进度
        await self._update_task_status(task_id, 'processing', 60)

        # 生成横幅图片
        banner_path = await self._create_enhanced_banner_image(
            task_id, design_data, parameters
        )

        # 更新进度
        await self._update_task_status(task_id, 'processing', 90)

        return {
            'type': 'banner',
            'content': design_data.get('mainTitle', '樊振东加油！'),
            'design_data': design_data,
            'image_path': banner_path,
            'parameters': parameters
        }
    
    async def _generate_slogan(self, task_data: Dict[str, Any]) -> Dict[str, Any]:
        """生成应援口号"""
        task_id = task_data['task_id']
        prompt = task_data['prompt']
        parameters = task_data['parameters']
        
        logger.info(f"开始生成口号: {task_id}")
        
        # 更新进度
        await self._update_task_status(task_id, 'processing', 50)
        
        if self.gemini_model:
            # 使用真实的Gemini API
            enhanced_prompt = f"""
            为樊振东球迷创建应援口号和视觉呈现方案。
            用户需求: {prompt}

            请生成5个不同风格的应援口号，每个口号包含：
            1. 口号文字内容
            2. 视觉呈现建议
            3. 推荐配图元素
            4. 排版样式建议

            口号类型：
            1. 简短有力型（4-8字）
            2. 朗朗上口型（8-16字）
            3. 押韵节拍型
            4. 激励鼓舞型
            5. 胜利祝愿型

            视觉元素选项：
            - 樊振东元素：fzd-portrait, fzd-silhouette
            - 乒乓球元素：ping-pong-ball, paddle, table-tennis-table
            - 荣誉元素：gold-trophy, medal
            - 装饰元素：star, crown, lightning, ribbon
            - 气泡样式：round-bubble, thought-bubble, shout-bubble

            请以JSON格式返回：
            {
                "slogans": [
                    {
                        "type": "简短有力",
                        "text": "口号内容",
                        "visualStyle": {
                            "presentationType": "card",
                            "backgroundColor": "#FF0000",
                            "textColor": "#FFFFFF",
                            "fontSize": "large",
                            "fontWeight": "bold",
                            "elements": ["star", "lightning"],
                            "layout": "center",
                            "effects": ["glow", "shadow"]
                        },
                        "description": "适用场景说明"
                    }
                ]
            }

            确保每个口号都体现樊振东的特点和球迷的热情支持。
            """
            
            response = await asyncio.to_thread(
                self.gemini_model.generate_content, enhanced_prompt
            )
            
            try:
                # 尝试解析JSON响应
                import re
                json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
                if json_match:
                    slogans_data = json.loads(json_match.group())
                else:
                    raise ValueError("无法解析AI响应")
            except:
                # 如果解析失败，使用默认格式
                slogans_data = {
                    "slogans": [
                        {"type": "简短有力", "text": response.text.strip()[:20]}
                    ]
                }
        else:
            # 模拟模式
            await asyncio.sleep(2)
            slogans_data = {
                "slogans": [
                    {"type": "简短有力", "text": "樊振东必胜！"},
                    {"type": "朗朗上口", "text": "东哥威武，球技超群！"},
                    {"type": "押韵节拍", "text": "樊振东，真英雄，乒乓场上显神通！"},
                    {"type": "激励鼓舞", "text": "永不放弃，勇往直前，樊振东加油！"},
                    {"type": "胜利祝愿", "text": "愿你每球都精彩，每赛都夺冠！"}
                ]
            }
        
        return {
            'type': 'slogan',
            'slogans': slogans_data['slogans'],
            'parameters': parameters
        }
    
    async def _generate_emoji(self, task_data: Dict[str, Any]) -> Dict[str, Any]:
        """生成表情包"""
        task_id = task_data['task_id']
        prompt = task_data['prompt']
        parameters = task_data['parameters']
        
        logger.info(f"开始生成表情包: {task_id}")
        
        # 更新进度
        await self._update_task_status(task_id, 'processing', 30)
        
        # 模拟表情包生成（实际应该调用图像生成AI）
        await asyncio.sleep(3)
        
        # 创建简单的表情包图片
        emoji_path = await self._create_emoji_image(task_id, prompt, parameters)
        
        return {
            'type': 'emoji',
            'image_path': emoji_path,
            'prompt': prompt,
            'parameters': parameters
        }
    
    async def _create_banner_image(self, task_id: str, text: str, 
                                 parameters: Dict[str, Any]) -> str:
        """创建横幅图片"""
        # 图片尺寸
        width = parameters.get('width', 800)
        height = parameters.get('height', 300)
        
        # 创建图片
        img = Image.new('RGB', (width, height), color='red')
        draw = ImageDraw.Draw(img)
        
        # 尝试加载字体
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 48)
        except:
            font = ImageFont.load_default()
        
        # 计算文字位置
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        # 绘制文字
        draw.text((x, y), text, fill='white', font=font)
        
        # 保存图片
        output_dir = os.path.join(settings.GENERATED_PATH, 'banners')
        os.makedirs(output_dir, exist_ok=True)
        
        image_path = os.path.join(output_dir, f"{task_id}.png")
        img.save(image_path)
        
        return f"generated/banners/{task_id}.png"

    def _get_default_banner_design(self, prompt: str) -> Dict[str, Any]:
        """获取默认横幅设计方案"""
        return {
            "mainTitle": f"樊振东加油！",
            "subTitle": "为梦想而战",
            "visualElements": [
                {
                    "id": "fzd-portrait",
                    "position": {"x": 50, "y": 100},
                    "size": {"width": 80, "height": 80},
                    "zIndex": 2
                },
                {
                    "id": "ping-pong-ball",
                    "position": {"x": 650, "y": 120},
                    "size": {"width": 50, "height": 50},
                    "zIndex": 1
                },
                {
                    "id": "star",
                    "position": {"x": 150, "y": 50},
                    "size": {"width": 30, "height": 30},
                    "zIndex": 1
                }
            ],
            "layout": {
                "style": "居中对称",
                "mainTitlePosition": "center",
                "composition": "对称"
            },
            "colors": {
                "primary": "#FF0000",
                "secondary": "#FFD700",
                "textColor": "#FFFFFF",
                "effectColor": "#FFA500"
            },
            "effects": [
                {
                    "type": "glow",
                    "target": "mainTitle",
                    "intensity": 0.8
                }
            ]
        }

    async def _create_enhanced_banner_image(self, task_id: str, design_data: Dict[str, Any],
                                          parameters: Dict[str, Any]) -> str:
        """创建增强版横幅图片"""
        try:
            width = parameters.get('width', 800)
            height = parameters.get('height', 300)
            img = Image.new('RGBA', (width, height), (255, 255, 255, 0))
            
            # 1. 绘制背景
            primary_color = design_data.get('colors', {}).get('primary', '#FF0000')
            secondary_color = design_data.get('colors', {}).get('secondary', '#FFD700')
            
            # 创建一个可绘制的背景层
            background_layer = Image.new('RGBA', (width, height), primary_color)
            draw_bg = ImageDraw.Draw(background_layer)
            
            # 简单的线性渐变
            for y in range(height):
                alpha = y / height
                r = int(int(primary_color[1:3], 16) * (1 - alpha) + int(secondary_color[1:3], 16) * alpha)
                g = int(int(primary_color[3:5], 16) * (1 - alpha) + int(secondary_color[3:5], 16) * alpha)
                b = int(int(primary_color[5:7], 16) * (1 - alpha) + int(secondary_color[5:7], 16) * alpha)
                draw_bg.line([(0, y), (width, y)], fill=(r, g, b))
            
            img.paste(background_layer, (0, 0))

            # 2. 绘制视觉元素
            elements = design_data.get('visualElements', [])
            elements.sort(key=lambda e: e.get('zIndex', 1)) # 按zIndex排序

            for element in elements:
                element_id = element.get('id')
                element_path = os.path.join(settings.BASE_DIR, 'app', 'assets', 'elements', f"{element_id}.png")
                
                if os.path.exists(element_path):
                    try:
                        element_img = Image.open(element_path).convert("RGBA")
                        
                        size = element.get('size', {})
                        el_width = size.get('width', 80)
                        el_height = size.get('height', 80)
                        element_img = element_img.resize((el_width, el_height), Image.Resampling.LANCZOS)
                        
                        position = element.get('position', {})
                        pos_x = position.get('x', 0)
                        pos_y = position.get('y', 0)
                        
                        # 粘贴元素
                        img.paste(element_img, (pos_x, pos_y), element_img)
                    except Exception as e:
                        logger.warning(f"处理元素失败 {element_id}: {e}")
                else:
                    logger.warning(f"元素文件不存在: {element_path}")

            # 3. 绘制文字
            draw = ImageDraw.Draw(img)
            font_path = os.path.join(settings.BASE_DIR, 'app', 'assets', 'fonts', 'SourceHanSans-Bold.otf')
            
            try:
                font_size = parameters.get('fontSize', 48)
                font = ImageFont.truetype(font_path, font_size)
            except IOError:
                logger.warning("字体文件加载失败，使用默认字体")
                font = ImageFont.load_default()

            main_title = design_data.get('mainTitle', '樊振东加油！')
            text_color = design_data.get('colors', {}).get('textColor', '#FFFFFF')

            # 计算文字位置
            bbox = draw.textbbox((0, 0), main_title, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            text_x = (width - text_width) // 2
            text_y = (height - text_height) // 2

            # 绘制阴影
            shadow_offset = 3
            draw.text((text_x + shadow_offset, text_y + shadow_offset), main_title, font=font, fill=(0, 0, 0, 128))
            # 绘制主文字
            draw.text((text_x, text_y), main_title, font=font, fill=text_color)

            # 4. 保存图片
            output_dir = os.path.join(settings.GENERATED_PATH, 'banners')
            os.makedirs(output_dir, exist_ok=True)
            output_path = os.path.join(output_dir, f"{task_id}.png")
            img.save(output_path)

            logger.info(f"横幅图片已生成: {output_path}")
            return f"generated/banners/{task_id}.png"

        except Exception as e:
            logger.error(f"生成横幅图片失败: {e}")
            raise
    
    async def _create_emoji_image(self, task_id: str, prompt: str, 
                                parameters: Dict[str, Any]) -> str:
        """创建表情包图片"""
        # 创建简单的表情包
        img = Image.new('RGB', (300, 300), color='yellow')
        draw = ImageDraw.Draw(img)
        
        # 绘制简单的笑脸
        draw.ellipse([50, 50, 100, 100], fill='black')  # 左眼
        draw.ellipse([200, 50, 250, 100], fill='black')  # 右眼
        draw.arc([75, 150, 225, 225], 0, 180, fill='black', width=5)  # 嘴巴
        
        # 添加文字
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
        except:
            font = ImageFont.load_default()
        
        draw.text((50, 250), prompt[:10], fill='black', font=font)
        
        # 保存图片
        output_dir = os.path.join(settings.GENERATED_PATH, 'emojis')
        os.makedirs(output_dir, exist_ok=True)
        
        image_path = os.path.join(output_dir, f"{task_id}.png")
        img.save(image_path)
        
        return f"generated/emojis/{task_id}.png"
    
    async def _update_task_status(self, task_id: str, status: str, 
                                progress: int, result: Optional[Dict] = None):
        """更新任务状态"""
        try:
            db = await get_db()
            redis = await get_redis()
            
            # 更新数据库
            update_query = """
                UPDATE fazd_generation_records 
                SET status = %s, progress = %s
            """
            params = [status, progress]
            
            if result:
                update_query += ", output_image_path = %s"
                params.append(result.get('image_path'))
                
                if status == 'completed':
                    update_query += ", completed_at = NOW(), generation_time = TIMESTAMPDIFF(SECOND, created_at, NOW())"
                elif status == 'failed':
                    update_query += ", error_message = %s"
                    params.append(result.get('error'))
            
            update_query += " WHERE task_id = %s"
            params.append(task_id)
            
            await db.execute_update(update_query, tuple(params))
            
            # 更新Redis缓存
            cache_key = f"task:{task_id}"
            task_info = {
                'status': status,
                'progress': progress,
                'updated_at': time.time()
            }
            if result:
                task_info['result'] = result
            
            await redis.set(cache_key, task_info, expire=3600)  # 缓存1小时
            
            logger.info(f"任务状态更新: {task_id} -> {status} ({progress}%)")
            
        except Exception as e:
            logger.error(f"更新任务状态失败: {e}")


# 全局AI服务实例
ai_service = AIService()
