import { Router } from 'express'

import { isAuthenticated } from '../middleware/authenticator.js'
import { isAdmin } from '../middleware/isadmin.js'

import { createSessionRouter } from './session.js'
import { createApiRouter } from './api.js'

import { SessionModel } from '../models/session.js'

export const createAppRouter = () => {
    const appRouter = Router()

    appRouter.use('/session', createSessionRouter({ sessionModel: SessionModel }))

    appRouter.use(isAuthenticated({ sessionModel: SessionModel }))

    appRouter.use('/api/v2', createApiRouter({ latest: true }))

    appRouter.use(isAdmin())

    appRouter.use('/api/v1', createApiRouter({ latest: false }))

    appRouter.use((req, res) => res.redirect('/api/v2'))

    return appRouter
}