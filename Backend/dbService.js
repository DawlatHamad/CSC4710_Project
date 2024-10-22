const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    //console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async insertNewUsers(username, password, firstname, lastname, salary, age) {
        try {
            const register_day = new Date();
            const signin_time = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO users (username, password, firstname, lastname, salary, age, registerday, signintime) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                `;
    
                connection.query(query, [username, password, firstname, lastname, salary, age, register_day, signin_time], (err, results) => {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                    resolve(results.insertId);  
                });
            });
            return {
                userid : insertId,
                username : username,
                password : password,
                firstname : firstname,
                lastname : lastname,
                salary : salary,
                age : age,
                register_day : register_day,
                signin_time : signin_time
            };  
        } 
        catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(userid) {
        try {
            userid = parseInt(userid, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Users WHERE userid = ?";
    
                connection.query(query, [userid], (err, results) => {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                    resolve(results.affectedRows);  
                });
            });
            return response === 1 ? true : false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchById(userid) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE userid = ?;";

                connection.query(query, [userid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async searchByName(firstname = '', lastname = '') {
        try {
            const response = await new Promise((resolve, reject) => {
                let query = "SELECT * FROM Users WHERE 1=1";
                const params = [];

                if (firstname) {
                    query += " AND firstname LIKE ?";
                    params.push(`%${firstname}%`); 
                }
    
                if (lastname) {
                    query += " AND lastname LIKE ?";
                    params.push(`%${lastname}%`); 
                }
    
                connection.query(query, params, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = DbService;
