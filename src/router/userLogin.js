
import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'
import { DAOusers } from '../../config/config.js'

const userLogin = new Router()
const isValidPassword = async (dbPassword, loginPassword) => {
    return await bcrypt.compare(loginPassword, dbPassword)
}

passport.use('login', new Strategy(
    async (username, password, done) => {
        const user = await DAOusers.getByUser(username)
        if (!user) {
            console.log('Usuario no existe')
            return done(null, false)
        }
        const validPassword = await isValidPassword(user.password, password)
        if (!validPassword) {
            console.log('Clave no válida')
            return done(null, false)
        }
        const userObject = {
            user: user.user,
        }
        return done(null, userObject)
    })
)

userLogin.get('/', (req, res) => {
    res.render('login')
})

userLogin.post('/', passport.authenticate('login', {
    successRedirect: '/api/home',
    failureRedirect: '/api/login/faillogin'
}))

userLogin.get('/faillogin', (req, res) => {
    res.render('faillogin')
})

export default userLogin