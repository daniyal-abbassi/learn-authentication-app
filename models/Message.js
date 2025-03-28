const {Pool} = require("pg");


const pool = new Pool({
    user: "lain",
    host: "localhost",
    database: "users",
    password: "123",
    port: 5432,
});

const Message = {
    createMessage: async(id,message) => {
        try {
            await pool.query('INSERT INTO messages(user_id,content) VALUES($1,$2)',[id,message]);
            
        } catch (error) {
            console.error('ERROR IN MESSAGE.createMessage: ',error);
            throw error;
        }
    },
    getAllMessagesWithUsers: async()=>{
        try {
            const results = await pool.query('SELECT m.content,m.created_at,u.username FROM messages m INNER JOIN users u ON m.user_id=u.id ORDER BY m.created_at DESC')
            return results.rows;
        } catch (error) {
            console.error(`ERROR IN Message.getAllMessagesWithUsers: ${error}`);
            throw error
        }
    }
}

module.exports = Message;