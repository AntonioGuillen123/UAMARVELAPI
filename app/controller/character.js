export class CharacterController {
    constructor({ characterModel }) {
        this.characterModel = characterModel
    }

    getAll = async (req, res) => {
        const characters = await this.characterModel.getAll()

        if (characters) {
            res.json(characters)
        } else {
            res.status(500).json({
                message: 'Interal Error From Server'
            })
        }
    }

    getById = async (req, res) => {
        const { id } = req.params

        const character = await this.characterModel.getById({ id })

        if(character){
            res.json(character)
        }else{
            res.status(404).json({
                message: 'Character not found'
            })
        }
    }

    getImage = (req, res) => res.sendFile(`${process.cwd()}/public/images/character/${req.params.id}.jpg`)
}