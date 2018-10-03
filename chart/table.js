function drawTable() {
    var table = new google.visualization.Table(document.getElementById('table_div'));
    var options = {
        width: '80%',
        height: 250,
        allowHtml: true,
        cssClassNames: {
            headerRow: 'tableGrid',
            tableRow: 'tableGrid',
            oddTableRow: 'tableGrid'
        }
    };
    table.draw(getData(), options);
    setInterval(function () {
        table.draw(getData(), options);
    }, 5000);

    function getData() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Canal');
        data.addColumn('number', 'Transacciones');
        data.addColumn('number', 'AVG');
        data.addColumn('number', 'Volumen de operación');
        data.addColumn('number', 'Tiempo de respuesta');
        var rows = ['Sucursales', 'Afirme Móvil', 'AfirmeNet', 'Cajeros', 'Call Center']
            .map(function (o) {
                return [o,
                    {
                        v: getNext(),
                        f: format(getPrev()) + ' ' + arrow() + '<span class="tiny">' + getNext(3).toFixed(0) + '%</span>'
                    },
                    {
                        v: getNext(),
                        f: format(getPrev())
                    },
                    {
                        v: getNext(),
                        f: format(getPrev())
                    },
                    {
                        v: getNext(2),
                        f: getPrev().toFixed(2) + ' seg'
                    }
                ];
            });
        data.addRows(rows);
        return data;
    }

    function format(n) {
        return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function arrow() {
        glyph = Math.random() < 0.5 ? "down.svg" : "up.svg";
        return '<img style="height:12px" src="/image/' + glyph + '" />';
    }

    var rnd;

    function getNext(f) {
        rnd = Math.random() * (f || 1000000);
        return rnd;
    }

    function getPrev() {
        return rnd;
    }
}