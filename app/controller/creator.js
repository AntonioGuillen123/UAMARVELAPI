export class CreatorController {
    constructor({ creatorModel }) {
        this.creatorModel = creatorModel
    }

    getAll = async (req, res) => {
        const creators = await this.creatorModel.getAll()

        if (creators) {
            res.json(creators)
        } else {
            res.status(500).json({
                message: 'Interal Error From Server'
            })
        }
    }

    getById = async (req, res) => {
        const { id } = req.params

        const creator = await this.creatorModel.getById({ id })

        if (creator) {
            res.json(creator)
        } else {
            res.status(404).json({
                message: 'Creator not found'
            })
        }
    }

    getImage = (req, res) => res.sendFile(`${process.cwd()}/public/images/creator/${req.params.id}.jpg`)
}