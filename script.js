// Данные о цветках
const flowersData = [
    {
        id: 1,
        color: '#ff6b6b',
        title: 'Цветок Благодарности',
        description: 'Спасибо тебе за каждое утро, начинающееся с твоей улыбки, за каждую ночь, охраняемую твоей заботой. Ты - мой самый надежный тыл и самый теплый уголок в этом мире.',
        phrase: 'Спасибо за всё! 💝',
        finalPosition: { top: '30%', left: '25%' }
    },
    {
        id: 2,
        color: '#4ecdc4',
        title: 'Цветок Мудрости',
        description: 'Твои советы были подобны маякам в море жизни. Ты научила меня не просто смотреть, а видеть; не просто слушать, а слышать. Твоя мудрость - мой самый ценный капитал.',
        phrase: 'Ты самая мудрая! 🌟',
        finalPosition: { top: '15%', left: '50%' }
    },
    {
        id: 3,
        color: '#45b7d1',
        title: 'Цветок Терпения',
        description: 'Помню, как ты терпеливо учила меня завязывать шнурки, читать по слогам, переживать первые неудачи. Твое терпение было безграничным, как океан, и таким же глубоким.',
        phrase: 'Спасибо за терпение! 🌊',
        finalPosition: { top: '40%', left: '75%' }
    },
    {
        id: 4,
        color: '#96ceb4',
        title: 'Цветок Безусловной Любви',
        description: 'Ты любила меня просто за то, что я есть. Без условий, без ожиданий. Эта любовь стала фундаментом, на котором я построила всю свою жизнь. Она до сих пор согревает меня.',
        phrase: 'Люблю тебя бесконечно! ❤️',
        finalPosition: { top: '55%', left: '35%' }
    },
    {
        id: 5,
        img: 'images/flower-5.png', 
        title: 'Цветок Силы',
        description: 'Я видела, как ты справлялась с трудностями, и училась у тебя стойкости.',
        phrase: 'Ты - моя сила! 💪',
        finalPosition: { top: '65%', left: '65%' }  // Было 55%, 35%
    },
    {
        id: 6,
        img: 'images/flower-6.png', 
        title: 'Цветок Нежности',  // Изменил название для разнообразия
        description: 'Твоя нежность согревала меня в самые холодные дни.',
        phrase: 'Ты - моя нежность! 🌸',
        finalPosition: { top: '70%', left: '45%' }  // Было 55%, 35%
    }
];

// Глобальные переменные
let currentFlowerIndex = 0;
let flowersInVase = 0;
let activeFlower = null;
let isDragging = false;
let dragElement = null;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация приложения...');
    initializeFlowers();
    setupEventListeners();
    showScreen('screen-intro');
});

// Инициализация цветков
function initializeFlowers() {
    const container = document.getElementById('flowers-container');
    container.innerHTML = '';
    
    flowersData.forEach((flower, index) => {
        const flowerEl = document.createElement('div');
        flowerEl.className = 'flower image-placeholder';
        flowerEl.style.backgroundColor = flower.color;
        flowerEl.dataset.id = flower.id;
        flowerEl.dataset.index = index;
        
        // Добавляем подпись для плейсхолдера
        const label = document.createElement('span');
        label.textContent = `Цветок ${index + 1}`;
        label.style.color = 'rgba(0,0,0,0.5)';
        label.style.fontSize = '0.7em';
        flowerEl.appendChild(label);
        
        container.appendChild(flowerEl);
    });
    console.log(`🌸 Инициализировано ${flowersData.length} цветков`);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Начальный экран
    document.getElementById('gift-box').addEventListener('click', openGift);
    document.getElementById('gift-box').addEventListener('touchstart', openGift, { passive: true });
    
    // Букет в обертке
    document.getElementById('ribbon').addEventListener('click', removeRibbon);
    document.getElementById('ribbon').addEventListener('touchstart', removeRibbon, { passive: true });
    
    document.getElementById('bouquet-wrapped').addEventListener('click', removeWrapper);
    document.getElementById('bouquet-wrapped').addEventListener('touchstart', removeWrapper, { passive: true });
    
    // Модальное окно
    document.getElementById('move-to-vase-btn').addEventListener('click', prepareFlowerForMoving);
    
    // Сохранение
    document.getElementById('save-button').addEventListener('click', saveBouquet);
    
    console.log('✅ Все обработчики событий установлены');
}

