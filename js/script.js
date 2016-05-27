'use strict';
var testProgramming = {
    /**
     * Массив вопросов с вариантами ответов
     */
    questions: [{
        text: 'Вопрос №$. Для чего используется конструкция try-catch в javascript?',
        variants: [{
            text: '$. Для обработки возможных ошибок.',
            correct: true
        }, {
            text: '$. Для замены условного оператора if.',
            correct: false
        }, {
            text: '$. В строгом режиме весь код необходимо оборачивать в try-catch.',
            correct: false
        }]
    }, {
        text: 'Вопрос №$. Какой из пунктов верен по отношению к строгому режиму javascript?',
        variants: [{
            text: '$. Запрещено дублирование полей объектов.',
            correct: true
        }, {
            text: '$. Запрещено использование директивы eval.',
            correct: false
        }, {
            text: '$. Запрещено удаление полей, имеющих свойство writable = false.',
            correct: true
        }]
    }, {
        text: 'Вопрос №$. К какому участку скрипта применяется строгие правила "use strict"?',
        variants: [{
            text: '$. Во всем скрипте.',
            correct: false
        }, {
            text: '$. Внутри блока.',
            correct: false
        }, {
            text: '$. Либо во всем скрипте, либо в отдельной функции.',
            correct: true
        }]
    }]
};
var str = JSON.stringify(testProgramming);

localStorage.setItem('testProgramming', str);
testProgramming = $.parseJSON(localStorage.getItem('testProgramming'));

$(function() {
    //Генерируем текст из шаблона
    $('body').append(tmpl('test_template', testProgramming));
    //Вешаем обработчик на кнопку проверки теста
    $('#check').click(function(event) {
        var answerCorrect, i, j,
            correctAnswers = 0;
        event.preventDefault();
        for (var i = 0; i < testProgramming.questions.length; ++i) {
            answerCorrect = true;
            for (var j = 0; j < testProgramming.questions[i].variants.length; ++j) {
                if (
                    (!testProgramming.questions[i].variants[j].correct &&
                        $('#checkbox_' + i + '_' + j).prop('checked')
                    ) ||
                    (
                        testProgramming.questions[i].variants[j].correct &&
                        !$('#checkbox_' + i + '_' + j).prop('checked')
                    )
                ) {
                    // ответ неправильный
                    answerCorrect = false;
                }
            }
            if (answerCorrect) {
                ++correctAnswers;
            }
        }
        
        $('body').append(tmpl('modal_template', {
            message: "Правильных ответов: " + correctAnswers + " из " + testProgramming.questions.length,
            button: "Пройти тест заново"
        }));

        $('.mask, #close').click(function(e) {
            e.preventDefault();
            $('.mask, .modal').fadeOut(500, function() {
                $(this).remove();
            });
            $('input[type=checkbox]').prop('checked', false);
        });

        $('.mask, .modal').fadeIn(500);

    });
});
