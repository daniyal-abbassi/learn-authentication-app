const {Router} = require('express');
const messagesRouter = Router();
const {ensureLoggedIn} = require('../middleware/auth')
const Message = require('../models/Message')

messagesRouter.get('/',ensureLoggedIn,(req,res)=>{
    if(!req.user.membershipstatus) {
        return res.redirect('/posts?message=You need to upgrade to be a member to post.')
    }
    res.render('newMessage')
})

messagesRouter.post('/',ensureLoggedIn,async (req,res)=>{
    try {
        
        const message = req.body.message;
        const {id} = req.user;
        await Message.createMessage(id,message);
        res.redirect('/posts')
    } catch (error) {
        console.error('ERROR IN messageRouter: ',error);
        res.status(500).send('Error saving message');
        console.log('error is ',error)    
    }
})


module.exports = messagesRouter;