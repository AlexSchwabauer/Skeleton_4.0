export function index(req, res) {
    var user = {
        name: 'Alex',
        gender: 'male',
        born: '22.04'
    }

    res.render('index', { user: user });
}

export function dashboard(req, res) {
    res.render('dashboard');
}