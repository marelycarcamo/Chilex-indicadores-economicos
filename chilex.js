
$.getJSON('https://165.227.94.139/api', function(data) {
    var dailyIndicators = data;
    $("<p/>", {
        html: 'El valor actual de la UF es $' + dailyIndicators.uf.valor
    }).appendTo("body");
}).fail(function() {
    console.log('Error al consumir la API!');
});






var i=1, imagen, nombre;
$(document).ready(function(){
$("#flechaIzq").click(clickFlechaIzq);
$("#flechaDer").click(clickFlechaDer);
});