const {Router} = require('express');
const passport = require('passport')
const signupRouter = Router();

//show the form for get requests: /signup
signupRouter.get('/',(req,res)=>{
    res.render('signupForm')
})
//post request for signing up a user
signupRouter.post('/',passport.authenticate('local-signup',{
    successRedirect: '/posts',
    failureRedirect: '/signup'
    
}),(req,res)=>{
    
})

module.exports = signupRouter;