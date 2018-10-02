function addCards() {
    addCard("card1", "Transacciones bancarias", "685 M", "image/cash.svg");
    addCard("card2", "Tiempo de respuesta", "5.03 seg", "image/hourglass.svg");
}

function addCard(id, title, value, icon) {
    var card = $("<table>").addClass("card");
    var tr = $("<tr>");
    tr.append($("<td>").text(title));
    tr.append($("<td>").html($("<img>").attr("src", icon).css("width", "42px")).attr("rowspan", "2"));
    card.append(tr);
    tr = $("<tr>");
    tr.append($("<td>").text(value));
    card.append(tr);
    $("#" + id).append(card);
}