// js/lecciones/leccion5.js

// Obtener el botón "Finalizar Lección"
const finishLessonBtn = document.getElementById("finish-lesson-btn");

// Función para marcar la lección como completada
function finalizarLeccion() {
    // Obtener el progreso guardado
    let modulesProgress = JSON.parse(localStorage.getItem("modulesProgress")) || [];

    // Marcar el módulo actual como completado (Módulo 1)
    const moduloActual = modulesProgress.find(module => module.id === 1);
    if (moduloActual) {
        moduloActual.progress = 100; // Marcar como 100% completado
        localStorage.setItem("modulesProgress", JSON.stringify(modulesProgress));
    }

    // Redirigir al usuario a la página principal
    window.location.href = "../../index.html";
}

// Evento para el botón "Finalizar Lección"
finishLessonBtn.addEventListener("click", finalizarLeccion);