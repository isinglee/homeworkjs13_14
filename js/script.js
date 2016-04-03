var testProgramming = {
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
    addElement: function(where, what, properties) {
        var element = document.createElement(what);

        if (typeof properties === 'object') {
            if (typeof properties.text === 'string') {
                var text = document.createTextNode(properties.text);
                element.appendChild(text);
            }
            if (typeof properties.style === 'object') {
                for (var i in properties.style) {
                    element.style[i] = properties.style[i];
                }
            }
            if (typeof properties.classes === 'object') {
                for (var i in properties.classes) {
                    element.classList.add(properties.classes[i]);
                }
            }
            if (typeof properties.attributes === 'object') {
                for (var i in properties.attributes) {
                    element.setAttribute(i, properties.attributes[i]);
                }
            }
        }

        where.appendChild(element);
        return element;
    },
    addText: function(where, text) {
        var textNode = document.createTextNode(text);
        where.appendChild(textNode);
        return textNode;
    },
    render: function(root) {
        var form = this.addElement(root, 'form');
        this.renderHeader(form);
        this.renderQuestions(form);
        this.renderFooter(form);
    },
    renderHeader: function(root) {
        var div = this.addElement(root, 'div', {
            style: {
                'textAlign': 'center',
                'padding': '10px'
            }
        });
        var legend = this.addElement(div, 'legend', {
            text: 'Тест по программированию'
        });
    },
    renderQuestions: function(root) {
        var ol = this.addElement(root, 'ol');
        for (var i in this.questions) {
            var li = this.addElement(ol, 'li', {
                text: this.questions[i].text.replace('$', +i + 1)
            });
            var ul = this.addElement(li, 'ul');
            for (var j in this.questions[i].variants) {
                var li2 = this.addElement(ul, 'li');
                var label = this.addElement(li2, 'label', {
                    classes: ['checkbox'],
                    attributes: {
                        for: ''
                    }
                });
                var input = this.addElement(label, 'input', {
                    attributes: {
                        type: 'checkbox'
                    }
                });
                var text = this.addText(label, this.questions[i].variants[j].text.replace('$', +j + 1))
            }
        }
    },
    renderFooter: function(root) {
        var div = this.addElement(root, 'div', {
            style: {
                'textAlign': 'center',
                'padding': '10px'
            }
        });
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
