const mysql = require('mysql2/promise')
const logger = require('../utils/logger')

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'netPA-2025',
  database: process.env.DB_NAME || 'fanzd_net',
  charset: 'utf8mb4',
  timezone: '+08:00',
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  connectionLimit: 10,
  queueLimit: 0
}

// 创建连接池
const pool = mysql.createPool(dbConfig)

// 测试数据库连接
async function testConnection() {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    logger.info('✅ 数据库连接成功')
    return true
  } catch (error) {
    logger.error('❌ 数据库连接失败:', error.message)
    return false
  }
}

// 执行查询
async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params)
    return rows
  } catch (error) {
    logger.error('数据库查询错误:', error.message)
    logger.error('SQL:', sql)
    logger.error('参数:', params)
    throw error
  }
}

// 执行事务
async function transaction(callback) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    const result = await callback(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

// 分页查询辅助函数
function buildPaginationQuery(baseQuery, page = 1, limit = 10, orderBy = 'created_at DESC') {
  const offset = (page - 1) * limit
  return `${baseQuery} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`
}

// 构建WHERE条件
function buildWhereClause(conditions) {
  if (!conditions || Object.keys(conditions).length === 0) {
    return { whereClause: '', params: [] }
  }
  
  const clauses = []
  const params = []
  
  Object.entries(conditions).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        clauses.push(`${key} IN (${value.map(() => '?').join(',')})`)
        params.push(...value)
      } else if (typeof value === 'string' && value.includes('%')) {
        clauses.push(`${key} LIKE ?`)
        params.push(value)
      } else {
        clauses.push(`${key} = ?`)
        params.push(value)
      }
    }
  })
  
  return {
    whereClause: clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '',
    params
  }
}

// 初始化数据库连接
testConnection()

module.exports = {
  pool,
  query,
  transaction,
  testConnection,
  buildPaginationQuery,
  buildWhereClause
}
