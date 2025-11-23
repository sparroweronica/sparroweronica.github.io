<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Подарок для мамы</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <style>
        /* Временные стили для отладки изображений */
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
        
        /* Стили для финального экрана */
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
            max-width: 300px;
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        /* Индикатор перетаскивания */
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
    </style>
</head>
<body>
    <!-- Подсказка для перетаскивания -->
    <div class="drag-hint" id="drag-hint">Перетащи цветок в вазу 💫</div>

    <!-- ЭКРАН 1: Начальный -->
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

    <!-- ЭКРАН 2: Букет в обертке -->
    <div id="screen-bouquet-wrapped" class="screen">
        <p class="instruction">Поухаживай за букетом - и узнай что он хочет тебе сказать</p>
        <div class="bouquet-container">
            <img src="images/bouquet-wrapped.png" alt="Букет в обертке" class="bouquet-wrapped real-image" id="bouquet-wrapped">
            <div class="debug-info">images/bouquet-wrapped.png</div>
            <img src="images/ribbon.png" alt="Ленточка" class="ribbon real-image shaking" id="ribbon">
            <div class="debug-info">images/ribbon.png</div>
        </div>
    </div>

    <!-- ЭКРАН 3: Цветы без обертки -->
    <div id="screen-bouquet-unwrapped" class="screen">
        <p class="instruction">Перетащи каждый цветок в вазу</p>
        <div class="flowers-container" id="flowers-container">
            <!-- Цветки будут добавляться скриптом -->
        </div>
        <img src="images/vase.png" alt="Ваза" class="vase real-image" id="vase">
        <div class="debug-info">images/vase.png</div>
    </div>

    <!-- ЭКРАН 4: Финальный букет -->
    <div id="screen-final" class="screen">
        <p class="final-message">Твой букет собран! Он прекрасен, как и ты! 💝</p>
        
        <!-- Контейнер для фраз -->
        <div class="phrases-container" id="phrases-container">
            <!-- Фразы будут добавляться скриптом -->
        </div>
        
        <!-- Финальное изображение букета -->
        <div class="final-image-container">
            <img src="images/vase-with-flowers.png" alt="Ваза с цветами" id="final-bouquet-image" class="real-image">
            <div class="debug-info">images/vase-with-flowers.png</div>
        </div>
        
        <button id="save-button">Сохранить букет</button>
    </div>

    <!-- Карточка описания цветка -->
    <div id="flower-modal" class="modal">
        <div class="modal-content">
            <h2 id="flower-title">Название цветка</h2>
            <p id="flower-description">Описание цветка появится здесь</p>
            <button id="move-to-vase-btn">✅ Готово! Теперь перетащи цветок в вазу</button>
        </div>
    </div>

    <script>
        // Данные о цветках с реальными изображениями
        const flowersData = [
            {
                id: 1,
                img: 'images/flower-1.png',
                title: 'Цветок Благодарности',
                description: 'Спасибо тебе за каждое утро, начинающееся с твоей улыбки, за каждую ночь, охраняемую твоей заботой.',
                phrase: 'Спасибо за всё! 💝'
            },
            {
                id: 2,
                img: 'images/flower-2.png',
                title: 'Цветок Мудрости', 
                description: 'Твои советы были подобны маякам в море жизни. Ты научила меня не просто смотреть, а видеть.',
                phrase: 'Ты самая мудрая! 🌟'
            },
            {
                id: 3,
                img: 'images/flower-3.png',
                title: 'Цветок Терпения',
                description: 'Помню, как ты терпеливо учила меня завязывать шнурки, читать по слогам, переживать первые неудачи.',
                phrase: 'Спасибо за терпение! 🌊'
            },
            {
                id: 4, 
                img: 'images/flower-4.png',
                title: 'Цветок Безусловной Любви',
                description: 'Ты любила меня просто за то, что я есть. Без условий, без ожиданий.',
                phrase: 'Люблю тебя бесконечно! ❤️'
            },
            {
                id: 5,
                img: 'images/flower-5.png', 
                title: 'Цветок Силы',
                description: 'Я видела, как ты справлялась с трудностями, и училась у тебя стойкости.',
                phrase: 'Ты - моя сила! 💪'
            },
            {
                id: 6,
                img: 'images/flower-6.png', 
                title: 'Цветок Нежности',
                description: 'Твоя нежность согревала меня в самые холодные дни.',
                phrase: 'Ты - моя нежность! 🌸'
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

        // Функция для установки обработчиков на цветки (вызывается при показе цветка)
        function setupFlowerClickHandlers() {
            const flowers = document.querySelectorAll('.flower');
            flowers.forEach((flower, index) => {
                // Удаляем старые обработчики
                flower.replaceWith(flower.cloneNode(true));
                
                // Получаем обновленный элемент
                const newFlower = document.querySelectorAll('.flower')[index];
                
                // Добавляем новые обработчики
                newFlower.addEventListener('click', function() {
                    const flowerId = parseInt(this.dataset.id);
                    const flowerData = flowersData.find(f => f.id === flowerId);
                    if (flowerData) {
                        openFlowerModal(flowerData);
                    }
                });
                
                newFlower.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    const flowerId = parseInt(this.dataset.id);
                    const flowerData = flowersData.find(f => f.id === flowerId);
                    if (flowerData) {
                        openFlowerModal(flowerData);
                    }
                }, { passive: false });
            });
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

        function saveBouquet() {
            console.log('💾 Сохраняем букет...');
            
            // Создаем временный контейнер для сохранения
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.background = 'linear-gradient(135deg, var(--soft-pink), var(--cream))';
            tempContainer.style.padding = '40px 20px';
            tempContainer.style.textAlign = 'center';
            tempContainer.style.minHeight = '100vh';
            tempContainer.style.display = 'flex';
            tempContainer.style.flexDirection = 'column';
            tempContainer.style.alignItems = 'center';
            tempContainer.style.justifyContent = 'center';
            
            // Добавляем заголовок
            const title = document.createElement('h1');
            title.textContent = 'Букет для мамы';
            title.style.color = 'var(--warm-brown)';
            title.style.marginBottom = '30px';
            title.style.fontFamily = 'Georgia, serif';
            tempContainer.appendChild(title);
            
            // Добавляем фразы
            const phrasesWrapper = document.createElement('div');
            phrasesWrapper.className = 'phrases-container';
            phrasesWrapper.style.maxWidth = '500px';
            phrasesWrapper.style.marginBottom = '40px';
            
            flowersData.forEach(flower => {
                const phraseEl = document.createElement('div');
                phraseEl.className = 'phrase-item';
                phraseEl.textContent = flower.phrase;
                phraseEl.style.marginBottom = '15px';
                phrasesWrapper.appendChild(phraseEl);
            });
            
            tempContainer.appendChild(phrasesWrapper);
            
            // Добавляем изображение букета
            const img = document.createElement('img');
            img.src = 'images/vase-with-flowers.png';
            img.alt = 'Ваза с цветами';
            img.style.maxWidth = '300px';
            img.style.width = '100%';
            img.style.borderRadius = '20px';
            img.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            tempContainer.appendChild(img);
            
            // Добавляем в DOM
            document.body.appendChild(tempContainer);
            
            html2canvas(tempContainer).then(canvas => {
                // Создаем временную ссылку для скачивания
                const link = document.createElement('a');
                link.download = 'букет-для-мамы.png';
                link.href = canvas.toDataURL('image/png');
                
                // Программно кликаем по ссылке
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Убираем временный контейнер
                document.body.removeChild(tempContainer);
                
                console.log('✅ Букет успешно сохранен!');
                
                // Показываем подтверждение
                alert('Букет сохранен в галерею! 📸');
            }).catch(error => {
                console.error('❌ Ошибка при сохранении:', error);
                alert('Произошла ошибка при сохранении. Попробуйте еще раз.');
                document.body.removeChild(tempContainer);
            });
        }

        // Предотвращаем стандартное поведение браузера для touch событий
        document.addEventListener('touchmove', function(e) {
            if (e.target.classList.contains('flower')) {
                e.preventDefault();
            }
        }, { passive: false });

        console.log('🎁 Приложение инициализировано и готово к работе!');
    </script>
</body>
</html>

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
    // const element = document.getElementById('final-bouquet-container');
     const bouquetImage = document.getElementById('final-bouquet-image');
    
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

/* Адаптивность для iPhone */
@media (max-width: 768px) {
    body {
        padding: 15px;
    }
    
    .instruction {
        font-size: 1.1em !important;
    }
}

/* Плейсхолдеры для изображений */
.image-placeholder {
    border: 3px dashed currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8em;
    position: relative;
    overflow: hidden;
}

.image-placeholder::after {
    content: "🖼️ Изображение";
    position: absolute;
}

/* Общие стили экранов */
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

/* Анимация тряски */
@keyframes gentleShake {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-2px) rotate(-0.5deg); }
    75% { transform: translateX(2px) rotate(0.5deg); }
}

