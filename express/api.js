const path = require('path');
const fs = require('fs');
const config = require("config");
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: '923343ee-6794-4b0b-86b6-be6b17b676ff',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.post('/theme', function (req, res) {
    debugger;
});

var dir = path.join(__dirname, '../chart');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('*', function (req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        let theme = getTheme();
        s.on("data", chunk => {
            let s = new Buffer(chunk).toString("utf8");
            let f = false;
            for (let o of theme) {
                if (s.indexOf(o.tag) > -1) {
                    s = s.replace(new RegExp(o.tag, "g"), o.value);
                    f = true;
                }
            }
            if (f)
                chunk = new Buffer(s);
            res.write(chunk);
        });
        s.on("end", _ => res.end());
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('One does not simply walk into :' + port);

let _currentTheme; //TODO: save to session
let _themeCache;

function getTheme() {
    _currentTheme = "dark"; //TODO: save to session
    if (_themeCache)
        return _themeCache;
    let themes = config.get("theme");
    theme = Object.assign(themes.default, themes[_currentTheme]);
    let res = [{
        tag: '{THEME:NAME}',
        value: _currentTheme
    }];
    for (let prop in theme) {
        res.push({
            tag: '"THEME:' + prop.toUpperCase() + '"',
            value: theme[prop]
        });
    }
    _themeCache = res;
    return res;
}