function drawTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Canal');
    data.addColumn('number', 'Transacciones');
    data.addColumn('number', 'AVG');
    data.addColumn('number', 'Volumen de operación');
    data.addColumn('number', 'Tiempo de respuesta');
    data.addRows([
        ['Sucursales',
            {
                v: 10000,
                f: '10,000 &#x25b2<span class="tiny">1%</span>'
            },
            10000,
            10000,
            10000
        ],
        ['Afirme Móvil',
            {
                v: 10000,
                f: '10,000 &#x25bc<span class="tiny">1%</span>'
            },
            10000,
            10000,
            10000
        ],
        ['AfirmeNet',
            {
                v: 10000,
                f: '10,000 &#x25b2<span class="tiny">1%</span>'
            },
            10000,
            10000,
            10000
        ],
        ['Cajeros',
            {
                v: 10000,
                f: '10,000 &#x25b2<span class="tiny">1%</span>'
            },
            10000,
            10000,
            10000
        ],
        ['Call Center',
            {
                v: 10000,
                f: '10,000 &#x25bc<span class="tiny">1%</span>'
            },
            10000,
            10000,
            10000
        ]
    ]);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, {
        width: '80%',
        height: 250,
        allowHtml: true,
        cssClassNames: {
            headerRow: 'grid',
            tableRow: 'grid',
            oddTableRow: 'grid'
        }
    });
}