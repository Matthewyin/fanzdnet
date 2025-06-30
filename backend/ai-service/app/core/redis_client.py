"""
Redis客户端管理
"""

import redis.asyncio as redis
from loguru import logger
from typing import Optional, Any
import json
import pickle

from app.core.config import settings


class RedisManager:
    """Redis管理器"""
    
    def __init__(self):
        self.redis_client: Optional[redis.Redis] = None
    
    async def initialize(self):
        """初始化Redis连接"""
        try:
            self.redis_client = redis.from_url(
                settings.redis_url,
                encoding="utf-8",
                decode_responses=True,
                socket_connect_timeout=5,
                socket_timeout=5,
                retry_on_timeout=True,
                health_check_interval=30
            )
            
            # 测试连接
            await self.redis_client.ping()
            logger.info("Redis连接初始化成功")
            
        except Exception as e:
            logger.error(f"Redis连接初始化失败: {e}")
            raise
    
    async def close(self):
        """关闭Redis连接"""
        if self.redis_client:
            await self.redis_client.close()
            logger.info("Redis连接已关闭")
    
    async def set(self, key: str, value: Any, expire: Optional[int] = None) -> bool:
        """设置键值对"""
        try:
            if isinstance(value, (dict, list)):
                value = json.dumps(value, ensure_ascii=False)
            elif not isinstance(value, str):
                value = str(value)
            
            result = await self.redis_client.set(key, value, ex=expire)
            return result
        except Exception as e:
            logger.error(f"Redis设置失败 - Key: {key}, Error: {e}")
            return False
    
    async def get(self, key: str) -> Optional[Any]:
        """获取值"""
        try:
            value = await self.redis_client.get(key)
            if value is None:
                return None
            
            # 尝试解析JSON
            try:
                return json.loads(value)
            except (json.JSONDecodeError, TypeError):
                return value
                
        except Exception as e:
            logger.error(f"Redis获取失败 - Key: {key}, Error: {e}")
            return None
    
    async def delete(self, key: str) -> bool:
        """删除键"""
        try:
            result = await self.redis_client.delete(key)
            return result > 0
        except Exception as e:
            logger.error(f"Redis删除失败 - Key: {key}, Error: {e}")
            return False
    
    async def exists(self, key: str) -> bool:
        """检查键是否存在"""
        try:
            result = await self.redis_client.exists(key)
            return result > 0
        except Exception as e:
            logger.error(f"Redis检查存在失败 - Key: {key}, Error: {e}")
            return False
    
    async def expire(self, key: str, seconds: int) -> bool:
        """设置过期时间"""
        try:
            result = await self.redis_client.expire(key, seconds)
            return result
        except Exception as e:
            logger.error(f"Redis设置过期时间失败 - Key: {key}, Error: {e}")
            return False
    
    async def incr(self, key: str, amount: int = 1) -> Optional[int]:
        """递增"""
        try:
            result = await self.redis_client.incrby(key, amount)
            return result
        except Exception as e:
            logger.error(f"Redis递增失败 - Key: {key}, Error: {e}")
            return None
    
    async def hset(self, name: str, key: str, value: Any) -> bool:
        """设置哈希字段"""
        try:
            if isinstance(value, (dict, list)):
                value = json.dumps(value, ensure_ascii=False)
            elif not isinstance(value, str):
                value = str(value)
            
            result = await self.redis_client.hset(name, key, value)
            return result
        except Exception as e:
            logger.error(f"Redis哈希设置失败 - Name: {name}, Key: {key}, Error: {e}")
            return False
    
    async def hget(self, name: str, key: str) -> Optional[Any]:
        """获取哈希字段值"""
        try:
            value = await self.redis_client.hget(name, key)
            if value is None:
                return None
            
            # 尝试解析JSON
            try:
                return json.loads(value)
            except (json.JSONDecodeError, TypeError):
                return value
                
        except Exception as e:
            logger.error(f"Redis哈希获取失败 - Name: {name}, Key: {key}, Error: {e}")
            return None
    
    async def hgetall(self, name: str) -> dict:
        """获取哈希所有字段"""
        try:
            result = await self.redis_client.hgetall(name)
            
            # 尝试解析JSON值
            parsed_result = {}
            for key, value in result.items():
                try:
                    parsed_result[key] = json.loads(value)
                except (json.JSONDecodeError, TypeError):
                    parsed_result[key] = value
            
            return parsed_result
        except Exception as e:
            logger.error(f"Redis哈希获取全部失败 - Name: {name}, Error: {e}")
            return {}
    
    async def lpush(self, key: str, *values) -> Optional[int]:
        """列表左推"""
        try:
            # 序列化复杂对象
            serialized_values = []
            for value in values:
                if isinstance(value, (dict, list)):
                    serialized_values.append(json.dumps(value, ensure_ascii=False))
                else:
                    serialized_values.append(str(value))
            
            result = await self.redis_client.lpush(key, *serialized_values)
            return result
        except Exception as e:
            logger.error(f"Redis列表推入失败 - Key: {key}, Error: {e}")
            return None
    
    async def rpop(self, key: str) -> Optional[Any]:
        """列表右弹"""
        try:
            value = await self.redis_client.rpop(key)
            if value is None:
                return None
            
            # 尝试解析JSON
            try:
                return json.loads(value)
            except (json.JSONDecodeError, TypeError):
                return value
                
        except Exception as e:
            logger.error(f"Redis列表弹出失败 - Key: {key}, Error: {e}")
            return None


# 全局Redis管理器实例
redis_manager = RedisManager()


async def init_redis():
    """初始化Redis"""
    await redis_manager.initialize()


async def get_redis():
    """获取Redis管理器实例"""
    return redis_manager


async def close_redis():
    """关闭Redis连接"""
    await redis_manager.close()
