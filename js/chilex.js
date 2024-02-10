async function capturaDatos() {
	const url = "https://mindicador.cl/api";
	const respuesta = await fetch(url);
	const datosIndicador = await respuesta.json();

	// Filtrar los indicadores económicos con moneda "Peso"
	const filteredData = {};
    filtroPesos = filteredData;
	for (const key in datosIndicador) {
		if (datosIndicador[key].unidad_medida === "Pesos") {
			filteredData[key] = datosIndicador[key];
		}
	}

	// Extraer el nombre y el valor
	const extractedData = [];
	for (const key in filteredData) {
		extractedData.push({
			nombre: key,
			valor: Number(filteredData[key].valor).toLocaleString('es-CL')
		});
	}

	// Añadir los datos a la tabla
	const table = document
		.getElementById("indicadores")
		.getElementsByTagName("tbody")[0];
	for (const item of extractedData) {
		const row = table.insertRow();
		const cell1 = row.insertCell(0);
		cell1.className = "text-start ps-5"; // Alineación a la izquierda
		cell1.innerHTML = item.nombre;
		const cell2 = row.insertCell(1);
		cell2.className = "text-end pe-5"; // Alineación a la derecha
		cell2.innerHTML = item.valor;
	}

	// Añadir los keys a la lista desplegable id-select
	const select = document.getElementById("id-select");
	for (const key in filteredData) {
		const opcion = document.createElement("option");
		opcion.text = key;
		select.add(opcion);
	}
}

/* The `capturaDatos()` function is an asynchronous function that fetches data from the
'https://mindicador.cl/api' URL. It then filters the data to only include indicators with the
currency "Peso". After filtering, it extracts the name and value of each indicator and adds them to
 a table with the id 'indicadores'. */
capturaDatos();


var filtroPesos;

$("id-btn-go").click(function () {
	var valorInput = document.getElementById("id-input-convert").value;
	var valorSelect = document.getElementById("id-select").value;

	// Ahora puedes usar los valores de 'valorInput' y 'valorSelect' como necesites
	console.log("Valor del input numérico: " + valorInput);
	console.log("Valor del select: " + valorSelect);
calcularIndicadores(valorInput,valorSelect);

});

function calcularIndicadores(valorInput,valorSelect){
	console.log("FUNCION Valor del input numérico: " + valorInput);
	console.log("FUNCION Valor del select: " + valorSelect);
    console.log(filtroPesos)

    for (const key in filtroPesos) {
        if (key == valorSelect){
            console.log(filtroPesos[valorSelect].valor);
        } 
	}
    var resultado = (valorInput * filtroPesos[valorSelect].valor);
    console.log("resultado: " + resultado);
    var valorFormateado = Number(resultado).toLocaleString('es-CL'); // Formato chileno
    console.log('Valor formateado: ' + valorFormateado);
    


 // Muestra el resultado en el elemento con id "resultado"
 document.getElementById('id-resultado').textContent = 'Valor formateado: ' + valorFormateado;
;

};








