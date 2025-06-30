"""
API路由定义
"""

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, Request
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from loguru import logger

from app.core.database import get_db
from app.core.redis_client import get_redis


# 创建API路由器
api_router = APIRouter()


# 请求模型
class GenerationRequest(BaseModel):
    """AI生成请求模型"""
    task_id: str = Field(..., description="任务ID")
    type: str = Field(..., description="生成类型: banner, slogan, emoji")
    prompt: str = Field(..., min_length=1, max_length=1000, description="生成提示词")
    parameters: Dict[str, Any] = Field(default_factory=dict, description="生成参数")


class TaskStatusResponse(BaseModel):
    """任务状态响应模型"""
    task_id: str
    status: str
    progress: int
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


# 依赖注入
async def get_ai_service(request: Request):
    """获取AI服务实例"""
    ai_svc = getattr(request.app.state, 'ai_service', None)
    if not ai_svc or not ai_svc.is_ready():
        raise HTTPException(status_code=503, detail="AI服务未就绪")
    return ai_svc


@api_router.post("/generate", response_model=Dict[str, Any])
async def generate_content(
    request: GenerationRequest,
    background_tasks: BackgroundTasks,
    ai_svc = Depends(get_ai_service)
):
    """
    生成AI内容
    """
    try:
        logger.info(f"收到生成请求: {request.task_id} - {request.type}")
        
        # 验证生成类型
        if request.type not in ['banner', 'slogan', 'emoji']:
            raise HTTPException(
                status_code=400, 
                detail="不支持的生成类型，仅支持: banner, slogan, emoji"
            )
        
        # 调用AI服务生成内容
        result = await ai_svc.generate_content(
            task_id=request.task_id,
            generation_type=request.type,
            prompt=request.prompt,
            parameters=request.parameters
        )
        
        return {
            "message": "生成任务已启动",
            "task_id": request.task_id,
            "status": result.get("status", "queued"),
            "estimated_time": 30  # 预估30秒
        }
        
    except Exception as e:
        logger.error(f"生成请求处理失败: {e}")
        raise HTTPException(status_code=500, detail=f"生成失败: {str(e)}")


@api_router.get("/task/{task_id}", response_model=TaskStatusResponse)
async def get_task_status(task_id: str):
    """
    获取任务状态
    """
    try:
        redis = await get_redis()
        db = await get_db()
        
        # 先从Redis缓存获取
        cache_key = f"task:{task_id}"
        cached_result = await redis.get(cache_key)
        
        if cached_result:
            return TaskStatusResponse(
                task_id=task_id,
                status=cached_result.get("status", "unknown"),
                progress=cached_result.get("progress", 0),
                result=cached_result.get("result"),
                error=cached_result.get("error")
            )
        
        # 从数据库获取
        query = """
            SELECT task_id, status, progress, output_image_path, 
                   error_message, generation_time, created_at, completed_at
            FROM fazd_generation_records 
            WHERE task_id = %s
        """
        
        results = await db.execute_query(query, (task_id,))
        
        if not results:
            raise HTTPException(status_code=404, detail="任务不存在")
        
        task = results[0]
        
        # 构建结果
        result_data = None
        if task['output_image_path']:
            result_data = {
                'image_path': task['output_image_path'],
                'generation_time': task['generation_time']
            }
        
        return TaskStatusResponse(
            task_id=task_id,
            status=task['status'],
            progress=task['progress'],
            result=result_data,
            error=task['error_message']
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"获取任务状态失败: {e}")
        raise HTTPException(status_code=500, detail=f"获取任务状态失败: {str(e)}")


@api_router.get("/queue/status")
async def get_queue_status(ai_svc = Depends(get_ai_service)):
    """
    获取队列状态
    """
    try:
        queue_size = ai_svc.generation_queue.qsize()
        worker_count = len(ai_svc.worker_tasks)
        
        return {
            "queue_size": queue_size,
            "worker_count": worker_count,
            "service_ready": ai_svc.is_ready()
        }
        
    except Exception as e:
        logger.error(f"获取队列状态失败: {e}")
        raise HTTPException(status_code=500, detail=f"获取队列状态失败: {str(e)}")


@api_router.post("/test/generate")
async def test_generate(ai_svc = Depends(get_ai_service)):
    """
    测试生成功能
    """
    try:
        import uuid
        test_task_id = str(uuid.uuid4())

        # 调用生成服务
        result = await ai_svc.generate_content(
            task_id=test_task_id,
            generation_type="slogan",
            prompt="为樊振东加油",
            parameters={"style": "激励"}
        )

        return {
            "message": "测试生成任务已创建",
            "test_task_id": test_task_id,
            "result": result
        }

    except Exception as e:
        logger.error(f"测试生成失败: {e}")
        raise HTTPException(status_code=500, detail=f"测试生成失败: {str(e)}")


@api_router.get("/models/status")
async def get_models_status(request: Request):
    """
    获取AI模型状态
    """
    try:
        from app.core.config import settings

        ai_svc = getattr(request.app.state, 'ai_service', None)

        models_status = {
            "gemini": {
                "configured": bool(settings.GEMINI_API_KEY),
                "available": bool(ai_svc.gemini_model) if ai_svc and ai_svc.is_ready() else False
            },
            "openai": {
                "configured": bool(settings.OPENAI_API_KEY),
                "available": False  # 暂未实现
            }
        }

        return {
            "models": models_status,
            "service_ready": ai_svc.is_ready() if ai_svc else False
        }

    except Exception as e:
        logger.error(f"获取模型状态失败: {e}")
        raise HTTPException(status_code=500, detail=f"获取模型状态失败: {str(e)}")


# 健康检查路由
@api_router.get("/health")
async def health_check(request: Request):
    """AI服务健康检查"""
    try:
        # 检查各个组件状态
        db = await get_db()
        redis = await get_redis()

        # 测试数据库连接
        await db.execute_query("SELECT 1")
        db_status = "healthy"

        # 测试Redis连接
        await redis.set("health_check", "ok", expire=10)
        redis_status = "healthy"

        # 检查AI服务状态
        ai_svc = getattr(request.app.state, 'ai_service', None)
        ai_status = "ready" if ai_svc and ai_svc.is_ready() else "not_ready"

        return {
            "status": "healthy",
            "components": {
                "database": db_status,
                "redis": redis_status,
                "ai_service": ai_status
            },
            "queue_size": ai_svc.generation_queue.qsize() if ai_svc and ai_svc.is_ready() else 0
        }

    except Exception as e:
        logger.error(f"健康检查失败: {e}")
        raise HTTPException(status_code=503, detail="服务不健康")


# 添加到主路由器
api_router.tags = ["AI生成服务"]
