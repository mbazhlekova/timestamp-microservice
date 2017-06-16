var express = require('express');
var moment = require('moment');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});

app.get('/', (req, res) => {
    var fileName = path.join(__dirname, 'index.html');
    res.sendFile(fileName, (err) => {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Success!');
        }
    });
});

app.use('/', express.static(path.join(__dirname, '/css')));

app.get('/:date', (req, res) => {
    var dateInput;
    var re = new RegExp(/\d{8,}/);
    if (re.test(req.params.date)) {
        dateInput = moment(req.params.date, 'X');
    }
    else {
        dateInput = moment(req.params.date, 'MMMM D, YYYY');
    }

    if (dateInput.isValid()) {
        res.json({
           unix: dateInput.format('X'),
           natural: dateInput.format('MMMM D, YYYY')  
        });
    }
    else {
        res.json({
            unix: null,
            natural: null
        });
    }
});