// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

        // С: кнопка смены знака

    document.getElementById("btn_op_sign").onclick = function() {
        if (a !== '') {
            a = (-a).toString()
            outputElement.innerHTML = a
        }
        if (b !== '') {
            b = (-b).toString()
            outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_op_percent").onclick = function() {
        if (a === '') return

    }

    // С: Квадратный корень
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation) {
            if (+a < 0) return

            expressionResult = (Math.sqrt(+a))
            a = expressionResult.toString()
            outputElement.innerHTML = a
        }
        else {
            if (+b < 0) return

            expressionResult = (Math.sqrt(+b))
            b = expressionResult.toString()
            outputElement.innerHTML = b
        }
        
    }

    // С: Квадрат

    document.getElementById("btn_op_sqr").onclick = function() {
        if (!selectedOperation) {

            expressionResult = (+a)*(+a)
            a = expressionResult.toString()
            outputElement.innerHTML = a
        }
        else {
            expressionResult = (+b)*(+b)
            b = expressionResult.toString()
            outputElement.innerHTML = b
        }
        
    }

    };