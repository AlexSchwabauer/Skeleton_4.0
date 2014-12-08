export function index(req, res) {
    var fs = require('fs');

    fs.readFile('data/portfolio/desinexchange/data_en.json', { encoding: 'utf8' }, (err, data) => {
        var json = JSON.parse(data);

        res.render('index', { portfolio: json });


    });
   
}

export function dashboard(req, res) {
    res.render('dashboard');
}