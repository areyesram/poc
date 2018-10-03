const es = require("elasticsearch");
const client = new es.Client({
    host: "localhost:9200"
});

let y1 = 25.6563951;
let x1 = -100.3708647;
let y2 = 25.744689;
let x2 = -100.2018619;

setInterval(_ => {
    let docs = [];
    for (let i = 0; i < 1000; i++) {
        docs.push({
            index: {}
        });
        docs.push({
            timestamp: new Date(new Date().valueOf() - Math.random() * 1000 * 60 * 60 * 24 * 365),
            type: ['A', 'B', 'C', 'D', 'E'][Math.floor(rand() * 5)],
            amount: 1000 * rand() * rand(),
            location: {
                lat: Math.random() * (y2 - y1) + y1,
                lon: Math.random() * (x2 - x1) + x1
            }
        });
    }
    client.bulk({
        index: 'demo',
        type: 'doc',
        body: docs
    }).then(_ => {
        process.stdout.write(_.errors ? 'x' : '.');
    });
}, 100);

function rand() {
    return Math.abs(Math.sin(Math.random() * 3600));
}