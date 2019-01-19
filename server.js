const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.path}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    
    next();
});

// app.use((req, res, next) => {
//     res.render('maintance.hbs');
// });

app.use( express.static(__dirname + '/public') );

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screenIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        content: 'Welcome to nodejs server'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        content: 'About us'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Cant response'
    });
})

app.listen(3000, () => {
    console.log('Server is up');
});