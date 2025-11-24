<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Подарок для мамы</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
   
    <div class="drag-hint" id="drag-hint">Перетащи цветок в вазу 💫</div>


    <div id="screen-intro" class="screen active">
        <div class="intro-container">
            <div class="daughter-section">
                <img src="images/daughter-photo.jpg" alt="Дочка" class="daughter-photo real-image">
                <div class="debug-info">images/daughter-photo.jpg</div>
                <p class="speech-text">эмм...мам...нуу...мамуль...ну вобщем это тебе...</p>
            </div>
            <div class="gift-section">
                <img src="images/gift-box.png" alt="Подарок" class="gift-box real-image shaking" id="gift-box">
                <div class="debug-info">images/gift-box.png</div>
            </div>
        </div>
    </div>


    <div id="screen-bouquet-wrapped" class="screen">
        <p class="instruction">Раскрой упаковку и узнай что подарочек хочет тебе сказать</p>
        <div class="bouquet-container">
            <img src="images/bouquet-wrapped.png" alt="Букет в обертке" class="bouquet-wrapped real-image" id="bouquet-wrapped">
            <div class="debug-info">images/bouquet-wrapped.png</div>
            <img src="images/ribbon.png" alt="Ленточка" class="ribbon real-image shaking" id="ribbon">
            <div class="debug-info">images/ribbon.png</div>
        </div>
    </div>


    <div id="screen-bouquet-unwrapped" class="screen">
        <p class="instruction">Нажми на цветочек! А после перетащи его в вазу</p>
        <div class="flowers-container" id="flowers-container">
            <!-- Цветки будут добавляться скриптом -->
        </div>
        <img src="images/vase.png" alt="Ваза" class="vase real-image" id="vase">
        <div class="debug-info">images/vase.png</div>
    </div>


    <div id="screen-final" class="screen">
        <p class="final-message">Воть твой букетик! Он красивый и многогранный, как и ты!</p>
        

        <div class="phrases-container" id="phrases-container">

        </div>
        

        <div class="final-image-container">
            <img src="images/vase-with-flowers.png" alt="Ваза с цветами" id="final-bouquet-image" class="real-image">
            <div class="debug-info">images/vase-with-flowers.png</div>
        </div>
    </div>


    <div id="flower-modal" class="modal">
        <div class="modal-content">
            <h2 id="flower-title">Название цветка</h2>
            <p id="flower-description">Описание цветка появится здесь</p>
            <button id="move-to-vase-btn">Готово! Теперь перетащи цветок в вазу</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>





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


let currentFlowerIndex = 0;
let flowersInVase = 0;
let activeFlower = null;
let currentFlowerElement = null;


document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация ');
    initializeFlowers();
    setupEventListeners();
    

    checkImages();
});


function checkImages() {
    const images = document.querySelectorAll('.real-image');
    images.forEach(img => {
        img.onerror = function() {
            console.error(' Не загружено изображение:', img.src);
            // Показываем отладочную информацию
            const debugInfo = img.parentElement.querySelector('.debug-info');
            if (debugInfo) debugInfo.style.display = 'block';
        };
        img.onload = function() {
            console.log('Загружено:', img.src);
        };
    });
}


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
    console.log(`Инициализировано ${flowersData.length} цветков`);
}


function setupEventListeners() {

    document.getElementById('gift-box').addEventListener('click', openGift);
    document.getElementById('gift-box').addEventListener('touchstart', openGift, { passive: true });
    

    document.getElementById('ribbon').addEventListener('click', removeRibbon);
    document.getElementById('ribbon').addEventListener('touchstart', removeRibbon, { passive: true });
    
    document.getElementById('bouquet-wrapped').addEventListener('click', removeWrapper);
    document.getElementById('bouquet-wrapped').addEventListener('touchstart', removeWrapper, { passive: true });
    

    document.getElementById('move-to-vase-btn').addEventListener('click', prepareFlowerForMoving);
    
    console.log('Все обработчики установлены');
}


function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    console.log(`Переключено на экран: ${screenId}`);
}

function openGift() {
    console.log('Открываем подарок');
    showScreen('screen-bouquet-wrapped');
}

function removeRibbon() {
    console.log('нбираем ленточку');
    document.getElementById('ribbon').style.display = 'none';
    document.getElementById('bouquet-wrapped').classList.add('shaking');
}

function removeWrapper() {
    console.log('Разворачиваем букет');
    showScreen('screen-bouquet-unwrapped');
    

    setTimeout(() => {
        showNextFlower();
    }, 800);
}

