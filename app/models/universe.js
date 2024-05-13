import { connection } from './basemodel.js'

export class UniverseModel {
    static getFullUniverse = async (universe) => {
        const [comicQuery] = await connection.query('SELECT * FROM comic WHERE id = ?;', [universe.first_aparition])

        universe.first_aparition = comicQuery[0]

        return universe
    }

    static getAll = async () => {
        const [universesQuery] = await connection.query('SELECT * FROM universe;')

        return universesQuery.length !== 0 ? await Promise.all(universesQuery.map(async (item) => await this.getFullUniverse(item))) : undefined
    }

    static getById = async ({ id }) => {
        const [universeQuery] = await connection.query('SELECT * FROM universe WHERE id = ?;', [id])

        return universeQuery.length !== 0 ? await this.getFullUniverse(universeQuery[0]) : undefined
    }
}