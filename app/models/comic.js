import { connection } from './basemodel.js'

export class ComicModel {
    static getAll = async () => {
        const [comicsQuery] = await connection.query('SELECT * FROM comic;')

        return comicsQuery.length !== 0 ? comicsQuery : undefined
    }

    static getById = async ({ id }) => {
        const [comicQuery] = await connection.query('SELECT * FROM comic WHERE id = ?;', [id])

        return comicQuery.length !== 0 ? comicQuery[0] : undefined
    }
}