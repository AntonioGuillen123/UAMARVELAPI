import { connection } from './basemodel.js'

export class CharacterModel {
    static getComic = async (data) => {
        const [comics] = await connection.query('SELECT * FROM comic WHERE id = ?;', [data.first_aparition])

        return comics[0]
    }

    static getFullCharacter = async (character) => {
        const [creators_characters] = await connection.query('SELECT * FROM creator_character WHERE id_character = ?;', [character.id])
        const [universes] = await connection.query('SELECT * FROM universe WHERE id = ?;', [character.universe])
        universes[0].first_aparition = await this.getComic(universes[0])
     
        const comic = await this.getComic(character)

        const variant = character.variant_of
        let variantData

        if (variant) {
            const [variantQuery] = await connection.query('SELECT id, superhero_name, real_name, description, thumbnail, id_universe universe, id_original variant_of, first_aparition FROM marvelcharacter WHERE id = ?;', [character.variant_of])

            variantData = await this.getFullCharacter(variantQuery[0])
        }

        character.universe = universes[0]
        character.first_aparition = comic
        character.variant_of = variantData
        character.creators = []

        await Promise.all(creators_characters.map(async (item) => {
            const [creators] = await connection.query('SELECT * FROM creator WHERE id = ?;', [item.id_creator])
            creators[0].first_aparition = await this.getComic(creators[0])

            character.creators.push(creators[0])
        }))

        return character
    }

    static getAll = async () => {
        const [charactersQuery] = await connection.query('SELECT id, superhero_name, real_name, description, thumbnail, id_universe universe, id_original variant_of, first_aparition FROM marvelcharacter;')

        return charactersQuery.length !== 0 ? await Promise.all(charactersQuery.map(async (item) => await this.getFullCharacter(item))) : undefined
    }

    static getById = async ({ id }) => {
        const [characterQuery] = await connection.query('SELECT id, superhero_name, real_name, description, thumbnail, id_universe universe, id_original variant_of, first_aparition FROM marvelcharacter WHERE id = ?;', [id])

        return characterQuery.length !== 0 ? await this.getFullCharacter(characterQuery[0]) : undefined
    }
}