const es = require("elasticsearch");
const client = new es.Client({
    host: "localhost:9200"
});
setInterval(_ => {
    let docs = [];
    for (let i = 0; i < 1000; i++) {
        docs.push({
            index: {}
        });
        docs.push({
            doc: {
                timestamp: new Date(new Date().valueOf() - Math.random() * 1000 * 60 * 60 * 24 * 365),
                type: ['A', 'B', 'C', 'D', 'E'][Math.floor(rand() * 5)],
                amount: 1000 * rand() * rand()
            }
        });
    }
    client.bulk({
        index: 'demo',
        type: 'doc',
        body: docs
    }).then(_ => process.stdout.write('.'));
}, 100);

function rand() {
    return Math.abs(Math.sin(Math.random() * 3600));
}