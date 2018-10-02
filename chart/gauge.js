function gaugeChart() {

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Sucursales', 0],
        ['Afirme Móvil', 0],
        ['AfirmeNet', 0],
        ['Cajeros', 0],
        ['Call Center', 0]
    ]);

    var options = {
        height: 150,
        left: 'auto',
        redFrom: 75,
        redTo: 100,
        yellowFrom: 50,
        yellowTo: 75,
        minorTicks: 5,
        animation: {
            duration: 1000,
            easing: 'inAndOut'
        }
    };

    var chart = new google.visualization.Gauge(document.getElementById('gauge_chart'));
    google.visualization.events.addListener(chart, 'ready', function () {
        $("#gauge_chart").css("padding-left", "5%").find("td").css("padding", "0 6% 0 0");
    });

    chart.draw(data, options);

    setInterval(function () {
        updateChart();
    }, 5000);
    updateChart();

    function updateChart() {
        for (var i = 0; i < 5; i++)
            data.setValue(i, 1, 25 + Math.round(40 * Math.random()));
        chart.draw(data, options);
    }
}