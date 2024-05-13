import { Router } from 'express'

import { isAdmin } from '../middleware/isadmin.js'

import { createCharacterRouter } from './character.js'
import { createComicRouter } from './comic.js'
import { createCreatorRouter } from './creator.js'
import { createUniverseRouter } from './universe.js'

import { SessionController } from '../controller/session.js'

import { CharacterModel } from '../models/character.js'
import { ComicModel } from '../models/comic.js'
import { CreatorModel } from '../models/creator.js'
import { UniverseModel } from '../models/universe.js'
import { SessionModel } from '../models/session.js'

export const createApiRouter = ({ latest }) => {
    const apiRouter = Router()

    const sessionController = new SessionController({ sessionModel: SessionModel })

    apiRouter.get('/', (req, res) => sessionController.index(req, res, { latest }))

    apiRouter.use('/universe', createUniverseRouter({ universeModel: UniverseModel, latest }))

    if (latest)
        apiRouter.use(isAdmin())
    else
        apiRouter.get('/send_mail', sessionController.mail)

    apiRouter.use('/comic', createComicRouter({ comicModel: ComicModel }))
    apiRouter.use('/creator', createCreatorRouter({ creatorModel: CreatorModel }))
    apiRouter.use('/character', createCharacterRouter({ characterModel: CharacterModel }))

    return apiRouter
}