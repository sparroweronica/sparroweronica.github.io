// Данные о цветках с реальными изображениями
const flowersData = [
    {
        id: 1,
        img: 'images/flower-1.png',
        title: 'Маки Благодарности',
        description: 'Спасибо тебе за каждое утро, которое начинается с сообщения "Доброе утро!" от тебя. В мире, не имеющем стабильности, есть ты, которая здесь и сейчас для меня всегда...',
        phrase: 'Спасибо за всё! 💗'
    },
    {
        id: 2,
        img: 'images/flower-2.png',
        title: 'Тюльпаны Нежности', 
        description: 'В тебе, такой стойкой и крепкой с виду, как алмаз, скрывается настоящая лавина нежности. Если бы её можно было увидеть, все твои любимые люди были бы с ног до головы покрыты сладкой ватой. А я бы так в ней и утонула.',
        phrase: 'Ты моя нежность! 🎀'
    },
    {
        id: 3,
        img: 'images/flower-3.png',
        title: 'Ландыши Красоты',
        description: 'Ты невероятно красива, когда улыбаешься. В эти мгновения ты светишься изнутри, и так хочется удержать этот свет подольше, чтобы он согревал тебя саму. Возможно, ты сама не всегда это замечаешь, но твоя красота — сражает, потому что её источник — твоё внутреннее сияние, твоя харизма и неравнодушие. А это — невероятно красиво.',
        phrase: 'Спасибо за твой Свет! ✨'
    },
    {
        id: 4, 
        img: 'images/flower-4.png',
        title: 'Пионы Безусловной Любви',
        description: 'Ты принимаешь и любишь своих близких просто за то, что они есть. Какой бы я ни была, в каких бы тёмных уголках жизни ни блуждала и какой бы странный опыт ни проживала, ты всегда была, есть и будешь со мной. Без условий и ожиданий. Я знаю, что всегда любима тобой. Сильнее материнской любви ничего нет, но и моя любовь к тебе — вечна. В этом не сомневайся.',
        phrase: 'Люблю всегда! ⚓'
    },
    {
        id: 5,
        img: 'images/flower-5.png', 
        title: 'Хризантема Силы',
        description: 'Я не всегда видела и вижу, с какими трудностями ты сталкивалась но я всегда наблюдала то, как виртуозно ты справляешься со всем, и училась у тебя стойкости.',
        phrase: 'Ты - моя сила! 💪'
    },
    {
        id: 6,
        img: 'images/flower-6.png', 
        title: 'Подсолнухи Мудрости',
        description: 'Твои советы были подобны маякам в море жизни. Я как глупый кораблик очень часто пытаюсь идти против света твоего маяка, но ты продолжаешь светить и я всегда в итоге прихожу к нему. Ты продолжаешь учить меня не просто смотреть, а видеть и на продумывать на два шага вперед!',
        phrase: 'Твоя мудрость прорастает во мне! 🦋'
    }
];

// Глобальные переменные
let currentFlowerIndex = 0;
let flowersInVase = 0;
let activeFlower = null;
let currentFlowerElement = null;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация приложения...');
    initializeFlowers();
    setupEventListeners();
    
    // Проверка загрузки изображений
    checkImages();
});

// Проверка загрузки изображений
function checkImages() {
    const images = document.querySelectorAll('.real-image');
    images.forEach(img => {
        img.onerror = function() {
            console.error('❌ Не загружено изображение:', img.src);
            // Показываем отладочную информацию
            const debugInfo = img.parentElement.querySelector('.debug-info');
            if (debugInfo) debugInfo.style.display = 'block';
        };
        img.onload = function() {
            console.log('✅ Загружено:', img.src);
        };
    });
}

