"""
樊振东球迷网站AI应援物生成器 - AI服务
FastAPI应用主入口
"""

import os
import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from loguru import logger

from app.core.config import settings
from app.core.database import init_db
from app.core.redis_client import init_redis
from app.api.routes import api_router
from app.services.ai_service import AIService


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时初始化
    logger.info("🚀 AI服务启动中...")
    
    # 初始化数据库连接
    await init_db()
    logger.info("✅ 数据库连接初始化完成")
    
    # 初始化Redis连接
    await init_redis()
    logger.info("✅ Redis连接初始化完成")
    
    # 初始化AI服务
    ai_service = AIService()
    await ai_service.initialize()
    app.state.ai_service = ai_service
    logger.info("✅ AI服务初始化完成")
    
    # 创建存储目录
    os.makedirs(settings.STORAGE_PATH, exist_ok=True)
    os.makedirs(settings.GENERATED_PATH, exist_ok=True)
    os.makedirs(settings.TEMP_PATH, exist_ok=True)
    logger.info("✅ 存储目录创建完成")
    
    logger.info(f"🎉 AI服务启动成功 - 端口: {settings.PORT}")
    
    yield
    
    # 关闭时清理
    logger.info("🔄 AI服务关闭中...")
    if hasattr(app.state, 'ai_service'):
        await app.state.ai_service.cleanup()
    logger.info("✅ AI服务关闭完成")


# 创建FastAPI应用
app = FastAPI(
    title="樊振东球迷网站AI服务",
    description="为樊振东球迷网站提供AI应援物生成服务",
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan
)

# 添加中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware, minimum_size=1000)

# 注册路由
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    """根路径"""
    return {
        "service": "樊振东球迷网站AI服务",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs" if settings.DEBUG else "disabled"
    }


@app.get("/health")
async def health_check():
    """健康检查"""
    try:
        # 检查AI服务状态
        ai_service = getattr(app.state, 'ai_service', None)
        ai_status = "ready" if ai_service and ai_service.is_ready() else "not_ready"
        
        return {
            "status": "healthy",
            "ai_service": ai_status,
            "timestamp": asyncio.get_event_loop().time()
        }
    except Exception as e:
        logger.error(f"健康检查失败: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """全局异常处理"""
    logger.error(f"未处理的异常: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "内部服务器错误",
            "code": "INTERNAL_SERVER_ERROR",
            "detail": str(exc) if settings.DEBUG else "服务暂时不可用"
        }
    )


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )
