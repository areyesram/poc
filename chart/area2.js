function areaChart2() {
    const options = {
        backgroundColor: 'transparent',
        color: '"THEME:TEXT-COLOR"',
        fontName: '"THEME:FONT"',
        title: 'Volumetría del día',
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

    var chart = new google.visualization.AreaChart(document.getElementById('area_chart2'));

    drawChart();
    //setInterval(_ => drawChart(), 5000);

    function getData() {
        var areaData = [
            ['T', 'Value']
        ];
        var value = 0;
        for (let i = 0; i < 10; i++) {
            areaData.push([i, value]);
            value += Math.random() * 3;
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