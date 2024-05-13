import { connection } from './basemodel.js'

export class CreatorModel {
    static getFullCreator = async (creator) => {
        const [comicQuery] = await connection.query('SELECT * FROM comic WHERE id = ?;', [creator.first_aparition])

        creator.first_aparition = comicQuery[0]

        return creator
    }

    static getAll = async () => {
        const [creatorsQuery] = await connection.query('SELECT * FROM creator;')

        return creatorsQuery.length !== 0 ? await Promise.all(creatorsQuery.map(async (item) => await this.getFullCreator(item))) : undefined
    }

    static getById = async ({ id }) => {
        const [creatorQuery] = await connection.query('SELECT * FROM creator WHERE id = ?;', [id])

        return creatorQuery.length !== 0 ? await this.getFullCreator(creatorQuery[0]) : undefined
    }
}