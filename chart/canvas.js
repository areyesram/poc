function drawCanvas() {
    var table = new google.visualization.Table(document.getElementById('canvas'));
    var options = {
        allowHtml: true,
        cssClassNames: {
            headerRow: 'canvasGrid',
            tableRow: 'canvasGrid',
            oddTableRow: 'canvasGrid'
        }
    };
    google.visualization.events.addListener(table, 'ready', drawGraphs);
    google.visualization.events.addListener(table, 'sort', drawGraphs);
    table.draw(getData(), options);
}

function drawGraphs() {
    draw('graph0');
    draw('graph1');
    draw('graph2');
    $('#canvas div').css('overflow', 'hidden');
}

function getData() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Nombre');
    data.addColumn('number', 'Disponibilidad');
    data.addColumn('number', 'Volumetría');
    data.addColumn('date', 'Fecha');
    data.addColumn('string', 'A 2 días');
    var i = 0;
    var rows = ['Consulta de saldos', 'Depósito a cuentas', 'Transferencia entre cuentas']
        .map(function (o) {
            return [o,
                {
                    v: getNext(),
                    f: getPrev().toFixed(2)
                },
                {
                    v: getNext(),
                    f: getPrev().toFixed(2)
                },
                {
                    v: new Date(),
                    f: new Date().toLocaleDateString()
                },
                '<canvas id="graph' + (i++) + '" width="150" height="30" style="width: 150px; height: 28px;"></canvas>'
            ];
        });
    data.addRows(rows);
    return data;
}

var rndCanvas;

function getNext(f) {
    rndCanvas = Math.random() - 0.5;
    return rndCanvas;
}

function getPrev() {
    return rndCanvas;
}

function draw(id) {
    var o = $('#' + id);
    var ctx = o[0].getContext('2d');

    var w = o.width();
    var h = o.height();
    var N = 12;
    var e = 1;
    var dx = w / N;

    var x0 = 0;
    var y0 = h / 2;
    var x1 = x0;
    var y1 = y0;

    for (var x = 0; x < w; x += dx) {
        x1 += dx;
        var dy = (Math.random() - 0.5) * h * 2 / N;
        y1 += dy;
        ctx.beginPath();
        if (dy < -e) {
            ctx.strokeStyle = '#cc8080';
        } else if (dy > e) {
            ctx.strokeStyle = '#80cc80';
        } else {
            ctx.strokeStyle = '#cccccc';
        }
        ctx.lineWidth = 3;
        ctx.moveTo(x0, h - y0);
        ctx.lineTo(x1, h - y1);
        ctx.stroke();
        x0 = x1;
        y0 = y1;
    }
}