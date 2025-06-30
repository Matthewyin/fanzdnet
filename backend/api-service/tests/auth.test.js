/**
 * 认证功能测试
 */

const request = require('supertest')
const app = require('../src/app')
const db = require('../src/config/database')

describe('Authentication Tests', () => {
  let testUser = {
    username: 'testuser_' + Date.now(),
    email: 'test_' + Date.now() + '@fanzdnet.com',
    password: 'TestPass123',
    nickname: '测试用户'
  }
  
  let authToken = null

  beforeAll(async () => {
    // 确保数据库连接
    await new Promise(resolve => setTimeout(resolve, 1000))
  })

  afterAll(async () => {
    // 清理测试数据
    if (testUser.username) {
      try {
        await db.execute(
          'DELETE FROM fazd_users WHERE username = ?',
          [testUser.username]
        )
      } catch (error) {
        console.log('清理测试数据失败:', error.message)
      }
    }
  })

  describe('POST /api/auth/register', () => {
    test('应该成功注册新用户', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201)

      expect(response.body).toHaveProperty('message', '注册成功')
      expect(response.body).toHaveProperty('user')
      expect(response.body.user).toHaveProperty('id')
      expect(response.body.user.username).toBe(testUser.username)
      expect(response.body.user.email).toBe(testUser.email)
      expect(response.body.user).not.toHaveProperty('password')
    })

    test('应该拒绝重复的用户名', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(400)

      expect(response.body).toHaveProperty('error')
      expect(response.body.code).toBe('USER_EXISTS')
    })

    test('应该拒绝无效的邮箱格式', async () => {
      const invalidUser = {
        ...testUser,
        username: 'testuser2_' + Date.now(),
        email: 'invalid-email'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400)

      expect(response.body).toHaveProperty('error')
    })

    test('应该拒绝弱密码', async () => {
      const weakPasswordUser = {
        ...testUser,
        username: 'testuser3_' + Date.now(),
        email: 'test3_' + Date.now() + '@fanzdnet.com',
        password: '123'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(weakPasswordUser)
        .expect(400)

      expect(response.body).toHaveProperty('error')
    })
  })

  describe('POST /api/auth/login', () => {
    test('应该成功登录有效用户', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          login: testUser.username,
          password: testUser.password
        })
        .expect(200)

      expect(response.body).toHaveProperty('message', '登录成功')
      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('user')
      expect(response.body.user.username).toBe(testUser.username)

      // 保存token用于后续测试
      authToken = response.body.token
    })

    test('应该支持邮箱登录', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          login: testUser.email,
          password: testUser.password
        })
        .expect(200)

      expect(response.body).toHaveProperty('token')
      expect(response.body.user.email).toBe(testUser.email)
    })

    test('应该拒绝错误的密码', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          login: testUser.username,
          password: 'wrongpassword'
        })
        .expect(401)

      expect(response.body).toHaveProperty('error')
      expect(response.body.code).toBe('INVALID_CREDENTIALS')
    })

    test('应该拒绝不存在的用户', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          login: 'nonexistentuser',
          password: 'password123'
        })
        .expect(401)

      expect(response.body).toHaveProperty('error')
      expect(response.body.code).toBe('INVALID_CREDENTIALS')
    })
  })

  describe('GET /api/auth/profile', () => {
    test('应该返回已认证用户的个人信息', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body).toHaveProperty('user')
      expect(response.body.user.username).toBe(testUser.username)
      expect(response.body.user.email).toBe(testUser.email)
      expect(response.body.user).not.toHaveProperty('password')
    })

    test('应该拒绝未认证的请求', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401)

      expect(response.body).toHaveProperty('error')
      expect(response.body.code).toBe('NO_TOKEN')
    })

    test('应该拒绝无效的token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401)

      expect(response.body).toHaveProperty('error')
      expect(response.body.code).toBe('INVALID_TOKEN')
    })
  })

  describe('POST /api/auth/logout', () => {
    test('应该成功登出用户', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body).toHaveProperty('message', '登出成功')
    })
  })
})
