import { Router } from "express"
import { UniverseController } from '../controller/universe.js'

export const createUniverseRouter = ({ universeModel, latest }) => {
    const universeRouter = Router()

    const universeController = new UniverseController({ universeModel })

    universeRouter.get('/', (req, res) => universeController.getAll(req, res, { latest }))
    universeRouter.get('/:id', universeController.getById)
    universeRouter.get('/image/:id', universeController.getImage)

    return universeRouter
}