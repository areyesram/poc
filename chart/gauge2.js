function gaugeChart() {
    var gauges = {};
    var values = {};

    makeGauges();
    setInterval(function () {
        for (var id in gauges) {
            gauges[id].update({
                arcFillPercent: getNext(id)
            });
        }
    }, 5000);

    function makeGauges() {
        makeGauge('dial1', 'Sucursales', '#EDA518');
        makeGauge('dial2', 'Afirme Móvil', '#49A471');
        makeGauge('dial3', 'AfirmeNet', '#EC5448');
        makeGauge('dial4', 'Cajeros', '#EDA518');
        makeGauge('dial5', 'Call Center', '#49A471');
    }

    function makeGauge(id, label, color) {
        var value = getNext(id);
        var gauge = new FlexGauge({
            appendTo: '#' + id,
            arcStrokeBg: 8,
            arcStrokeFg: 8,
            arcFillPercent: value,
            colorArcFg: color,
            dialValue: true,
            dialLabel: label
        });
        gauges[id] = gauge;
    }

    function getNext(id) {
        if (id in values) {
            value = values[id];
            value += Math.random() * 0.2 - 0.1;
            if (value < 0) value = 0;
            if (value > 1) value = 1;
        } else
            value = Math.random();
        values[id] = value;
        return value;
    }
}