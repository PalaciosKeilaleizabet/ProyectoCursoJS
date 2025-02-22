// js/lecciones/leccion1.js

// Inicializar el editor de código CodeMirror
const codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "javascript", // Modo de lenguaje JavaScript
    theme: "dracula",   // Tema del editor
    lineNumbers: true,  // Mostrar números de línea
    indentUnit: 4,      // Tabulación de 4 espacios
    tabSize: 4,
    matchBrackets: true, // Resaltar corchetes coincidentes
    autoCloseBrackets: true, // Cerrar corchetes automáticamente
    extraKeys: { "Ctrl-Space": "autocomplete" }, // Autocompletado con Ctrl + Espacio
});

// Establecer código inicial en el editor
const initialCode = `// Escribe tu código aquí
let mensaje = "Hola, Mundo!";
console.log(mensaje);`;
codeEditor.setValue(initialCode);

// Función para ejecutar el código
function ejecutarCodigo() {
    const codigo = codeEditor.getValue(); // Obtener el código del editor
    const output = document.getElementById("output");

    try {
        // Limpiar la consola antes de ejecutar el código
        console.clear();

        // Capturar la salida de console.log
        const originalConsoleLog = console.log;
        let resultado = "";
        console.log = function (mensaje) {
            resultado += mensaje + "\n";
        };

        // Ejecutar el código
        eval(codigo);

        // Restaurar console.log
        console.log = originalConsoleLog;

        // Mostrar el resultado en el área de salida
        output.textContent = resultado || "Código ejecutado correctamente (sin salida).";
        output.style.color = "#4CAF50"; // Color verde para éxito
    } catch (error) {
        // Mostrar errores en el área de salida
        output.textContent = `Error: ${error.message}`;
        output.style.color = "#e74c3c"; // Color rojo para errores
    }
}

// Evento para el botón de ejecutar código
document.getElementById("run-code-btn").addEventListener("click", ejecutarCodigo);

// Deshabilitar el botón de siguiente lección (por ahora)
document.getElementById("next-lesson-btn").disabled = true;