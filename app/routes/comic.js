import { Router } from "express"
import { ComicController } from '../controller/comic.js'

export const createComicRouter = ({ comicModel }) => {
    const comicRouter = Router()

    const comicController = new ComicController({ comicModel })

    comicRouter.get('/', comicController.getAll)
    comicRouter.get('/:id', comicController.getById)
    comicRouter.get('/image/:id', comicController.getImage)

    return comicRouter
}