import jwt from 'jsonwebtoken'

export const isAdmin = () => async (req, res, next) => { 
    const token = req.cookies?.jwt

    let decodified

    await jwt.verify(token, process.env.JWT_SECRET, (err, key) => decodified = key)

    decodified.admin ? next() : res.redirect('/api/v2/universe')
}