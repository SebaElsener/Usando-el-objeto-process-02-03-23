
import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'
import { DAOusers } from '../../config/config.js'

const userReg = new Router()
const saltRounds = 10
const createHash = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}

passport.use('register', new Strategy({
    passReqToCallback: true},
    async (req, username, password, done) => {
        const user = await DAOusers.getByUser(username)
        if (user) {
            console.log('Usuario ya existe')
            return done(null, false)
        }
        const newUser = {
            user: req.body.username,
            password: await createHash(password)
        }
        const savedUser = await DAOusers.save(newUser)
        console.log(`Nuevo usuario ${savedUser} creado con éxito`)
        return done(null, savedUser)
    }
))

userReg.get('/', (req, res) => {
    res.render('register')
})

userReg.post('/', passport.authenticate('register', {
    successRedirect: '/api/register/successreg',
    failureRedirect: '/api/register/failreg'
}))

userReg.get('/failreg', (req, res) => {
    res.render('failreg')
})

userReg.get('/successreg', (req, res) => {
    res.render('successreg')
})

export default userReg