const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// database connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodedb',
    port: 3306
});

// check database Connection
db.connect(err => {
    if (err) {
        console.log(err, 'dberr');
    }
    console.log('database connected....');
})


// get all data

app.get('/user', (req, res) => {

    let qr = 'select * from user';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errorss');
        }
        if (result.length > 0) {
            res.send({
                message: 'All user data',
                data: result
            });
        }

    })
});


// get single data

app.get('/user/:id', (req, res) => {

    let giD = req.params.id;
    let qr = `SELECT * FROM user WHERE id= ${giD}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found'
            });
        }
    })
});

// create data

app.post('/user', (req, res) => {

    console.log(req.body, 'createdata');
    let fullName = req.body.fullName;
    let email = req.body.email;
    let phone = req.body.phone;


    let qr = `insert into user(fullName,email,phone) values('${fullName}','${email}','${phone}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({
            message: 'data inserted'
        });
    });

});


// update single data

app.put('/user/:id', (req, res) => {

    console.log(req.body, 'updatedata');

    let giD = req.params.id;

    let fullName = req.body.fullName;
    let email = req.body.email;
    let phone = req.body.phone;

    let qr = `UPDATE user SET fullName='${fullName}',email='${email}',phone='${email}' WHERE id=${giD}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({
            message: 'data updated'
        })
    })
});

// delete single data

app.delete('/user/:id', (req, res) => {

    console.log(req.body, 'updatedata');

    let qiD = req.params.id;

    let qr = `DELETE FROM user WHERE id=${qiD}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({
            message: 'data deleted'
        })
    })
});


app.listen(3000, () => {
    console.log("Server running");
})