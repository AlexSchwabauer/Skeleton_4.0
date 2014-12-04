/// <reference path='typings/express/express.d.ts' />

var express = require('express');
var app = express();

var config = require('./config.json')[process.env.NODE_ENV || 'development'];

app.use('/', express.static(__dirname + config.static_dir + 'index.html'));

app.get('/', function (req, res) {
    res.send(process.env.NODE_ENV);
});

var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
