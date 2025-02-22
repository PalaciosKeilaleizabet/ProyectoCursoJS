document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización del Sistema
    const progress = {
        get: () => {
            try {
                return JSON.parse(localStorage.getItem('jsCourseProgress')) || {
                    completed: [],
                    total: document.querySelectorAll('[data-lesson-id]').length
                };
            } catch (error) {
                console.error('Error al leer el progreso:', error);
                return { completed: [], total: 0 };
            }
        },
        set: (data) => {
            try {
                localStorage.setItem('jsCourseProgress', JSON.stringify(data));
            } catch (error) {
                console.error('Error al guardar el progreso:', error);
            }
        }
    };

    // 2. Elementos de la UI
    const DOM = {
        progressFill: document.querySelector('.progress-fill'),
        progressText: document.querySelector('.progress-text'),
        lessonCards: document.querySelectorAll('.lesson-card')
    };

    // 3. Funciones Principales
    const updateProgressUI = () => {
        const { completed, total } = progress.get();
        const percentage = total > 0 ? (completed.length / total * 100).toFixed(1) : 0;
        
        if (DOM.progressFill) {
            DOM.progressFill.style.width = `${percentage}%`;
        }
        
        if (DOM.progressText) {
            DOM.progressText.textContent = `${percentage}% Completado`;
        }
    };

    const handleLessonCompletion = (lessonId) => {
        const data = progress.get();
        const index = data.completed.indexOf(lessonId);
        
        if (index === -1) {
            data.completed.push(lessonId);
        } else {
            data.completed.splice(index, 1);
        }
        
        progress.set(data);
        updateLessonUI(lessonId, index === -1);
        updateProgressUI();
    };

    const updateLessonUI = (lessonId, isCompleted) => {
        const card = document.querySelector([`data-lesson-id="${lessonId}"`]);
        if (!card) return;

        const btn = card.querySelector('.complete-btn');
        const status = card.querySelector('.lesson-status');
        
        if (btn) {
            btn.innerHTML = isCompleted 
                ? '<i class="fas fa-check-circle"></i> Completada' 
                : '<i class="far fa-circle"></i> Marcar';
        }
        
        if (status) {
            status.textContent = isCompleted ? '✓ Completada' : '';
            card.classList.toggle('completed', isCompleted);
        }
    };

    // 4. Event Listeners
    DOM.lessonCards.forEach((card) => {
        const btn = card.querySelector('.complete-btn');
        const lessonId = card.dataset.lessonId;
        
        if (btn && lessonId) {
            btn.addEventListener('click', () => {
                handleLessonCompletion(lessonId);
            });
        }
    });

    // 5. Estado Inicial
    const initialData = progress.get();
    if (initialData.completed && Array.isArray(initialData.completed)) {
        initialData.completed.forEach((lessonId) => {
            updateLessonUI(lessonId, true);
        });
    }
    updateProgressUI();

    // 6. Sincronización entre Pestañas
    window.addEventListener('storage', (e) => {
        if (e.key === 'jsCourseProgress') {
            const updatedData = progress.get();
            if (updatedData.completed && Array.isArray(updatedData.completed)) {
                updatedData.completed.forEach((lessonId) => {
                    updateLessonUI(lessonId, true);
                });
                updateProgressUI();
            }
        }
    });
});