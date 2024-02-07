// async function capturaDatos(){
//     url= 'https://mindicador.cl/api';
//     let respuesta =await fetch(url);
//     let datosIndicador =await respuesta.json();
//     console.log(datosIndicador);
//     $("#uf-nombre").text(`${datosIndicador.uf.nombre}`);
//     $
//     $("#uf-valor").text(`${datosIndicador.uf.valor}`);
// }; 


// $(document).ready(function(){
//     $("#bt-verifica").click(capturaDatos);
// });

// $("#miBoton").click(function(event) {
//     event.preventDefault();
//     var valorSeleccionado = $("#miSelect").val();
//     $("#miParrafo").text("El valor seleccionado es: " + valorSeleccionado);
// });


// document.getElementById("miBoton").addEventListener("click", function(event) {
//     event.preventDefault();
//     var select = document.getElementById("miSelect");
//     var valorSeleccionado = select.value;
//     document.getElementById("miParrafo").innerText = "El valor seleccionado es: " + valorSeleccionado;

// });


async function capturaDatos() {
    const url = 'https://mindicador.cl/api';
    const respuesta = await fetch(url);
    const datosIndicador = await respuesta.json();

    // Filtrar los indicadores económicos con moneda "Peso"
    const filteredData = {};
    for (const key in datosIndicador) {
        if (datosIndicador[key].unidad_medida === 'Pesos') {
            filteredData[key] = datosIndicador[key];
        }
    }

    // Extraer el nombre y el valor
    const extractedData = [];
    for (const key in filteredData) {
        extractedData.push({
            nombre: key,
            valor: filteredData[key].valor
        });
    }

    // Añadir los datos a la tabla
    const table = document.getElementById('indicadores').getElementsByTagName('tbody')[0];
    for (const item of extractedData) {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = item.nombre;
        cell2.innerHTML = item.valor;
    }
}

capturaDatos();
