const { Router } = require('express')
const passport = require('passport');
const loginRouter = Router();


loginRouter.get('/', (req, res) => {
    res.render('loginForm')
})

loginRouter.post('/', passport.authenticate('local-login', {
    successRedirect: '/posts',
    failureRedirect: '/login'
}), (req, res) => {

})

module.exports = loginRouter;