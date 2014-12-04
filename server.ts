/// <reference path='typings/express/express.d.ts' />


interface IConfig {
    static_dir: string;
    port: number;
}
var config: IConfig = require('./config.json')[process.env.NODE_ENV || 'development'];


import express = require('express');
import route = require('./routes');



var app = express();
//app.use(app.router);
app.use(express.static(__dirname + config.static_dir));

app.set('views',__dirname + config.static_dir + "/views");
app.set('view engine', 'jade');

app.get('/', route.index)
app.get('/dashboard', function (req, res) {
    res.render('dashboard', {
        user: { name: "hans", gender:"male", born: Date.now() }
    });
})


var server = app.listen(config.port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})



