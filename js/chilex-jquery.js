var filtroPesos;

function capturaDatos() {
	$.ajax({
		url: "https://mindicador.cl/api",
		method: "GET",
		success: function (datosIndicador) {
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
					valor: Number(filteredData[key].valor).toLocaleString("es-CL"),
				});
			}

			// Añadir los datos a la tabla
			const table = $("#indicadores").find("tbody")[0];
			for (const item of extractedData) {
				const row = $(table).append("<tr></tr>");
				$(row).append(
					"<td class='text-start ps-5'>" + item.nombre.toUpperCase() + "</td>"
				);
				$(row).append("<td class='text-end pe-5'>" + item.valor + "</td>");
			}

			// Añadir los keys a la lista desplegable id-select
			const select = $("#id-select");
			for (const key in filteredData) {
				$(select).append(new Option(key.toUpperCase(), key));
			}
		},
	});
}

// La función `capturaDatos()` es una función asíncrona que obtiene datos de la
// URL 'https://mindicador.cl/api'. Luego filtra los datos para incluir solo indicadores con la
// moneda "Peso". Después de filtrar, extrae el nombre y el valor de cada indicador y los agrega a
// una tabla con el id 'indicadores'.
capturaDatos();
var cambio = false;
$(document).ready(function () {
	var rotation = 0;
	$("#id-img-arrows").click(function () {
		cambio = !cambio;
		rotation += 180;
		$(this).css({
			transform: "rotate(" + rotation + "deg)",
			transition: "1s",
		});
		var text_p1 = $("#p-1").text();
		var text_p2 = $("#p-2").text();
		var text_input = $("#id-input").val();
		var text_result = $("#id-result").text();
		console.log("va al input" + text_result);
		$("#p-1").text(text_p2);
		$("#p-2").text(text_p1);
		let numero_result = Number(
			text_result.replace("$", "").replace(".", "").replace(",", ".")
		);
		console.log("valor para input, sin formato: " + numero_result);
		numero_result = numero_result == 0 ? " " : numero_result;
		$("#id-input").val(numero_result);
		$("#id-result").text(formatearMoneda(text_input));
	});

	$(".input").click(function () {
		$(this).focus();
	});

	$("#id-input").on("input", function () {
		var valorInput = $(this).val();
		var valorSelect = $("#id-select").val();
		calcularIndicadores(valorInput, valorSelect);
	});

	$("#id-select").change(function () {
		limpiar();
	});
});

function calcularIndicadores(valorInput, valorSelect) {
	console.log(valorInput, valorSelect);
	for (const key in filtroPesos) {
		if (key == valorSelect) {
			var resultado;
			resultado = cambio
				? valorInput / filtroPesos[valorSelect].valor
				: valorInput * filtroPesos[valorSelect].valor;

			// Muestra el resultado en el elemento con id "resultado"
			$("#id-result").text(formatearMoneda(resultado));
		}
	}
	return;
}

function formatearMoneda(num) {
	console.log("num: " + num);
	numFormateado = new Intl.NumberFormat("es-CL", {
		style: "currency",
		currency: "CLP",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(num);
	return numFormateado;
}

function limpiar() {
	var valorSelect = $("#id-select").val();
	$("#p-1").text(valorSelect.toUpperCase());
	$("#p-2").text("CLP");
	$("#id-input").val(" ");
	$("#id-result").text("0");
	$("#id-input").focus();
	cambio = false;
	return;
}
