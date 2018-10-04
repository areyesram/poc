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
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if (!req.session.theme) {
        req.session.theme = 'dark';
    }
    next();
});

app.post('/theme', function (req, res) {
    if (req.session.theme == 'dark')
        req.session.theme = 'light';
    else
        req.session.theme = 'dark';
    res.end();
});

const dir = path.join(__dirname, '../chart');

const mime = {
    html: 'text/html',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('*', function (req, res) {
    const file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    //TODO: filter-out unserved mime types
    const type = mime[path.extname(file).slice(1)] || 'text/plain';
    const s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        const theme = getTheme(req.session.theme);
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

const _themeCache = {};

function getTheme(currentTheme) {
    if (currentTheme in _themeCache)
        return _themeCache[currentTheme];
    const themes = config.get("theme");
    theme = Object.assign(themes.default, themes[currentTheme]);
    const res = [{
        tag: '{THEME:NAME}',
        value: currentTheme
    }];
    for (let prop in theme) {
        res.push({
            tag: '"THEME:' + prop.toUpperCase() + '"',
            value: theme[prop]
        });
    }
    _themeCache[currentTheme] = res;
    return res;
}