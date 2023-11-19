---
title: TLDR AI Demo - Calculator
permalink: /tldrai-demo.html
layout: single
---

<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white shadow-xl rounded-lg p-8">
        <div id="display" class="bg-gray-200 rounded p-4 text-right text-2xl mb-4">0</div>
        <div class="grid grid-cols-4 gap-4">
            <!-- Digit buttons -->
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('1')">1</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('2')">2</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('3')">3</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('4')">4</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('5')">5</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('6')">6</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('7')">7</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('8')">8</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl" onclick="pressDigit('9')">9</button>
            <button class="digit bg-gray-300 rounded p-4 text-2xl col-span-2" onclick="pressDigit('0')">0</button>
            
            <!-- Operator buttons -->
            <button class="operator bg-blue-300 rounded p-4 text-2xl" onclick="pressOperator('+')">+</button>
            <button class="operator bg-blue-300 rounded p-4 text-2xl" onclick="pressOperator('-')">-</button>
            <button class="operator bg-blue-300 rounded p-4 text-2xl" onclick="pressOperator('*')">*</button>
            <button class="operator bg-blue-300 rounded p-4 text-2xl" onclick="pressOperator('/')">/</button>
            
            <!-- Equal and Clear buttons -->
            <button class="equal bg-green-300 rounded p-4 text-2xl" onclick="calculate()">=</button>
            <button class="clear bg-red-300 rounded p-4 text-2xl" onclick="clearDisplay()">C</button>
        </div>
    </div>

    <script>
        let display = document.getElementById('display');
        let operand1 = null;
        let operand2 = null;
        let operator = null;
        let resetDisplay = false;

        function pressDigit(digit) {
            if (resetDisplay || display.innerText === '0') {
                display.innerText = digit;
                resetDisplay = false;
            } else {
                display.innerText += digit;
            }
        }

        function pressOperator(op) {
            if (operand1 === null) {
                operand1 = parseFloat(display.innerText);
            } else if (operator) {
                operand2 = parseFloat(display.innerText);
                calculate();
                operand1 = parseFloat(display.innerText);
            }
            operator = op;
            resetDisplay = true;
        }

        function calculate() {
            if (!operator || resetDisplay) return;
            operand2 = parseFloat(display.innerText);
            switch (operator) {
                case '+':
                    display.innerText = operand1 + operand2;
                    break;
                case '-':
                    display.innerText = operand1 - operand2;
                    break;
                case '*':
                    display.innerText = operand1 * operand2;
                    break;
                case '/':
                    if (operand2 === 0) {
                        display.innerText = 'Error';
                    } else {
                        display.innerText = operand1 / operand2;
                    }
                    break;
            }
            operand1 = parseFloat(display.innerText);
            operator = null;
            resetDisplay = true;
        }

        function clearDisplay() {
            display.innerText = '0';
            operand1 = null;
            operand2 = null;
            operator = null;
            resetDisplay = false;
        }
    </script>
</body>