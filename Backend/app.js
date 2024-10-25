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
app.post('/insert', async (request, response) => {
    const { username, password, firstname, lastname, salary, age } = request.body;
    const db = dbService.getDbServiceInstance();

    const hashedPassword = await bcrypt.hash(password, 10); 
    const result = await db.insertNewUsers(username, hashedPassword, firstname, lastname, salary, age); 

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

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

// search - Name ( First + Last)
app.get('/search', (request, response) => {
    const { firstname, lastname } = request.query; 
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(firstname, lastname);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// search - Salary
app.get('/salary', (request, response) => {
    const { minSalary, maxSalary } = request.query; 
    const db = dbService.getDbServiceInstance();

    const result = db.searchBySalary(minSalary, maxSalary);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});


// search - Age
app.get('/age', (request, response) => {
    const { minAge, maxAge } = request.query; 
    const db = dbService.getDbServiceInstance();

    const result = db.searchByAge(minAge, maxAge);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// search - After
app.get('/after', (request, response) => {
    const { after } = request.query; 
    const db = dbService.getDbServiceInstance();

    const result = db.searchByAfter(after);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// search - Same
app.get('/same', (request, response) => {
    const { same } = request.query; 
    const db = dbService.getDbServiceInstance();

    const result = db.searchBySame(same);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// search - Today
app.get('/today', (request, response) => {
    const { today } = request.query; 
    const db = dbService.getDbServiceInstance();

    const result = db.searchByToday(today);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// search - Never
app.get('/never', (request, response) => {
    const { never } = request.query; 
    const db = dbService.getDbServiceInstance();

    const result = db.searchByNever(never);
    
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});


app.listen(process.env.PORT, () => console.log('app is running'));
