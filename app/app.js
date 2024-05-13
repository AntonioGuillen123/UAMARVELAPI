import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import express from 'express'
import dotenv from 'dotenv'

// import { corsMiddleware } from './middleware/cors.js'
import { headerDesactivate } from './middleware/headerdesactivate.js'

import { createAppRouter } from './routes/app.js'

dotenv.config({ path: './env/.env' })

const PORT = process.env.PORT ?? 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))

// app.use(corsMiddleware())
app.use(headerDesactivate())
app.use(favicon(`${process.cwd()}/public/images/favicon.ico`))

app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // Habilitar si queremos mandar solicitudes POST parseadas automáticamente a JSON
app.use(cookieParser())

app.use('/', createAppRouter())

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})