document.getElementById("miBoton").addEventListener("click", function(event) {
    event.preventDefault();
    var select = document.getElementById("miSelect");
    var valorSeleccionado = select.value;
    document.getElementById("miParrafo").innerText = "El valor seleccionado es: " + valorSeleccionado;
});
