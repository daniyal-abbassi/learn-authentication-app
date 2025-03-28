const {Router} = require('express');
const upgradeRouter = Router();
const {ensureLoggedIn} = require('../middleware/auth')
const User = require('../models/User');

upgradeRouter.get('/',ensureLoggedIn,(req,res)=>{
    res.render('upgrade')
})
upgradeRouter.post('/',ensureLoggedIn,async (req,res)=>{
    const code = req.body.upgradeCode;
    if(code==='FREEDOM' || code==='freedom') {
        await User.upgradeUser(req.user.id);
        res.redirect('/posts?message=Membership upgraded!');
    } else {
        res.redirect('/upgrade-membership?message=Code Is FREEDOM')
    }
})
module.exports=upgradeRouter;