.shaking {
    animation: gentleShake 0.8s ease-in-out infinite;
    cursor: pointer;
}

/* Плавные переходы */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}

/* ЭКРАН 1: Начальный */
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
    width: 140px;
    height: 140px;
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
    width: 180px;
    height: 180px;
    border-radius: 15px;
    transition: all 0.3s ease;
}

.gift-box:active {
    transform: scale(0.95);
}

/* ЭКРАН 2: Букет в обертке */
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
    width: 280px;
    height: 350px;
    border-radius: 20px;
}

.ribbon {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 30px;
    border-radius: 10px;
    cursor: pointer;
    z-index: 2;
}

/* ЭКРАН 3: Цветы без обертки */
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
    width: 90px;
    height: 90px;
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
    width: 180px;
    height: 180px;
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

/* ЭКРАН 4: Финальный */
.final-message {
    font-size: 1.5em;
    margin-bottom: 30px;
    color: var(--warm-brown);
    background: rgba(255, 255, 255, 0.9);
    padding: 20px 30px;
    border-radius: 30px;
}

#final-bouquet-container {
    position: relative;
    margin: 40px 0;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.final-vase {
    width: 220px;
    height: 220px;
    border-radius: 15px;
}

.final-flower {
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 12px;
    transition: all 0.5s ease-out;
}

.flower-phrase {
    position: absolute;
    top: -65px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.85em;
    white-space: nowrap;
    border: 2px solid var(--accent-gold);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    font-weight: 500;
}

#save-button {
    padding: 15px 35px;
    background: linear-gradient(45deg, var(--accent-gold), #b8860b);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1.2em;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    margin-top: 20px;
}

#save-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

#save-button:active {
    transform: translateY(0);
}

/* Модальное окно */
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

/* Индикатор прогресса */
.progress {
    margin-top: 20px;
    font-size: 1em;
    color: var(--warm-brown);
    opacity: 0.7;
}

/* Адаптивность для очень маленьких экранов */
@media (max-width: 480px) {
    .daughter-photo {
        width: 120px;
        height: 120px;
    }
    
    .gift-box {
        width: 150px;
        height: 150px;
    }
    
    .bouquet-wrapped {
        width: 250px;
        height: 300px;
    }
    
    .flower {
        width: 75px;
        height: 75px;
    }
    
    .final-message {
        font-size: 1.3em;
        padding: 15px 20px;
    }
}




