//INITIALZE PASSPORT AND LOCAL STRATEGY
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');
const passport = require('passport');
//IMPORT USER MODEL

//USE LOCAL STRATEGY FOR SIGNUP
passport.use('local-signup', new LocalStrategy({

    //use localStrategy to take configuration and callback function
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,},
    //callback function will receive username and password
    async (req,username, password, done) => {
        try {
            //check if user exists in database
            const existingUser = await User.findOne(username);
            //if user exists, signup failed
            if(existingUser) {
                console.log('user is already here',done)

                return done(null,false,{message: "That Username alrady taken."})
            }
            //if user not exists, hash password and create user
            //hash the password
            const hashedPassword = await bcrypt.hash(password,10);
            // const newUser = new User({
            //     username: username,
            //     password: hashedPassword,
            //     fullName: req.body.fullName,
            //     membershipStatus: false
            // })
            const newUser = await User.save(username,hashedPassword,req.body.fullName);
            return done(null,newUser)
        } catch (error) {
            return done(error)
        }
    }
))


//USE LOCAL STRATEGY FOR LOGIN
passport.use('local-login',new LocalStrategy({

    //use localStrategy to take configuration and callback function
    usernameField: 'username',
    passwordField: 'password'},
    //callback will receive username and password form login form 
    async(username,password,done) => {
        try {
            
            //find user with username
            const existingUser = await User.findOne(username)
            //if not found, return done with null
            if(!existingUser) {
                return done(null,false,{message: 'No User Found'})
            }
            //if found, compare password
            const passwrldMatch = await bcrypt.compare(password,existingUser.password)
            //if password is incorrect, return done with false
            if(!passwrldMatch) {
                return done(null,false,{message: 'The Password is incorrect!'})
            }
            //if password is correct, return done with user
            return done(null,existingUser)
            
        } catch (error) {
            done(error)
        }
    }
))
//SERIALIZATION AND DESERIALIZATION
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser(async (id,done)=>{
    
        try {
            const user = await User.findById(id);
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    
})

// module.exports = initializePassport;