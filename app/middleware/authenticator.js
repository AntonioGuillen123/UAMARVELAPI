import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config({ path: '../env/.env' })

export const isAuthenticated = ({ sessionModel }) => async (req, res, next) => {
    const token = req.cookies?.jwt
    let redirect = true

    if (token) {
        let decodified

        try {
            await jwt.verify(token, process.env.JWT_SECRET, (err, key) => decodified = key)

            const result = await sessionModel.validate({ username: decodified.username, password: decodified.password })

            if (result) {
                req.user = result

                redirect = false
            }
        } catch (e) {
            res.clearCookie('jwt')
        }
    }

    redirect ? res.redirect('/session') : next()
}