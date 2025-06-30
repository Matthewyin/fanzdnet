"""
AI服务测试
"""

import pytest
import asyncio
import json
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

from app.main import app
from app.services.ai_service import AIService
from app.core.config import settings


class TestAIService:
    """AI服务测试类"""
    
    @pytest.fixture
    def client(self):
        """测试客户端"""
        return TestClient(app)
    
    @pytest.fixture
    async def ai_service(self):
        """AI服务实例"""
        service = AIService()
        await service.initialize()
        yield service
        await service.cleanup()
    
    def test_health_check(self, client):
        """测试健康检查"""
        response = client.get("/health")
        assert response.status_code == 200
        
        data = response.json()
        assert "status" in data
        assert data["status"] == "healthy"
    
    def test_api_health_check(self, client):
        """测试API健康检查"""
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        
        data = response.json()
        assert "status" in data
        assert "components" in data
        assert "ai_service" in data["components"]
    
    def test_models_status(self, client):
        """测试模型状态"""
        response = client.get("/api/v1/models/status")
        assert response.status_code == 200
        
        data = response.json()
        assert "models" in data
        assert "service_ready" in data
        assert "gemini" in data["models"]
    
    def test_queue_status(self, client):
        """测试队列状态"""
        response = client.get("/api/v1/queue/status")
        assert response.status_code == 200
        
        data = response.json()
        assert "queue_size" in data
        assert "worker_count" in data
        assert "service_ready" in data
    
    @pytest.mark.asyncio
    async def test_ai_service_initialization(self, ai_service):
        """测试AI服务初始化"""
        assert ai_service.is_ready()
        assert ai_service.generation_queue is not None
        assert len(ai_service.worker_tasks) > 0
    
    @pytest.mark.asyncio
    async def test_generate_slogan(self, ai_service):
        """测试口号生成"""
        task_id = "test_slogan_001"
        prompt = "为樊振东加油"
        parameters = {"style": "激励", "count": 3}
        
        result = await ai_service.generate_content(
            task_id=task_id,
            generation_type="slogan",
            prompt=prompt,
            parameters=parameters
        )
        
        assert result["status"] == "queued"
        assert result["task_id"] == task_id
        
        # 等待生成完成
        await asyncio.sleep(5)
        
        # 检查任务状态（这里需要模拟数据库查询）
        # 实际测试中应该检查数据库中的任务状态
    
    @pytest.mark.asyncio
    async def test_generate_banner(self, ai_service):
        """测试横幅生成"""
        task_id = "test_banner_001"
        prompt = "樊振东必胜横幅"
        parameters = {
            "width": 800,
            "height": 300,
            "backgroundColor": "#ff0000",
            "textColor": "#ffffff"
        }
        
        result = await ai_service.generate_content(
            task_id=task_id,
            generation_type="banner",
            prompt=prompt,
            parameters=parameters
        )
        
        assert result["status"] == "queued"
        assert result["task_id"] == task_id
    
    @pytest.mark.asyncio
    async def test_generate_emoji(self, ai_service):
        """测试表情包生成"""
        task_id = "test_emoji_001"
        prompt = "樊振东加油表情包"
        parameters = {
            "style": "可爱",
            "size": 300,
            "format": "png"
        }
        
        result = await ai_service.generate_content(
            task_id=task_id,
            generation_type="emoji",
            prompt=prompt,
            parameters=parameters
        )
        
        assert result["status"] == "queued"
        assert result["task_id"] == task_id
    
    def test_generate_api_endpoint(self, client):
        """测试生成API端点"""
        payload = {
            "task_id": "test_api_001",
            "type": "slogan",
            "prompt": "为樊振东加油",
            "parameters": {"style": "激励"}
        }
        
        response = client.post("/api/v1/generate", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert "task_id" in data
        assert "status" in data
        assert data["task_id"] == payload["task_id"]
    
    def test_generate_api_invalid_type(self, client):
        """测试无效生成类型"""
        payload = {
            "task_id": "test_invalid_001",
            "type": "invalid_type",
            "prompt": "测试",
            "parameters": {}
        }
        
        response = client.post("/api/v1/generate", json=payload)
        assert response.status_code == 400
        
        data = response.json()
        assert "detail" in data
        assert "不支持的生成类型" in data["detail"]
    
    def test_generate_api_empty_prompt(self, client):
        """测试空提示词"""
        payload = {
            "task_id": "test_empty_001",
            "type": "slogan",
            "prompt": "",
            "parameters": {}
        }
        
        response = client.post("/api/v1/generate", json=payload)
        assert response.status_code == 422  # Validation error
    
    def test_task_status_not_found(self, client):
        """测试不存在的任务状态"""
        response = client.get("/api/v1/task/nonexistent_task")
        assert response.status_code == 404
        
        data = response.json()
        assert "detail" in data
        assert "任务不存在" in data["detail"]
    
    @patch('app.services.ai_service.genai')
    @pytest.mark.asyncio
    async def test_gemini_integration(self, mock_genai, ai_service):
        """测试Gemini集成"""
        # 模拟Gemini响应
        mock_response = AsyncMock()
        mock_response.text = "樊振东加油！永不放弃！"
        
        mock_model = AsyncMock()
        mock_model.generate_content.return_value = mock_response
        mock_genai.GenerativeModel.return_value = mock_model
        
        # 测试生成
        task_id = "test_gemini_001"
        result = await ai_service.generate_content(
            task_id=task_id,
            generation_type="slogan",
            prompt="为樊振东加油",
            parameters={"style": "激励"}
        )
        
        assert result["status"] == "queued"
    
    @pytest.mark.asyncio
    async def test_concurrent_generation(self, ai_service):
        """测试并发生成"""
        tasks = []
        
        for i in range(5):
            task_id = f"concurrent_test_{i}"
            task = ai_service.generate_content(
                task_id=task_id,
                generation_type="slogan",
                prompt=f"测试并发生成 {i}",
                parameters={"style": "激励"}
            )
            tasks.append(task)
        
        results = await asyncio.gather(*tasks)
        
        # 检查所有任务都成功排队
        for result in results:
            assert result["status"] == "queued"
    
    @pytest.mark.asyncio
    async def test_error_handling(self, ai_service):
        """测试错误处理"""
        # 测试无效的生成类型
        with pytest.raises(ValueError):
            await ai_service._generate_banner({
                "task_id": "error_test",
                "type": "invalid",
                "prompt": "测试",
                "parameters": {}
            })


class TestImageGeneration:
    """图像生成测试"""
    
    @pytest.mark.asyncio
    async def test_banner_image_creation(self):
        """测试横幅图片创建"""
        from app.services.ai_service import AIService
        
        ai_service = AIService()
        
        task_id = "banner_image_test"
        text = "樊振东加油！"
        parameters = {
            "width": 800,
            "height": 300,
            "backgroundColor": "#ff0000",
            "textColor": "#ffffff"
        }
        
        image_path = await ai_service._create_banner_image(
            task_id, text, parameters
        )
        
        assert image_path is not None
        assert image_path.endswith(".png")
        assert "banners" in image_path
    
    @pytest.mark.asyncio
    async def test_emoji_image_creation(self):
        """测试表情包图片创建"""
        from app.services.ai_service import AIService
        
        ai_service = AIService()
        
        task_id = "emoji_image_test"
        prompt = "樊振东加油"
        parameters = {
            "style": "可爱",
            "size": 300
        }
        
        image_path = await ai_service._create_emoji_image(
            task_id, prompt, parameters
        )
        
        assert image_path is not None
        assert image_path.endswith(".png")
        assert "emojis" in image_path


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
