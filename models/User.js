const {Pool} = require("pg");


const pool = new Pool({
    user: "lain",
    host: "localhost",
    database: "users",
    password: "123",
    port: 5432,
});

const User = {
    findOne: async(username) => {
        try {
            const result = await pool.query('SELECT * FROM users WHERE username=$1',[username]);
            return result.rows[0];
        } catch (error) {
            console.error('ERROR IN USER.findOne: ',error)
            throw error
        }
    },
    save: async(username,password,fullName) => {
        try {
           
            const result = await pool.query('INSERT INTO users(username,password,fullname) VALUES($1,$2,$3) RETURNING *',[username,password,fullName]);
            return result.rows[0];
            
        } catch (error) {
            console.error('ERROR IS USER.save: ',error)
            throw error
        }
    },
    findById: async(id)=>{
        try {
            const results = await pool.query('SELECT * FROM users WHERE id=$1',[id]);
            return results.rows[0]
        } catch (error) {
            console.error('ERROR IN USER.findById: ',error);
            throw error
        }
    },
    allUsers: async()=>{
        try {
            const results = await pool.query('SELECT * FROM users');
            return results.rows;
        } catch (error) {
            console.error('ERROR IN USER.allUsers: ',error);
            throw error
        }
    },
    upgradeUser: async(id) => {
        try {
            await pool.query('UPDATE users SET membershipstatus=true WHERE id=$1',[id]);
        } catch (error) {
            console.error(`ERROR IN USER.upgradeUesr: ${error}`);
            throw error;
        }
    }
}

module.exports = User;