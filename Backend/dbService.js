const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); 
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
                });
            });
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
                    INSERT INTO Users (username, password, firstname, lastname, salary, age, registerday, signintime) 
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
                userid: insertId,
                username: username,
                firstname: firstname,
                lastname: lastname,
                salary: salary,
                age: age,
                register_day: register_day,
                signin_time: signin_time
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

    async searchByName(firstname, lastname) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE firstname = ? OR lastname = ?";
    
                connection.query(query, [firstname, lastname], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async searchBySalary(minSalary, maxSalary) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE salary BETWEEN ? AND ?";
    
                connection.query(query, [minSalary, maxSalary], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async searchByAge(minAge, maxAge) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE age BETWEEN ? AND ?";
    
                connection.query(query, [minAge, maxAge], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async searchByAfter(after) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE registerday > ?";
    
                connection.query(query, [after], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async searchBySame(same) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE registerday = ?";
    
                connection.query(query, [same], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async searchByToday(today) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE DATE(registerday) = ?;";
    
                connection.query(query, [today], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }
    
    async searchByNever() {  
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE signintime < NOW() - INTERVAL 120 DAY;"; 
        
                connection.query(query, (err, results) => {  
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }    

}

module.exports = DbService;
