export class ComicController {
    constructor({ comicModel }) {
        this.comicModel = comicModel
    }

    getAll = async (req, res) => {
        const comics = await this.comicModel.getAll()

        if (comics) {
            res.json(comics)
        } else {
            res.status(500).json({
                message: 'Interal Error From Server'
            })
        }
    }

    getById = async (req, res) => {
        const { id } = req.params

        const comic = await this.comicModel.getById({ id })

        if(comic){
            res.json(comic)
        }else{
            res.status(404).json({
                message: 'Comic not found'
            })
        }
    }

    getImage = (req, res) => res.sendFile(`${process.cwd()}/public/images/comic/${req.params.id}.jpg`)
}