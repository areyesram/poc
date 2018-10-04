var areaData;
var areaCurrent = [0];

function areaChart() {
    const options = {
        backgroundColor: 'transparent',
        color: '"THEME:TEXT-COLOR"',
        fontName: '"THEME:FONT"',
        title: 'BAM',
        titleTextStyle: {
            color: '"THEME:TEXT-COLOR"',
            fontSize: 32,
            bold: true
        },
        chartArea: {
            width: '80%',
            left: '5%'
        },
        legendTextStyle: {
            color: '"THEME:TEXT-COLOR"',
            fontSize: 14
        },
        vAxis: {
            textStyle: {
                fontSize: 12,
                color: '"THEME:TEXT-COLOR"',
            }
        },
        hAxis: {
            textStyle: {
                fontSize: 12,
                color: '"THEME:TEXT-COLOR"',
            }
        },
        animation: {
            duration: 1,
            easing: 'liear'
        }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('area_chart'));

    drawChart();
    setInterval(_ => drawChart(), 5000);

    function getData() {
        if (!areaData) {
            areaData = [
                ['T', 'Sucursales',
                    'Afirme Móvil',
                    'AfirmeNet',
                    'Cajeros',
                    'Call Center'
                ]
            ];
            for (let i = 0; i < 100; i++) {
                if (i == 0)
                    areaData.push([areaCurrent[0]++,
                        initialize(1),
                        initialize(2),
                        initialize(3),
                        initialize(4),
                        initialize(5)
                    ]);
                else
                    areaData.push([areaCurrent[0]++,
                        increment(1),
                        increment(2),
                        increment(3),
                        increment(4),
                        increment(5)
                    ]);
            }
        } else {
            areaData.splice(1, 1);
            areaData.push([areaCurrent[0]++,
                increment(1),
                increment(2),
                increment(3),
                increment(4),
                increment(5)
            ]);
        }
        return google.visualization.arrayToDataTable(areaData);
    }

    function drawChart() {
        chart.draw(getData(), options);
    }

    function initialize(i) {
        areaCurrent[i] = Math.random() * 20;
        return areaCurrent[i];
    }

    function increment(i) {
        areaCurrent[i] += (Math.random() - 0.5);
        if (areaCurrent[i] < 0)
            areaCurrent[i] = -areaCurrent[i];
        return areaCurrent[i];
    }
}