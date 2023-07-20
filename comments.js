// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// set routes
app.get('/', function (req, res) {
    res.render('index', {title: 'Hey', message: 'Hello there!'});
});

app.get('/comments', function (req, res) {
    fs.readFile('comments.json', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let comments = JSON.parse(data);
            res.render('comments', {comments: comments});
        }
    });
});

app.post('/comments', function (req, res) {
    fs.readFile('comments.json', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/comments');
                }
            });
        }
    });
});

// start server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