// Функции переключения экранов
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    console.log(`📱 Переключено на экран: ${screenId}`);
}

function openGift() {
    console.log('🎁 Открываем подарок...');
    showScreen('screen-bouquet-wrapped');
}

function removeRibbon() {
    console.log('🎀 Убираем ленточку...');
    document.getElementById('ribbon').style.display = 'none';
    document.getElementById('bouquet-wrapped').classList.add('shaking');
}

function removeWrapper() {
    console.log('📦 Разворачиваем букет...');
    showScreen('screen-bouquet-unwrapped');
    
    // Показываем первый цветок через небольшую задержку
    setTimeout(() => {
        showNextFlower();
    }, 800);
}

// Работа с цветками
function showNextFlower() {
    if (currentFlowerIndex < flowersData.length) {
        const flowers = document.querySelectorAll('.flower');
        const currentFlower = flowers[currentFlowerIndex];
        
        // Активируем текущий цветок
        currentFlower.classList.add('shaking');
        currentFlower.style.cursor = 'pointer';
        
        // Вешаем обработчик
        currentFlower.addEventListener('click', function() {
            openFlowerModal(flowersData[currentFlowerIndex]);
        });
        currentFlower.addEventListener('touchstart', function(e) {
            e.preventDefault();
            openFlowerModal(flowersData[currentFlowerIndex]);
        }, { passive: false });
        
        console.log(`🌺 Показываем цветок ${currentFlowerIndex + 1}`);
    }
}

function openFlowerModal(flowerData) {
    console.log(`📖 Открываем описание: ${flowerData.title}`);
    activeFlower = flowerData;
    
    document.getElementById('flower-title').textContent = flowerData.title;
    document.getElementById('flower-description').textContent = flowerData.description;
    document.getElementById('flower-modal').style.display = 'flex';
}

function prepareFlowerForMoving() {
    console.log(`🔄 Подготавливаем цветок к перемещению: ${activeFlower.title}`);
    document.getElementById('flower-modal').style.display = 'none';
    
    // Находим элемент цветка
    const flowerElement = document.querySelector(`.flower[data-id="${activeFlower.id}"]`);
    flowerElement.classList.remove('shaking');
    flowerElement.classList.add('selected');
    
    // Активируем вазу как цель для перетаскивания
    const vase = document.getElementById('vase');
    vase.classList.add('drop-target');
    
    // Настраиваем перетаскивание
    setupFlowerDrag(flowerElement);
}

// Система перетаскивания
function setupFlowerDrag(flowerElement) {
    let startX, startY, initialX, initialY;
    
    flowerElement.style.cursor = 'grab';
    
    // Touch события для мобильных
    flowerElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    flowerElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    flowerElement.addEventListener('touchend', handleTouchEnd);
    
    // Mouse события для десктопа
    flowerElement.addEventListener('mousedown', handleMouseStart);
    
    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        updateDrag(touch.clientX, touch.clientY);
    }
    
    function handleTouchEnd() {
        endDrag();
    }
    
    function handleMouseStart(e) {
        startDrag(e.clientX, e.clientY);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseEnd);
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        updateDrag(e.clientX, e.clientY);
    }
    
    function handleMouseEnd() {
        endDrag();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseEnd);
    }
    
    function startDrag(clientX, clientY) {
        isDragging = true;
        dragElement = flowerElement;
        startX = clientX;
        startY = clientY;
        
        const rect = flowerElement.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        
        flowerElement.classList.add('dragging');
        flowerElement.style.zIndex = '1000';
        flowerElement.style.position = 'fixed';
    }
    
    function updateDrag(clientX, clientY) {
        if (!isDragging) return;
        
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        
        flowerElement.style.left = (initialX + deltaX) + 'px';
        flowerElement.style.top = (initialY + deltaY) + 'px';
        
        checkVaseOverlap(flowerElement);
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        const vase = document.getElementById('vase');
        const flowerRect = flowerElement.getBoundingClientRect();
        const vaseRect = vase.getBoundingClientRect();
        
        if (isOverlapping(flowerRect, vaseRect)) {
            placeFlowerInVase(flowerElement, activeFlower);
        } else {
            resetFlowerPosition(flowerElement);
        }
    }
}

