"""
数据库连接管理
"""

import mysql.connector
from mysql.connector import Error
from loguru import logger
from typing import Optional, Dict, Any, List
import asyncio
from contextlib import asynccontextmanager

from app.core.config import settings


class DatabaseManager:
    """数据库管理器"""
    
    def __init__(self):
        self.pool = None
        self._connection_config = {
            'host': settings.DB_HOST,
            'port': settings.DB_PORT,
            'user': settings.DB_USER,
            'password': settings.DB_PASSWORD,
            'database': settings.DB_NAME,
            'charset': 'utf8mb4',
            'collation': 'utf8mb4_unicode_ci',
            'autocommit': True,
            'pool_name': 'ai_service_pool',
            'pool_size': 10,
            'pool_reset_session': True
        }
    
    async def initialize(self):
        """初始化数据库连接池"""
        try:
            self.pool = mysql.connector.pooling.MySQLConnectionPool(**self._connection_config)
            logger.info("数据库连接池初始化成功")
            
            # 测试连接
            await self.test_connection()
            
        except Error as e:
            logger.error(f"数据库连接池初始化失败: {e}")
            raise
    
    async def test_connection(self):
        """测试数据库连接"""
        try:
            connection = self.pool.get_connection()
            cursor = connection.cursor()
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            
            if result[0] == 1:
                logger.info("数据库连接测试成功")
            else:
                raise Exception("数据库连接测试失败")
                
        except Error as e:
            logger.error(f"数据库连接测试失败: {e}")
            raise
    
    @asynccontextmanager
    async def get_connection(self):
        """获取数据库连接（上下文管理器）"""
        connection = None
        try:
            connection = self.pool.get_connection()
            yield connection
        except Error as e:
            logger.error(f"获取数据库连接失败: {e}")
            raise
        finally:
            if connection and connection.is_connected():
                connection.close()
    
    async def execute_query(self, query: str, params: tuple = None) -> List[Dict[str, Any]]:
        """执行查询并返回结果"""
        async with self.get_connection() as connection:
            cursor = connection.cursor(dictionary=True)
            try:
                cursor.execute(query, params or ())
                result = cursor.fetchall()
                return result
            except Error as e:
                logger.error(f"查询执行失败: {e}")
                logger.error(f"SQL: {query}")
                logger.error(f"参数: {params}")
                raise
            finally:
                cursor.close()
    
    async def execute_update(self, query: str, params: tuple = None) -> int:
        """执行更新操作并返回影响的行数"""
        async with self.get_connection() as connection:
            cursor = connection.cursor()
            try:
                cursor.execute(query, params or ())
                connection.commit()
                return cursor.rowcount
            except Error as e:
                connection.rollback()
                logger.error(f"更新执行失败: {e}")
                logger.error(f"SQL: {query}")
                logger.error(f"参数: {params}")
                raise
            finally:
                cursor.close()
    
    async def execute_insert(self, query: str, params: tuple = None) -> int:
        """执行插入操作并返回插入的ID"""
        async with self.get_connection() as connection:
            cursor = connection.cursor()
            try:
                cursor.execute(query, params or ())
                connection.commit()
                return cursor.lastrowid
            except Error as e:
                connection.rollback()
                logger.error(f"插入执行失败: {e}")
                logger.error(f"SQL: {query}")
                logger.error(f"参数: {params}")
                raise
            finally:
                cursor.close()
    
    async def close(self):
        """关闭数据库连接池"""
        if self.pool:
            # 关闭连接池中的所有连接
            try:
                # 获取所有连接并关闭
                connections = []
                while True:
                    try:
                        conn = self.pool.get_connection()
                        connections.append(conn)
                    except:
                        break
                
                for conn in connections:
                    if conn.is_connected():
                        conn.close()
                        
                logger.info("数据库连接池已关闭")
            except Exception as e:
                logger.error(f"关闭数据库连接池时出错: {e}")


# 全局数据库管理器实例
db_manager = DatabaseManager()


async def init_db():
    """初始化数据库"""
    await db_manager.initialize()


async def get_db():
    """获取数据库管理器实例"""
    return db_manager


async def close_db():
    """关闭数据库连接"""
    await db_manager.close()
