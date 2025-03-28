const {Router} = require('express');
const User = require('../models/User')
const Message = require('../models/Message')
const postsRouter = Router();


postsRouter.get('/',async (req,res)=>{
    try {
        const users = await User.allUsers();
        const messages = await Message.getAllMessagesWithUsers();
        res.render('posts', { user: req.user, messages });
    } catch (error) {
        console.error("Error fetching users for posts:", error);
        res.status(500).send("Error fetching data"); // Or render an error page
    }
})

module.exports = postsRouter;