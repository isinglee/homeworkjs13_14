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
	/**
	 * Создаёт элемент с тегом what, присваивает ему свойства из properties и вставляет его в элемент по ссылке where
	 */
	addElement: function (where, what, properties) {
		var element = document.createElement(what);
		if (typeof properties === 'object') {
			console.log(properties);
			if (typeof properties.text === 'string') {	element.appendChild(document.createTextNode(properties.text));
			}
			
		}
		where.appendChild(element);
		return element;
	},
	/**
	 * Создаёт форму, наполняет её элементами: заголовком, вопросами и кнопкой отправки и вставляет в корневой элемент по ссылке root
	 */
	render: function (root) {
		var form = this.addElement(root, 'form');
		this.renderHeader(form);
	},
	renderHeader: function (root) {
		var div = this.addElement(root, 'div', {
			style: {
				'textAlign': 'center',
				'padding': '10px'
			}
		});
		this.addElement(div, 'legend', {
			text: 'Тест по программированию'
		});
	}
};

testProgramming.render(document.body);