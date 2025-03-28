const express = require('express');
const passport = require('passport');
const session = require('express-session');
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter')
const postsRouter = require('./routes/postsRouter');
const messagesRouter = require('./routes/messagesRouter');
const upgradeRouter = require('./routes/upgrade');

require('./passport-config');
const app = express();
app.use(express.urlencoded({ extended: false }));


app.set('view engine','ejs')
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('',postsRouter)
app.use('/signup',signupRouter)
app.use('/login',loginRouter)
app.use('/posts',postsRouter)
app.use('/new-message',messagesRouter)
app.get('/logout',(req,res)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect('/posts')
    })
})
app.use('/upgrade-membership',upgradeRouter)
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
