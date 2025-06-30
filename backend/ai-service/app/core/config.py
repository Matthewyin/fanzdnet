"""
配置管理
"""

from pydantic_settings import BaseSettings
from pydantic import Field
import os

# 项目根目录
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class Settings(BaseSettings):
    """应用配置"""
    
    # 服务配置
    HOST: str = Field(default="0.0.0.0", env="HOST")
    PORT: int = Field(default=27002, env="PORT")
    DEBUG: bool = Field(default=True, env="DEBUG")
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    SECRET_KEY: str = Field(default="your-secret-key", env="SECRET_KEY")
    
    # AI服务配置
    GEMINI_API_KEY: str = Field(default="", env="GEMINI_API_KEY")
    OPENAI_API_KEY: str = Field(default="", env="OPENAI_API_KEY")
    AI_REQUEST_TIMEOUT: int = Field(default=300, env="AI_REQUEST_TIMEOUT")
    MAX_CONCURRENT_REQUESTS: int = Field(default=10, env="MAX_CONCURRENT_REQUESTS")
    
    # Redis配置
    REDIS_HOST: str = Field(default="localhost", env="REDIS_HOST")
    REDIS_PORT: int = Field(default=6379, env="REDIS_PORT")
    REDIS_PASSWORD: str = Field(default="", env="REDIS_PASSWORD")
    REDIS_DB: int = Field(default=1, env="REDIS_DB")
    
    # MySQL配置
    DB_HOST: str = Field(default="localhost", env="DB_HOST")
    DB_PORT: int = Field(default=3306, env="DB_PORT")
    DB_USER: str = Field(default="root", env="DB_USER")
    DB_PASSWORD: str = Field(default="netPA-2025", env="DB_PASSWORD")
    DB_NAME: str = Field(default="fanzd_net", env="DB_NAME")
    
    # 文件存储配置
    STORAGE_PATH: str = Field(default="../../storage", env="STORAGE_PATH")
    UPLOAD_PATH: str = Field(default="../../storage/uploads", env="UPLOAD_PATH")
    GENERATED_PATH: str = Field(default="../../storage/generated", env="GENERATED_PATH")
    TEMP_PATH: str = Field(default="../../storage/temp", env="TEMP_PATH")
    MAX_FILE_SIZE: int = Field(default=10485760, env="MAX_FILE_SIZE")  # 10MB
    
    # 图像处理配置
    MAX_IMAGE_WIDTH: int = Field(default=2048, env="MAX_IMAGE_WIDTH")
    MAX_IMAGE_HEIGHT: int = Field(default=2048, env="MAX_IMAGE_HEIGHT")
    THUMBNAIL_SIZE: int = Field(default=300, env="THUMBNAIL_SIZE")
    IMAGE_QUALITY: int = Field(default=85, env="IMAGE_QUALITY")
    
    # 安全配置
    ALLOWED_HOSTS: str = Field(default="localhost,127.0.0.1", env="ALLOWED_HOSTS")
    
    # 监控配置
    ENABLE_METRICS: bool = Field(default=True, env="ENABLE_METRICS")
    METRICS_PORT: int = Field(default=8001, env="METRICS_PORT")
    
    @property
    def redis_url(self) -> str:
        """Redis连接URL"""
        if self.REDIS_PASSWORD:
            return f"redis://:{self.REDIS_PASSWORD}@{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"
    
    @property
    def database_url(self) -> str:
        """数据库连接URL"""
        return f"mysql+aiomysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# 创建全局配置实例
settings = Settings()