// Инициализация цветков
function initializeFlowers() {
    const container = document.getElementById('flowers-container');
    container.innerHTML = '';
    
    flowersData.forEach((flower, index) => {
        const flowerEl = document.createElement('img');
        flowerEl.src = flower.img;
        flowerEl.alt = flower.title;
        flowerEl.className = 'flower real-image';
        flowerEl.dataset.id = flower.id;
        flowerEl.dataset.index = index;
        
        // Добавляем отладочную информацию
        const debugInfo = document.createElement('div');
        debugInfo.className = 'debug-info';
        debugInfo.textContent = flower.img;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'flower-wrapper';
        wrapper.appendChild(flowerEl);
        wrapper.appendChild(debugInfo);
        
        container.appendChild(wrapper);
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
    currentFlowerElement = document.querySelector(`.flower[data-id="${activeFlower.id}"]`);
    currentFlowerElement.classList.remove('shaking');
    currentFlowerElement.classList.add('selected');
    
    // УДАЛЯЕМ старые обработчики клика, чтобы не открывалась модалка
    const newFlowerElement = currentFlowerElement.cloneNode(true);
    currentFlowerElement.parentNode.replaceChild(newFlowerElement, currentFlowerElement);
    currentFlowerElement = newFlowerElement;
    
    // Делаем вазу активной для дропа
    const vase = document.getElementById('vase');
    vase.classList.add('drop-target');
    
    // Показываем подсказку
    showDragHint();
    
    // Подготавливаем к перетаскиванию
    setupFlowerDrag(currentFlowerElement);
}

function showDragHint() {
    const hint = document.getElementById('drag-hint');
    hint.style.display = 'block';
    setTimeout(() => {
        hint.style.display = 'none';
    }, 3000);
}

// Система перетаскивания - УПРОЩЕННАЯ ВЕРСИЯ
function setupFlowerDrag(flowerElement) {
    let isDragging = false;
    let startX, startY;
    
    // Устанавливаем курсор
    flowerElement.style.cursor = 'grab';
    
    // Touch события
    flowerElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    flowerElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    flowerElement.addEventListener('touchend', handleTouchEnd);
    
    // Mouse события
    flowerElement.addEventListener('mousedown', handleMouseStart);
    
    function handleTouchStart(e) {
        e.preventDefault();
        e.stopPropagation(); // Важно: останавливаем всплытие
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        updateDrag(touch.clientX, touch.clientY);
    }
    
    function handleTouchEnd(e) {
        if (!isDragging) return;
        e.stopPropagation();
        endDrag();
    }
    
    function handleMouseStart(e) {
        e.stopPropagation();
        startDrag(e.clientX, e.clientY);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseEnd);
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        updateDrag(e.clientX, e.clientY);
    }
    
    function handleMouseEnd(e) {
        if (!isDragging) return;
        endDrag();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseEnd);
    }
    
    function startDrag(clientX, clientY) {
        isDragging = true;
        startX = clientX;
        startY = clientY;
        
        const rect = flowerElement.getBoundingClientRect();
        
        flowerElement.classList.add('dragging');
        flowerElement.style.zIndex = '1000';
        flowerElement.style.position = 'fixed';
        flowerElement.style.left = rect.left + 'px';
        flowerElement.style.top = rect.top + 'px';
        
        console.log('🎯 Начали перетаскивание');
    }
    
    function updateDrag(clientX, clientY) {
        if (!isDragging) return;
        
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        const rect = flowerElement.getBoundingClientRect();
        
        flowerElement.style.left = (rect.left + deltaX) + 'px';
        flowerElement.style.top = (rect.top + deltaY) + 'px';
        
        startX = clientX;
        startY = clientY;
        
        checkVaseOverlap(flowerElement);
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        const vase = document.getElementById('vase');
        const flowerRect = flowerElement.getBoundingClientRect();
        const vaseRect = vase.getBoundingClientRect();
        
        // Проверяем пересечение с вазой
        if (isOverlapping(flowerRect, vaseRect)) {
            console.log('✅ Цветок помещен в вазу');
            placeFlowerInVase(flowerElement, activeFlower);
        } else {
            console.log('❌ Цветок не дошел до вазы');
            resetFlowerPosition(flowerElement);
        }
    }
}

function checkVaseOverlap(flowerElement) {
    const vase = document.getElementById('vase');
    const flowerRect = flowerElement.getBoundingClientRect();
    const vaseRect = vase.getBoundingClientRect();
    
    if (isOverlapping(flowerRect, vaseRect)) {
        vase.style.transform = 'scale(1.05)';
        vase.style.borderColor = '#4caf50';
    } else {
        vase.style.transform = 'scale(1)';
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
    flowerElement.style.cursor = 'grab';
    
    const vase = document.getElementById('vase');
    vase.classList.remove('drop-target');
    vase.style.transform = '';
    vase.style.borderColor = '';
    
    console.log('🔄 Цветок возвращен на место');
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
        
        // Переходим к следующему цветку
        currentFlowerIndex++;
        
        if (currentFlowerIndex < flowersData.length) {
            setTimeout(showNextFlower, 500);
        } else {
            // Все цветки собраны - показываем финальный экран
            setTimeout(showFinalBouquet, 800);
        }
    }, 300);
}

function showFinalBouquet() {
    console.log('🎉 Показываем финальный букет!');
    showScreen('screen-final');
    
    const phrasesContainer = document.getElementById('phrases-container');
    phrasesContainer.innerHTML = '';
    
    // Добавляем все фразы из цветков
    flowersData.forEach((flower, index) => {
        const phraseEl = document.createElement('div');
        phraseEl.className = 'phrase-item fade-in';
        phraseEl.textContent = flower.phrase;
        phraseEl.style.animationDelay = `${index * 0.2}s`;
        
        phrasesContainer.appendChild(phraseEl);
    });
}

// Предотвращаем стандартное поведение браузера для touch событий
document.addEventListener('touchmove', function(e) {
    if (e.target.classList.contains('flower')) {
        e.preventDefault();
    }
}, { passive: false });

console.log('🎁 Приложение инициализировано и готово к работе!');
