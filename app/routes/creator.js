import { Router } from 'express'
import { CreatorController } from '../controller/creator.js'

export const createCreatorRouter = ({ creatorModel }) => {
    const creatorRouter = Router()

    const creatorController = new CreatorController({ creatorModel })

    creatorRouter.get('/', creatorController.getAll)
    creatorRouter.get('/:id', creatorController.getById)
    creatorRouter.get('/image/:id', creatorController.getImage)

    return creatorRouter
}