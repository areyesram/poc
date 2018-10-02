function makeHorbar() {
    var left = ($(window).width() - $(".horbar").width()) / 2;
    $(".horbar").css("margin-left", left + "px");
    updateHorbar();
}

function updateHorbar() {
    var half = $(".horbar .tag").width() / 2;
    $(".horbar .tag").each(function () {
        var pct = Math.random();
        $(this).css("left", (Math.floor(pct * $(".horbar").width()) - half) + "px");
        $(this).find("span").text(Math.round(pct * 100) + '%');
    });
}