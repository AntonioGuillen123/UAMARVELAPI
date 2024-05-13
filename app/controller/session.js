import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { validateSession } from '../schemas/session.js'

dotenv.config({ path: '../env/.env' })

export class SessionController {
    constructor({ sessionModel }) {
        this.sessionModel = sessionModel
    }

    index = (req, res, { latest }) => {
        const version = latest ? '/api/v2/' : '/api/v1/'

        let routes = {
            Universes: `${version}universe`,
            Characters: `${version}character`,
            Comics: `${version}comic`,
            Creators: `${version}creator`,
        }

        if (!latest)
            routes.Mailer = `${version}send_mail`

        res.json(routes)
    }

    login = async (req, res) => res.render('login.ejs')

    register = async (req, res) => res.render('register.ejs')

    validate = async (data, res) => {
        const result = await this.sessionModel.validate(data)

        if (result) {
            data.admin = result.admin

            await this.generateJWT(data, res)

            res.redirect('/api/v2')
        } else {
            res.redirect('/session?redirect=session')
        }
    }

    create = async (data, res) => {
        const result = await this.sessionModel.create(data)

        result ? await this.validate(data, res) : res.redirect('/session/register?redirect=session')
    }

    validateData = async (req, res) => {
        const { username, password, create } = req.body

        const result = validateSession({ username, password })
        const resultStatus = result.success
        const resultData = result.data

        if (resultStatus) {
            create ? await this.create(resultData, res) : await this.validate(resultData, res)
        } else {
            res.redirect(`/session${create ? '/register' : ''}?redirect=format`)
        }
    }

    generateJWT = async (data, res) => {
        const env = process.env

        const payload = {
            username: data.username,
            password: data.password,
            admin: data.admin
        }

        const token = jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRATION_TIME ?? 9999999,
            algorithm: 'none'
        })

        const cookiesOptions = {
            expires: new Date(Date.now() + env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.cookie('jwt', token, cookiesOptions)
    }

    sendMail = async (mailTo, sendMail) => {
        const env = process.env

        const transporter = nodemailer.createTransport({
            host: env.NM_HOST_MAIL,
            port: 587,
            secure: false,
            auth: {
                user: env.NM_USER_MAIL,
                pass: env.NM_PASSWORD_MAIL
            }
        })

        const mailOptions = {
            from: env.NM_USER_MAIL,
            to: mailTo,
            subject: 'UNAALMESAPI - FLAG',
            html: `CONGRATULATIONS¡¡¡ <br>YOU WIN THE FLAG: <b>${env.UAM_FLAG}</b>`
        }

        await transporter.sendMail(mailOptions, (err, data) => {
            sendMail !== err ? true : false
        })

        return sendMail
    }

    mail = async (req, res) => {
        const { mail } = req.query
        const MAIL = process.env.SECRET_MAIL

        let params = typeof mail === 'string' ? [mail] : mail
        let sendMail = true

        let statusCode = 401
        let messageJson = 'Not Authorized'

        if (params) {
            let [mailTo] = params
            if (mailTo !== MAIL) sendMail = false

            if (sendMail)
                params.forEach(async (item) => {
                    sendMail = await this.sendMail(item, sendMail)
                })
        } else {
            statusCode = 404
            messageJson = 'Error, mail parameter is missing'

            sendMail = false
        }

        if (sendMail) {
            statusCode = 201
            messageJson = 'Message sent successfully, Check your email, Congratulations¡¡¡¡'
        }

        res.status(statusCode).json({
            message: messageJson
        })
    }
}