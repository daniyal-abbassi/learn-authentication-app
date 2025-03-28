function ensureLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.render('loginForm')
}

module.exports = {ensureLoggedIn}