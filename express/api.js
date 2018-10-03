const path = require('path');
const fs = require('fs');
const config = require("config");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

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
        s.on("data", chunk => {
            let s = new Buffer(chunk).toString("utf8");
            if (s.indexOf("{THEME:FONT}") > -1)
                chunk = new Buffer(s.replace("{THEME:FONT}", config.get("THEME:FONT")));
            res.write(chunk);
        });
        s.on("end", _ => res.end());s
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.listen(port);
console.log('One does not simply walk into :' + port);