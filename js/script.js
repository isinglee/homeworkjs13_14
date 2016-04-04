var testProgramming = {
    /**
    * Массив вопросов с вариантами ответов
    */
    questions: [
        {
            text: 'Вопрос №$',
            variants: [
                {
                    text: 'Вариант ответа №$'
                },
                {
                    text: 'Вариант ответа №$'
                },
                {
                    text: 'Вариант ответа №$'
                }
            ]
        },
        {
            text: 'Вопрос №$',
            variants: [
                {
                    text: 'Вариант ответа №$'
                },
                {
                    text: 'Вариант ответа №$'
                },
                {
                    text: 'Вариант ответа №$'
                }
            ]
        },
        {
            text: 'Вопрос №$',
            variants: [
                {
                    text: 'Вариант ответа №$'
                },
                {
                    text: 'Вариант ответа №$'
                },
                {
                    text: 'Вариант ответа №$'
                }
            ]
        }
    ],
    /**
     * Создаёт элемент с тегом what, присваивает ему свойства из properties и вставляет его в элемент по ссылке where
     */
    addElement: function(where, what, properties) {
        // Создаем элемент с заданным тегом (what)
        var element = document.createElement(what);

        // Проверяем, нужно ли устанавливать созданному элементу какие-то параметры
        if (typeof properties === 'object') {
            // Проверяем, нужно ли добавить в объект текстовый узел
            if (typeof properties.text === 'string') {
                //Добавляем текст в объект
                var text = document.createTextNode(properties.text);
                element.appendChild(text);
            }

            // Проверяем, содержит ли объект параметры стилей
            if (typeof properties.style === 'object') {
                // Проходим по объекту style
                for (var i in properties.style) {
                    // Копируем очередной стиль из properties.style в стили элемента
                    element.style[i] = properties.style[i];
                }
            }

            // Проверяем, содержит ли объект классы
            if (typeof properties.classes === 'object') {
                // Проходим по массиву classes
                for (var i in properties.classes) {
                    // Добавляем очередной класс в список классов элемента
                    element.classList.add(properties.classes[i]);
                }
            }

            // Проверяем, содержит ли объект атрибуты (id, for'' и т.д.) 
            if (typeof properties.attributes === 'object') {
                // Проходим по массиву и устанавливаем атрибуты у элемента
                // Атрибуты заданы в виде объекта, у которого поле это имя атрибута, а значение поля - значение атрибута
                for (var i in properties.attributes) {
                    element.setAttribute(i, properties.attributes[i]);
                }
            }
        }

        // Добавляем созданный элемент в конец элемента where
        where.appendChild(element);
        
        // Возвращаем ссылку на созданный элемент, чтобы работать с ним дальше
        return element;
    },
    /**
     * Создаёт текстовый узел с текстом text и вставляет его в элемент по ссылке where
     */
    addText: function(where, text) {
        // Создаём узел с заданным текстом
        var textNode = document.createTextNode(text);
        // Добавляем созданный узел в конец элемента where
        where.appendChild(textNode);
        // Возвращаем ссылку на созданный узел, чтобы работать с ним дальше
        return textNode;
    },
    /**
     * Создаёт форму, наполняет её элементами: заголовком, вопросами и кнопкой отправки и вставляет в корневой элемент по ссылке root
     */
    render: function(root) {
        // Создаём в корневом элементе (root) форму
        var form = this.addElement(root, 'form');
        // Добавляем в форму заголовок, список вопросов и подвал с кнопкой отправки
        this.renderHeader(form);
        this.renderQuestions(form);
        this.renderFooter(form);
    },
    /**
     * Создает div с legend внутри
     */
    renderHeader: function(root) {
        // Создаём div, c выравниванием по центру и отступами
        var div = this.addElement(root, 'div', {
            style: {
                'textAlign': 'center',
                'padding': '10px'
            }
        });
        // Вставляем внутрь элемент legend с текстом заголовка
        var legend = this.addElement(div, 'legend', {
            text: 'Тест по программированию'
        });
    },
    renderQuestions: function(root) {
        // Создаём нумерованный список
        var ol = this.addElement(root, 'ol');

        // Проходим по массиву вопросов
        for (var i in this.questions) {
            // Создаём очередной элемент списка с текстом вопроса
            var li = this.addElement(ol, 'li', {
                text: this.questions[i].text.replace('$', +i + 1) // Если в тексте есть "$", заменяем на номер вопроса в массиве +1
            });

            // Создаём очередной элемент ul, в котором будут варианты ответов
            var ul = this.addElement(li, 'ul');

            // Проходим по массиву с вариантами ответов
            for (var j in this.questions[i].variants) {
                // Создаём очередной элемент списка ответов
                var li2 = this.addElement(ul, 'li');

                // Добавляем label для чекбокса очередного варианта ответа
                var label = this.addElement(li2, 'label', {
                    classes: ['checkbox'],
                    attributes: {
                        for: 'checkbox_'+i+'_'+j // Генерируем уникальный ID для чекбокса и label на основе номера вопроса и ответа
                    }
                });

                // Добавляем checkbox в label
                var input = this.addElement(label, 'input', {
                    attributes: {
                        type: 'checkbox',
                        id: 'checkbox_'+i+'_'+j // Генерируем уникальный ID для чекбокса и label на основе номера вопроса и ответа
                    }
                });

                // Добавляем текст варианта ответа после checkbox
                // Если в тексте есть "$", заменяем на номер вопроса в массиве +1
                var text = this.addText(label, this.questions[i].variants[j].text.replace('$', +j + 1))
            }
        }
    },
    renderFooter: function(root) {
        // Создаём div, c выравниванием по центру и отступами
        var div = this.addElement(root, 'div', {
            style: {
                'textAlign': 'center',
                'padding': '10px'
            }
        });
        // Вставляем внутрь элемент кнопку отправки формы, стилизованную с помощью Bootstrap
        var button = this.addElement(div, 'button', {
            text: 'Проверить мои результаты',
            classes: ['btn', 'btn-primary'],
            attributes: {
                type: 'submit'
            }
        });
    }
};

testProgramming.render(document.body);
