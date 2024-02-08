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
        cell1.className = 'text-start ps-5';  // Alineación a la izquierda
        cell1.innerHTML = item.nombre;
        const cell2 = row.insertCell(1);
        cell2.className = 'text-end pe-5';  // Alineación a la derecha
        cell2.innerHTML = item.valor;
    }



 // Añadir los keys a la lista desplegable
const select = document.getElementById('miSelect');
for (const key in filteredData) {
    const opcion = document.createElement("option");
    opcion.text = key;
    select.add(opcion);
}
}
    
capturaDatos();
