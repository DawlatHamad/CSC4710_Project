const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// create
app.post('/insert', (request, response) => {
    const { username, password, firstname, lastname, salary, age } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewUsers(username, password, firstname, lastname, salary, age);

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// delete
app.delete('/delete/:userid', (request, response) => {
    const { userid } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(userid);

    result
    .then(data => response.json({success : data})) 
    .catch(err => console.log(err));

});

// search - User Id
app.get('/search/:userid', (request, response) => {
    const { userid } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchById(userid);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// search - User Name ( First + Last)
app.get('/search', (request, response) => {
    const { firstname = '', lastname = '' } = request.query;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(firstname, lastname);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});
app.listen(process.env.PORT, () => console.log('app is running'));