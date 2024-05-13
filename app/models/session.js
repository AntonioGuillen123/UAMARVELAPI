import { connection } from '../models/basemodel.js'
import bcrypt from 'bcryptjs'

const SALTS = 12

export class SessionModel {
    static validate = async ({ username, password }) => {
        let result

        try {
            const [users] = await connection.query('SELECT COUNT(*) count, username, password passwordBD, admin FROM userapp WHERE username = ?;', [username])

            const user = users[0]
            
            const { count, passwordBD } = user

            if (count === 1 && await bcrypt.compare(password, passwordBD))
                result = user
        } catch (e) {
            result = false
        }
        
        return result
    }
    
    static create = async ({ username, password }) => {
        let result = true

        const hassedPassword = await this.hashPassword({ password })

        try {
            await connection.query('INSERT INTO userapp (username, password) VALUES (?, ?)', [username, hassedPassword])
        } catch (e) {
            result = false
        }

        return result
    }

    static hashPassword = async ({ password }) => await bcrypt.hash(password, SALTS)
}