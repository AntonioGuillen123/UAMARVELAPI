import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({ path: './env/.env' })

const env = process.env

const configDB = {
    host: env.IP_DATABASE,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_DATABASE
}

export const connection = await mysql.createConnection(configDB)