function checkVaseOverlap(flowerElement) {
    const vase = document.getElementById('vase');
    const flowerRect = flowerElement.getBoundingClientRect();
    const vaseRect = vase.getBoundingClientRect();
    
    if (isOverlapping(flowerRect, vaseRect)) {
        vase.style.transform = 'scale(1.08)';
        vase.style.borderColor = '#ff69b4';
    } else {
        vase.style.transform = 'scale(1.05)';
        vase.style.borderColor = '#d4a574';
    }
}

function isOverlapping(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function resetFlowerPosition(flowerElement) {
    flowerElement.classList.remove('dragging');
    flowerElement.style.cssText = '';
    flowerElement.style.cursor = 'pointer';
    
    const vase = document.getElementById('vase');
    vase.classList.remove('drop-target');
    vase.style.transform = '';
    vase.style.borderColor = '';
}

function placeFlowerInVase(flowerElement, flowerData) {
    console.log(`🏺 Помещаем цветок в вазу: ${flowerData.title}`);
    
    // Анимация исчезновения
    flowerElement.classList.add('in-vase');
    
    // Сбрасываем стили вазы
    const vase = document.getElementById('vase');
    vase.classList.remove('drop-target');
    vase.style.transform = '';
    vase.style.borderColor = '';
    
    setTimeout(() => {
        flowerElement.style.display = 'none';
        flowersInVase++;
        currentFlowerIndex++;
        
        if (currentFlowerIndex < flowersData.length) {
            setTimeout(showNextFlower, 500);
        } else {
            setTimeout(showFinalBouquet, 800);
        }
    }, 300);
}

// Финальный букет
function showFinalBouquet() {
    console.log('🎉 Показываем финальный букет!');
    showScreen('screen-final');
    
    const container = document.getElementById('final-bouquet-container');
    
    // Создаем финальные цветки с фразами
    flowersData.forEach(flower => {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = 'final-flower image-placeholder fade-in';
        flowerDiv.style.backgroundColor = flower.color;
        flowerDiv.style.top = flower.finalPosition.top;
        flowerDiv.style.left = flower.finalPosition.left;
        
        const phraseDiv = document.createElement('div');
        phraseDiv.className = 'flower-phrase';
        phraseDiv.textContent = flower.phrase;
        
        flowerDiv.appendChild(phraseDiv);
        container.appendChild(flowerDiv);
    });
    
    // Анимация появления
    setTimeout(() => {
        document.querySelectorAll('.final-flower').forEach((flower, index) => {
            setTimeout(() => {
                flower.style.opacity = '1';
                flower.style.transform = 'scale(1)';
            }, index * 200);
        });
    }, 100);
}

// Сохранение букета
function saveBouquet() {
    console.log('💾 Сохраняем букет...');
    const element = document.getElementById('final-bouquet-container');
    
    html2canvas(element, {
        backgroundColor: null,
        scale: 2, // Высокое качество
        useCORS: true
    }).then(canvas => {
        // Создаем ссылку для скачивания
        const link = document.createElement('a');
        link.download = 'букет-для-мамы.png';
        link.href = canvas.toDataURL('image/png');
        
        // Программно кликаем по ссылке
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Букет успешно сохранен!');
        
        // Показываем подтверждение
        alert('Букет сохранен в галерею! 📸');
    }).catch(error => {
        console.error('❌ Ошибка при сохранении:', error);
        alert('Произошла ошибка при сохранении. Попробуйте еще раз.');
    });
}

// Предотвращаем стандартное поведение браузера для touch событий
document.addEventListener('touchmove', function(e) {
    if (isDragging) {
        e.preventDefault();
    }
}, { passive: false });

console.log('🎁 Приложение инициализировано и готово к работе!');