export const headerDesactivate = () => (req, res, next) => {
    res.set('x-powered-by', 'jsonwebtoken 0.4.0')

    next()
}