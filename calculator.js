function calculator(inputString) {
    // Проверка входящей строки
    function checkInputString() {
        const ERRORS = [
            'Input is empty or null!',
            'Input is not a string!',
            'Incorrect length of string!',
        ];

        let copyOfInputString = inputString;
        let trimmedString = copyOfInputString.trim();

        if (!trimmedString || typeof trimmedString === 'object') {
            throw new Error(ERRORS[0]);
        } else if (typeof trimmedString !== 'string') {
            throw new Error(ERRORS[1]);
        } else if (trimmedString.length < 5 || trimmedString.length > 11) {
            throw new Error(ERRORS[2]);
        } else {
            let checkedInputString = trimmedString;
            return checkedInputString;
        }
    }
    
    // Получение совпадений из проверенной строки
    function getMatchesFromCheckedString() {
        let copyOfCheckedString = checkInputString();

        const ARABIC_NUMBERS_PATTERN = /^([1-9]|10)\s+([-+*\/])\s+([1-9]|10)$/g;
        const ROMAN_NUMBERS_PATTERN = /^(I|II|III|IV|V|VI|VII|VIII|IX|X)\s+([-+*\/])+\s+(I|II|III|IV|V|VI|VII|VIII|IX|X)$/g;

        // разделяем проверку для арабских/римских чисел
        // и возвращаем тип чисел (true, если римские)
        if (copyOfCheckedString.match(ROMAN_NUMBERS_PATTERN)) {
            let matchedString = copyOfCheckedString;
            return [matchedString, true];
        } else if (copyOfCheckedString.match(ARABIC_NUMBERS_PATTERN)) {
            let matchedString = copyOfCheckedString;
            return [matchedString, false];
        } else {
            throw new Error('There are no matches!');
        }
    }

    // Получение выражения из найденных совпадений
    function getExpressionFromMatches() {
        let copyOfMatchedString = getMatchesFromCheckedString();
        
        let isRoman = copyOfMatchedString[0];
        let splitMatches = isRoman.split(' ', 3);

        return splitMatches;
    }
    
    // Конвертирование римских чисел в арабские из выражения
    function convertRomanNumbersToArabicExpression() {
        let copyOfExpression = getExpressionFromMatches();

        let operand1 = copyOfExpression[0];
        let operand2 = copyOfExpression[2];

        const ROMAN_NUMBERS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

        // сравниваем каждый из двух операндов с каждым из римских чисел
        for (let index = 0; index < 10; index++) {
            if (ROMAN_NUMBERS[index] == operand1) {
                copyOfExpression[0] = index + 1;
            }
            if (ROMAN_NUMBERS[index] == operand2) {
                copyOfExpression[2] = index + 1;
            }
        }
        return copyOfExpression;
    }
    
    // Вычисление выражения с арабскими числами
    function calculateArabicExpression() {
        let copyOfArabicExpression = convertRomanNumbersToArabicExpression();

        let operand1 = parseInt(copyOfArabicExpression[0]);
        let operand2 = parseInt(copyOfArabicExpression[2]);
        let sign = copyOfArabicExpression[1];

        switch (sign) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return (operand1 - operand1 % operand2) / operand2; // деление целочисленное
        }
    }
    
    // Если исходная строка была римская, то к римскому числу
    // Если нет, то арабское число к строке
    function convertArabicExpressionToRoman() {
        let copyOfCalculatedArabicExpression = calculateArabicExpression();
        let copyOfMatches = getMatchesFromCheckedString();

        let result;
        let isRoman = copyOfMatches[1]; // римская строка или нет

        const TENS_OF_ROMAN_NUMBERS = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
        const UNITS_OF_ROMAN_NUMBERS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

        if (isRoman == true) {
            if (copyOfCalculatedArabicExpression <= 0) {
                result = "";
            } else if (copyOfCalculatedArabicExpression == 100) {
                result = 'C';
            }
            // от 1 до 99: отдельно находим запись для десятков и для единиц
            else {
                result = TENS_OF_ROMAN_NUMBERS[(copyOfCalculatedArabicExpression - copyOfCalculatedArabicExpression % 10) / 10] + UNITS_OF_ROMAN_NUMBERS[copyOfCalculatedArabicExpression % 10];
            }
        } else {
            result = copyOfCalculatedArabicExpression.toString();
        }
        return result;
    }
    return convertArabicExpressionToRoman();
}

module.exports = calculator;