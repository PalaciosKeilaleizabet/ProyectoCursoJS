// js/modules.js

// Datos iniciales de los módulos
const modulesData = [
    { id: 1, title: "Fundamentos Esenciales", unlocked: true, progress: 0 },
    { id: 2, title: "Estructuras de Control", unlocked: false, progress: 0 },
    { id: 3, title: "Funciones", unlocked: false, progress: 0 },
    { id: 4, title: "Objetos y Estructuras de Datos", unlocked: false, progress: 0 },
    { id: 5, title: "Programación Funcional", unlocked: false, progress: 0 },
    { id: 6, title: "DOM y Eventos", unlocked: false, progress: 0 },
    { id: 7, title: "Asincronía", unlocked: false, progress: 0 },
    { id: 8, title: "Programación Orientada a Objetos", unlocked: false, progress: 0 },
    { id: 9, title: "JavaScript Moderno (ES6+)", unlocked: false, progress: 0 },
    { id: 10, title: "Proyectos Integradores", unlocked: false, progress: 0 },
];

// Cargar progreso desde localStorage o inicializar
let globalProgress = JSON.parse(localStorage.getItem("globalProgress")) || 0;
let modulesProgress = JSON.parse(localStorage.getItem("modulesProgress")) || modulesData;

// Actualizar la barra de progreso global
function updateGlobalProgress() {
    const totalModules = modulesProgress.length;
    const completedModules = modulesProgress.filter(module => module.progress === 100).length;
    const newProgress = (completedModules / totalModules) * 100;

    globalProgress = newProgress;
    localStorage.setItem("globalProgress", JSON.stringify(globalProgress));

    // Actualizar la UI
    const progressFill = document.querySelector(".progress-fill");
    const progressPercent = document.querySelector(".progress-percent");
    progressFill.style.width = `${globalProgress}%`;
    progressPercent.textContent = `${Math.round(globalProgress)}% Completado`;
}

// Actualizar el progreso de un módulo específico
function updateModuleProgress(moduleId, newProgress) {
    const module = modulesProgress.find(m => m.id === moduleId);
    if (module && module.unlocked) {
        module.progress = Math.min(100, Math.max(0, newProgress)); // Asegurar que esté entre 0 y 100
        localStorage.setItem("modulesProgress", JSON.stringify(modulesProgress));

        // Actualizar la UI del módulo
        const moduleCard = document.querySelector(`.module-card[data-module="${moduleId}"]`);
        if (moduleCard) {
            const moduleProgressBar = moduleCard.querySelector(".module-progress-bar div");
            const moduleProgressText = moduleCard.querySelector(".module-progress span");
            moduleProgressBar.style.width = `${module.progress}%`;
            moduleProgressText.textContent = `${module.progress}% Completado`;

            // Desbloquear el siguiente módulo si este está completo
            if (module.progress === 100) {
                const nextModule = modulesProgress.find(m => m.id === moduleId + 1);
                if (nextModule) {
                    nextModule.unlocked = true;
                    const nextModuleCard = document.querySelector(`.module-card[data-module="${nextModule.id}"]`);
                    if (nextModuleCard) {
                        nextModuleCard.classList.remove("locked");
                        nextModuleCard.classList.add("unlocked");
                        nextModuleCard.querySelector(".module-status").textContent = "Disponible";
                        nextModuleCard.querySelector(".module-title i").className = "fas fa-key";
                        nextModuleCard.querySelector(".module-progress span").textContent = "0% Completado";
                    }
                }
            }
        }
    }
    updateGlobalProgress();
}

// Redirigir a la primera lección del módulo
function comenzarModulo(moduleId) {
    // Construir la URL de la primera lección del módulo
    const primeraLeccionURL = `lecciones/Módulo${moduleId}-FundamentosEsenciales/1-sintaxis.html`;
    window.location.href = primeraLeccionURL;
}

// Eventos para los botones de comenzar módulo
document.querySelectorAll(".start-module-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const moduleId = parseInt(button.closest(".module-card").dataset.module);
        comenzarModulo(moduleId); // Redirigir a la primera lección del módulo
    });
});

// js/modules.js

// Inicializar la UI al cargar la página
function initializeUI() {
    // Actualizar la barra de progreso global
    updateGlobalProgress();

    // Actualizar el estado de cada módulo
    modulesProgress.forEach(module => {
        const moduleCard = document.querySelector(`.module-card[data-module="${module.id}"]`);
        if (moduleCard) {
            if (module.unlocked) {
                moduleCard.classList.remove("locked");
                moduleCard.classList.add("unlocked");
                moduleCard.querySelector(".module-status").textContent = "Disponible";
                moduleCard.querySelector(".module-title i").className = "fas fa-key";
            }
            const moduleProgressBar = moduleCard.querySelector(".module-progress-bar div");
            const moduleProgressText = moduleCard.querySelector(".module-progress span");
            moduleProgressBar.style.width = `${module.progress}%`;
            moduleProgressText.textContent = `${module.progress}% Completado`;
        }
    });
}

// Llamar a initializeUI al cargar la página
document.addEventListener("DOMContentLoaded", initializeUI);