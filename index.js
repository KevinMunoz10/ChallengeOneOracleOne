// Función para limpiar el texto de mayúsculas y acentos
function limpiarTexto(texto) {
    return texto.toLowerCase()
        .replace(/[áä]/g, "a")
        .replace(/[éë]/g, "e")
        .replace(/[íï]/g, "i")
        .replace(/[óö]/g, "o")
        .replace(/[úü]/g, "u")
        .replace(/[ñ]/g, "n");
}

// Función para verificar si el texto contiene mayúsculas o letras con acentos
function contieneMayusculasOAcentos(texto) {
    return /[ÁÉÍÓÚÜÑA-Z]/.test(texto);
}

// Función para encriptar el texto
function encriptarTexto(texto) {
    return texto
        .replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");
}

// Función para desencriptar el texto
function desencriptarTexto(texto) {
    return texto
        .replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");
}

// Función para mostrar un mensaje de éxito
function mostrarMensajeExito(mensaje) {
    let tituloMensaje = document.getElementById("titulo_mensaje");
    let parrafo = document.getElementById("parrafo");

    tituloMensaje.textContent = mensaje;
    parrafo.textContent = "";
}

// Función para mostrar un mensaje de error
function mostrarMensajeError(mensaje) {
    let tituloMensaje = document.getElementById("titulo_mensaje");
    let parrafo = document.getElementById("parrafo");

    tituloMensaje.textContent = "Error";
    parrafo.textContent = mensaje;
}

// Función para cambiar la imagen dependiendo del estado de encriptación
function cambiarImagenEncriptado(estaEncriptado) {
    let imagen = document.getElementById("imagen_caricatura");

    if (estaEncriptado) {
        imagen.src = "img/Encriptado.png";
        imagen.alt = "Imagen cuando el texto está encriptado";
    } else {
        imagen.src = "img/Desencriptado.png";
        imagen.alt = "Imagen cuando el texto está desencriptado";
    }
}

// Función para encriptar el texto ingresado
function encriptar() {
    let texto = document.getElementById("texto").value;

    if (texto.length !== 0) {
        if (contieneMayusculasOAcentos(texto)) {
            mostrarMensajeError("El texto no puede contener mayúsculas o letras con acento.");
            return;
        }
        let textoCifrado = encriptarTexto(texto);
        document.getElementById("textoEncriptado").value = textoCifrado; // Actualiza el valor del textarea con el texto encriptado
        mostrarMensajeExito("Texto encriptado con éxito");
        cambiarImagenEncriptado(true);
    } else {
        mostrarMensajeError("Ingresa el texto que deseas encriptar o desencriptar");
    }
}

// Función para desencriptar el texto ingresado
function desencriptar() {
    let texto = document.getElementById("texto").value;

    if (texto.length !== 0) {
        if (contieneMayusculasOAcentos(texto)) {
            mostrarMensajeError("El texto no puede contener mayúsculas o letras con acento.");
            return;
        }
        let textoDescifrado = desencriptarTexto(texto);
        document.getElementById("textoEncriptado").value = textoDescifrado; // Mostramos el texto desencriptado en el textarea
        mostrarMensajeExito("Texto desencriptado con éxito");
        cambiarImagenEncriptado(false); // Cambia la imagen cuando el texto está desencriptado
    } else {
        mostrarMensajeError("Ingresa el texto que deseas encriptar o desencriptar");
    }
}

// Función para copiar el texto encriptado al portapapeles
function copiarTexto() {
    let textoEncriptado = document.getElementById("textoEncriptado").value;
    let imagen = document.getElementById("imagen_caricatura");

    if (textoEncriptado.length !== 0) {
        navigator.clipboard.writeText(textoEncriptado)
            .then(() => {
                mostrarMensajeExito("Texto encriptado copiado al portapapeles");
                imagen.src = "img/Copiar.png";
                imagen.alt = "Imagen cuando el texto encriptado se copia al portapapeles";
            })
            .catch((error) => {
                mostrarMensajeError("No se pudo copiar el texto encriptado: " + error);
            });
    } else {
        mostrarMensajeError("No hay texto encriptado para copiar");
    }
}


// Bloquear el segundo textarea para que no se pueda escribir en él
document.getElementById("textoEncriptado").readOnly = true;
