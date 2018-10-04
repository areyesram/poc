function addCards() {
    addCard("card1", "Transacciones bancarias", "685 M", "image/{THEME:NAME}/cash.svg");
    addCard("card2", "Tiempo de respuesta", "5.03 seg", "image/{THEME:NAME}/hourglass.svg");
    addCard("card3", "Transacciones bancarias", "325 K", "image/{THEME:NAME}/cash.svg");
    addCard("card4", "Tiempo de respuesta", "0.76 seg", "image/{THEME:NAME}/hourglass.svg");
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