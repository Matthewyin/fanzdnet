-- =====================================================
-- 樊振东球迷网站AI应援物生成器数据库初始化脚本
-- 数据库名称: fanzd_net
-- 表前缀: fazd_
-- 创建时间: 2025-01-27
-- =====================================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS fanzd_net 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE fanzd_net;

-- =====================================================
-- 用户管理相关表
-- =====================================================

-- 用户表
CREATE TABLE fazd_users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
    email VARCHAR(100) UNIQUE NOT NULL COMMENT '邮箱',
    password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希',
    user_level ENUM('free', 'vip', 'enterprise') DEFAULT 'free' COMMENT '用户等级',
    daily_quota INT DEFAULT 3 COMMENT '每日生成配额',
    used_quota INT DEFAULT 0 COMMENT '已使用配额',
    avatar_url VARCHAR(500) COMMENT '头像URL',
    nickname VARCHAR(100) COMMENT '昵称',
    bio TEXT COMMENT '个人简介',
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active' COMMENT '用户状态',
    last_login_at TIMESTAMP NULL COMMENT '最后登录时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_user_level (user_level),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- =====================================================
-- AI生成相关表
-- =====================================================

-- 生成记录表
CREATE TABLE fazd_generation_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    task_id VARCHAR(36) UNIQUE NOT NULL COMMENT '任务ID',
    type ENUM('banner', 'slogan', 'emoji') NOT NULL COMMENT '生成类型',
    title VARCHAR(200) COMMENT '作品标题',
    prompt TEXT NOT NULL COMMENT '生成提示词',
    parameters JSON COMMENT '生成参数',
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending' COMMENT '生成状态',
    progress INT DEFAULT 0 COMMENT '生成进度(0-100)',
    input_image_path VARCHAR(500) COMMENT '输入图片路径',
    output_image_path VARCHAR(500) COMMENT '输出图片路径',
    thumbnail_path VARCHAR(500) COMMENT '缩略图路径',
    file_size BIGINT COMMENT '文件大小(字节)',
    dimensions VARCHAR(50) COMMENT '图片尺寸(宽x高)',
    error_message TEXT COMMENT '错误信息',
    generation_time INT COMMENT '生成耗时(秒)',
    is_public BOOLEAN DEFAULT FALSE COMMENT '是否公开',
    likes_count INT DEFAULT 0 COMMENT '点赞数',
    downloads_count INT DEFAULT 0 COMMENT '下载数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    completed_at TIMESTAMP NULL COMMENT '完成时间',
    
    FOREIGN KEY (user_id) REFERENCES fazd_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_task_id (task_id),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_is_public (is_public),
    INDEX idx_created_at (created_at),
    INDEX idx_likes_count (likes_count),
    INDEX idx_downloads_count (downloads_count)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI生成记录表';

-- 模板表
CREATE TABLE fazd_templates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '模板名称',
    type ENUM('banner', 'slogan', 'emoji') NOT NULL COMMENT '模板类型',
    category VARCHAR(50) COMMENT '模板分类',
    description TEXT COMMENT '模板描述',
    template_path VARCHAR(500) COMMENT '模板文件路径',
    preview_path VARCHAR(500) COMMENT '预览图路径',
    thumbnail_path VARCHAR(500) COMMENT '缩略图路径',
    parameters JSON COMMENT '模板参数配置',
    tags VARCHAR(500) COMMENT '标签(逗号分隔)',
    is_active BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    is_premium BOOLEAN DEFAULT FALSE COMMENT '是否为付费模板',
    sort_order INT DEFAULT 0 COMMENT '排序权重',
    usage_count INT DEFAULT 0 COMMENT '使用次数',
    created_by BIGINT COMMENT '创建者ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    FOREIGN KEY (created_by) REFERENCES fazd_users(id) ON DELETE SET NULL,
    INDEX idx_type (type),
    INDEX idx_category (category),
    INDEX idx_is_active (is_active),
    INDEX idx_is_premium (is_premium),
    INDEX idx_sort_order (sort_order),
    INDEX idx_usage_count (usage_count),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='应援物模板表';

-- =====================================================
-- 文件管理相关表
-- =====================================================

