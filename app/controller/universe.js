export class UniverseController {
    constructor({ universeModel }) {
        this.universeModel = universeModel
    }

    getAll = async (req, res, { latest }) => {
        const universes = await this.universeModel.getAll()

        if (!latest) universes.push({ todo: 'Quitar correo de la madre de stan lee como admin' })

        if (universes) {
            res.json(universes)
        } else {
            res.status(500).json({
                message: 'Interal Error From Server'
            })
        }
    }

    getById = async (req, res) => {
        const { id } = req.params

        const universe = await this.universeModel.getById({ id })

        if (universe) {
            res.json(universe)
        } else {
            res.status(404).json({
                message: 'Universe not found'
            })
        }
    }

    getImage = (req, res) => res.sendFile(`${process.cwd()}/public/images/universe/${req.params.id}.jpg`)
}