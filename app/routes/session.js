import { Router } from "express"
import { SessionController } from '../controller/session.js'

export const createSessionRouter = ({ sessionModel }) => {
    const sessionRouter = Router()

    const sessionController = new SessionController({ sessionModel })

    sessionRouter.get('/', sessionController.login)
    sessionRouter.get('/register', sessionController.register)

    sessionRouter.post('/', sessionController.validateData)
    sessionRouter.post('/register', sessionController.validateData)

    return sessionRouter
}