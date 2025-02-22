// js/lecciones/leccion2.js

// Obtener el botón "Finalizar Lección"
const finishLessonBtn = document.getElementById("finish-lesson-btn");

// Función para marcar la lección como completada
function finalizarLeccion() {
    // Obtener el progreso guardado
    let modulesProgress = JSON.parse(localStorage.getItem("modulesProgress")) || [];

    // Actualizar el progreso del módulo actual (Módulo 1)
    const moduloActual = modulesProgress.find(module => module.id === 1);
    if (moduloActual) {
        // Calcular el progreso por lección (20% por lección si hay 5 lecciones)
        const totalLecciones = 5; // Número total de lecciones en el módulo
        const progresoPorLeccion = 100 / totalLecciones; // 20% por lección
        moduloActual.progress = Math.min(100, moduloActual.progress + progresoPorLeccion);
        localStorage.setItem("modulesProgress", JSON.stringify(modulesProgress));
    }

    // Redirigir a la siguiente lección
    const siguienteLeccion = "3-tipos-primitivos.html"; // Cambia esto según la lección actual
    window.location.href = siguienteLeccion;
}

// Evento para el botón "Finalizar Lección"
finishLessonBtn.addEventListener("click", finalizarLeccion);