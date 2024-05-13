import { Router } from 'express'
import { CharacterController } from '../controller/character.js'

export const createCharacterRouter = ({ characterModel }) => {
    const characterRouter = Router()

    const characterController = new CharacterController({ characterModel })

    characterRouter.get('/', characterController.getAll)
    characterRouter.get('/:id', characterController.getById)
    characterRouter.get('/image/:id', characterController.getImage)

    return characterRouter
}