// Работа с цветками
function showNextFlower() {
    if (currentFlowerIndex < flowersData.length) {
        const flowers = document.querySelectorAll('.flower');
        const currentFlower = flowers[currentFlowerIndex];
        

        currentFlower.classList.add('shaking');
        currentFlower.style.cursor = 'pointer';
        

        setupFlowerClickHandlers(currentFlower);
        
        console.log(`цветок ${currentFlowerIndex + 1}`);
    }
}


function setupFlowerClickHandlers(flowerElement) {

    const newFlowerElement = flowerElement.cloneNode(true);
    flowerElement.parentNode.replaceChild(newFlowerElement, flowerElement);
    

    newFlowerElement.addEventListener('click', function() {
        const flowerId = parseInt(this.dataset.id);
        const flowerData = flowersData.find(f => f.id === flowerId);
        if (flowerData) {
            openFlowerModal(flowerData);
        }
    });
    
    newFlowerElement.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const flowerId = parseInt(this.dataset.id);
        const flowerData = flowersData.find(f => f.id === flowerId);
        if (flowerData) {
            openFlowerModal(flowerData);
        }
    }, { passive: false });
    
    return newFlowerElement;
}

function openFlowerModal(flowerData) {
    console.log(`описание: ${flowerData.title}`);
    activeFlower = flowerData;
    
    document.getElementById('flower-title').textContent = flowerData.title;
    document.getElementById('flower-description').textContent = flowerData.description;
    document.getElementById('flower-modal').style.display = 'flex';
}

function prepareFlowerForMoving() {
    console.log(` цветок к перемещению: ${activeFlower.title}`);
    document.getElementById('flower-modal').style.display = 'none';
    

    currentFlowerElement = document.querySelector(`.flower[data-id="${activeFlower.id}"]`);
    currentFlowerElement.classList.remove('shaking');
    currentFlowerElement.classList.add('selected');
    

    const newFlowerElement = currentFlowerElement.cloneNode(true);
    currentFlowerElement.parentNode.replaceChild(newFlowerElement, currentFlowerElement);
    currentFlowerElement = newFlowerElement;
    

    const vase = document.getElementById('vase');
    vase.classList.add('drop-target');
    

    showDragHint();
    

    setupFlowerDrag(currentFlowerElement);
}

function showDragHint() {
    const hint = document.getElementById('drag-hint');
    hint.style.display = 'block';
    setTimeout(() => {
        hint.style.display = 'none';
    }, 3000);
}


function setupFlowerDrag(flowerElement) {
    let isDragging = false;
    let startX, startY;
    

    flowerElement.style.cursor = 'grab';
    

    flowerElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    flowerElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    flowerElement.addEventListener('touchend', handleTouchEnd);
    

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
        
        console.log('Начали перетаскивание');
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
            console.log('Цветок помещен');
            placeFlowerInVase(flowerElement, activeFlower);
        } else {
            console.log(' Цветок не дошел');
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
    
    console.log('Цветок возвращен');
}

function placeFlowerInVase(flowerElement, flowerData) {
    console.log(`Помещаем цветок в вазу: ${flowerData.title}`);
    
    
    flowerElement.classList.add('in-vase');
    

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
            //вссе цветки собраны - показываем финальный экран
            setTimeout(showFinalBouquet, 800);
        }
    }, 300);
}

function showFinalBouquet() {
    console.log('🎉 Показываем финальный букет!');
    showScreen('screen-final');
    
    const phrasesContainer = document.getElementById('phrases-container');
    phrasesContainer.innerHTML = '';
    

    flowersData.forEach((flower, index) => {
        const phraseEl = document.createElement('div');
        phraseEl.className = 'phrase-item fade-in';
        phraseEl.textContent = flower.phrase;
        phraseEl.style.animationDelay = `${index * 0.2}s`;
        
        phrasesContainer.appendChild(phraseEl);
    });
}


document.addEventListener('touchmove', function(e) {
    if (e.target.classList.contains('flower')) {
        e.preventDefault();
    }
}, { passive: false });

console.log('инициализировано');