-- 文件记录表
CREATE TABLE fazd_file_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT COMMENT '用户ID',
    file_path VARCHAR(500) NOT NULL COMMENT '文件路径',
    original_name VARCHAR(255) COMMENT '原始文件名',
    file_name VARCHAR(255) NOT NULL COMMENT '存储文件名',
    file_size BIGINT COMMENT '文件大小(字节)',
    mime_type VARCHAR(100) COMMENT 'MIME类型',
    file_type ENUM('upload', 'generated', 'template', 'thumbnail', 'avatar') COMMENT '文件类型',
    file_hash VARCHAR(64) COMMENT '文件哈希值(用于去重)',
    dimensions VARCHAR(50) COMMENT '图片尺寸(宽x高)',
    storage_type ENUM('local', 'oss', 'cdn') DEFAULT 'local' COMMENT '存储类型',
    access_count INT DEFAULT 0 COMMENT '访问次数',
    is_deleted BOOLEAN DEFAULT FALSE COMMENT '是否已删除',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    expires_at TIMESTAMP NULL COMMENT '过期时间',
    deleted_at TIMESTAMP NULL COMMENT '删除时间',
    
    FOREIGN KEY (user_id) REFERENCES fazd_users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_file_type (file_type),
    INDEX idx_file_hash (file_hash),
    INDEX idx_storage_type (storage_type),
    INDEX idx_is_deleted (is_deleted),
    INDEX idx_created_at (created_at),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文件记录表';

-- =====================================================
-- 社区功能相关表
-- =====================================================

-- 作品收藏表
CREATE TABLE fazd_user_favorites (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    generation_id BIGINT NOT NULL COMMENT '作品ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
    
    FOREIGN KEY (user_id) REFERENCES fazd_users(id) ON DELETE CASCADE,
    FOREIGN KEY (generation_id) REFERENCES fazd_generation_records(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_generation (user_id, generation_id),
    INDEX idx_user_id (user_id),
    INDEX idx_generation_id (generation_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户收藏表';

-- 作品点赞表
CREATE TABLE fazd_user_likes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    generation_id BIGINT NOT NULL COMMENT '作品ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
    
    FOREIGN KEY (user_id) REFERENCES fazd_users(id) ON DELETE CASCADE,
    FOREIGN KEY (generation_id) REFERENCES fazd_generation_records(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_generation (user_id, generation_id),
    INDEX idx_user_id (user_id),
    INDEX idx_generation_id (generation_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户点赞表';

-- =====================================================
-- 系统配置相关表
-- =====================================================

-- 系统配置表
CREATE TABLE fazd_system_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) UNIQUE NOT NULL COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    config_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string' COMMENT '配置类型',
    description VARCHAR(500) COMMENT '配置描述',
    is_public BOOLEAN DEFAULT FALSE COMMENT '是否为公开配置',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    INDEX idx_config_key (config_key),
    INDEX idx_is_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- =====================================================
-- 初始化数据
-- =====================================================

-- 插入系统配置
INSERT INTO fazd_system_config (config_key, config_value, config_type, description, is_public) VALUES
('site_name', '樊振东球迷网站', 'string', '网站名称', TRUE),
('ai_service_enabled', 'true', 'boolean', 'AI服务是否启用', FALSE),
('daily_quota_free', '3', 'number', '免费用户每日配额', TRUE),
('daily_quota_vip', '20', 'number', 'VIP用户每日配额', TRUE),
('daily_quota_enterprise', '100', 'number', '企业用户每日配额', TRUE),
('max_file_size', '10485760', 'number', '最大文件大小(10MB)', TRUE),
('supported_image_types', '["jpg", "jpeg", "png", "gif", "webp"]', 'json', '支持的图片格式', TRUE),
('generation_timeout', '300', 'number', 'AI生成超时时间(秒)', FALSE);

-- 插入默认模板分类
INSERT INTO fazd_templates (name, type, category, description, is_active, sort_order) VALUES
('经典横幅模板', 'banner', '经典风格', '传统红白配色的经典应援横幅模板', TRUE, 100),
('现代简约横幅', 'banner', '现代风格', '简洁大气的现代风格横幅模板', TRUE, 90),
('激励口号模板', 'slogan', '激励类', '充满正能量的激励口号模板', TRUE, 80),
('胜利口号模板', 'slogan', '胜利类', '庆祝胜利的口号模板', TRUE, 70),
('经典表情包', 'emoji', '经典类', '樊振东经典表情包模板', TRUE, 60);

COMMIT;

-- =====================================================
-- 数据库初始化完成
-- =====================================================