/* Базовые стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --soft-pink: #ffe8e8;
    --cream: #f5f5dc;
    --warm-brown: #5a4a3a;
    --accent-gold: #d4a574;
    --success-green: #90a955;
}

body {
    font-family: 'Georgia', serif;
    background: linear-gradient(135deg, var(--soft-pink), var(--cream));
    color: var(--warm-brown);
    text-align: center;
    min-height: 100vh;
    padding: 20px;
    overflow-x: hidden;
    touch-action: manipulation;
}


.debug-info {
    position: absolute;
    top: 5px;
    left: 5px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 5px;
    font-size: 10px;
    border-radius: 3px;
    display: none;
}


.phrases-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 30px 0;
    max-width: 500px;
    width: 90%;
}

.phrase-item {
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 20px;
    border: 2px solid var(--accent-gold);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    font-size: 1.1em;
    line-height: 1.4;
    text-align: center;
    animation: fadeIn 0.6s ease-out;
}

.phrase-item:nth-child(even) {
    background: rgba(212, 165, 116, 0.1);
}

.final-image-container {
    margin: 20px 0;
    position: relative;
}

#final-bouquet-image {
    max-width: 400px;
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}


.drag-hint {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    font-size: 1.1em;
    z-index: 3000;
    animation: fadeIn 0.3s ease-out;
    display: none;
}


@media (max-width: 768px) {
    body {
        padding: 15px;
    }
    
    .instruction {
        font-size: 1.1em !important;
    }
}


.screen {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    width: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.screen.active {
    display: flex;
    opacity: 1;
}


@keyframes gentleShake {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-2px) rotate(-0.5deg); }
    75% { transform: translateX(2px) rotate(0.5deg); }
}

.shaking {
    animation: gentleShake 0.8s ease-in-out infinite;
    cursor: pointer;
}


@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}


.intro-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    animation: fadeIn 1s ease-out;
}

.daughter-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.daughter-photo {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 4px solid var(--accent-gold);
}

.speech-text {
    font-style: italic;
    font-size: 1.4em;
    margin-top: 10px;
    color: #8b4513;
    background: rgba(255, 255, 255, 0.7);
    padding: 10px 20px;
    border-radius: 20px;
    backdrop-filter: blur(5px);
}

.gift-box {
    width: 220px;
    height: 220px;
    border-radius: 15px;
    transition: all 0.3s ease;
}

.gift-box:active {
    transform: scale(0.95);
}


.instruction {
    font-size: 1.3em;
    margin-bottom: 40px;
    color: var(--warm-brown);
    font-weight: 500;
    background: rgba(255, 255, 255, 0.8);
    padding: 15px 25px;
    border-radius: 25px;
    backdrop-filter: blur(5px);
}

.bouquet-container {
    position: relative;
    display: inline-block;
}

.bouquet-wrapped {
    width: 350px;
    height: 420px;
    border-radius: 20px;
}

.ribbon {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    z-index: 2;
}


.flowers-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 25px;
    margin-bottom: 50px;
    position: relative;
    min-height: 200px;
}

.flower {
    width: 120px;
    height: 120px;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    border: 3px solid transparent;
}

.flower.shaking {
    animation: gentleShake 0.6s ease-in-out infinite;
}

.flower.selected {
    border: 3px dashed var(--accent-gold);
    background-color: rgba(212, 165, 116, 0.1);
}

.flower.dragging {
    cursor: grabbing;
    transform: scale(1.1) rotate(5deg);
    z-index: 1000;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.flower.in-vase {
    opacity: 0;
    transform: scale(0.5);
}

.vase {
    width: 220px;
    height: 220px;
    border-radius: 10px;
    margin-top: 30px;
    transition: all 0.3s ease;
    border: 3px solid transparent;
}

.vase.drop-target {
    border-color: var(--accent-gold);
    box-shadow: 0 0 20px rgba(212, 165, 116, 0.4);
    transform: scale(1.05);
}


.final-message {
    font-size: 1.5em;
    margin-bottom: 30px;
    color: var(--warm-brown);
    background: rgba(255, 255, 255, 0.9);
    padding: 20px 30px;
    border-radius: 30px;
}


.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2000;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 20px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.4s ease-out;
    border: 3px solid var(--accent-gold);
}

#flower-title {
    color: var(--warm-brown);
    margin-bottom: 20px;
    font-size: 1.6em;
    font-weight: bold;
}

#flower-description {
    line-height: 1.6;
    margin-bottom: 25px;
    font-size: 1.1em;
    color: #666;
}

#move-to-vase-btn {
    padding: 12px 25px;
    background: var(--success-green);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
    width: 100%;
}

#move-to-vase-btn:hover {
    background: #7d9944;
}


