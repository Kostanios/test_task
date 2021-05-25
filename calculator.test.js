const calculator = require('./calculator')
/*

Привет, твоё решение не проходит все проверки на удовлетворение условию задачи.
Запусти код по кнопке "run" на платформе repl.it и всю нужную тебе информацию, ты найдёшь в выводе в консоли.
Доработай решение и присылай его снова.
Успехов!

 */
test('должен работать с десятичными числами (сложение)', () => {
  expect(calculator('1 + 1')).toBe('2')
  expect(calculator('1 + 2')).toBe('3')
  expect(calculator('4 + 3')).toBe('7')
  expect(calculator('10 + 10')).toBe('20')
})

test('должен работать с десятичными числами (вычитание)', () => {
  expect(calculator('10 - 1')).toBe('9')
  expect(calculator('5 - 4')).toBe('1')
  expect(calculator('4 - 4')).toBe('0')
  expect(calculator('1 - 10')).toBe('-9')
  expect(calculator('4 - 5')).toBe('-1')
})

test('должен работать с десятичными числами (умножение)', () => {
  expect(calculator('10 * 10')).toBe('100')
  expect(calculator('4 * 10')).toBe('40')
  expect(calculator('5 * 1')).toBe('5')
  expect(calculator('5 * 5')).toBe('25')
})

test('должен работать с десятичными числами (деление)', () => {
  expect(calculator('10 / 1')).toBe('10')
  expect(calculator('6 / 2')).toBe('3')
  expect(calculator('5 / 4')).toBe('1')
  expect(calculator('2 / 4')).toBe('0')
})

test('должен работать с римскими числами (сложение)', () => {
  expect(calculator('I + I')).toBe('II')
  expect(calculator('I + II')).toBe('III')
  expect(calculator('IV + III')).toBe('VII')
  expect(calculator('X + X')).toBe('XX')
  expect(calculator('X + IX')).toBe('XIX')
})

test('должен работать с римскими числами (вычитание)', () => {
  expect(calculator('X - I')).toBe('IX')
  expect(calculator('V - IV')).toBe('I')
  expect(calculator('IV - IV')).toBe('')
  expect(calculator('I - X')).toBe('')
  expect(calculator('IV - V')).toBe('')
})

test('должен работать с римскими числами (умножение)', () => {
  expect(calculator('X * X')).toBe('C')
  expect(calculator('IV * X')).toBe('XL')
  expect(calculator('V * I')).toBe('V')
  expect(calculator('V * V')).toBe('XXV')
})

test('должен работать с римскими числами (деление)', () => {
  expect(calculator('X / I')).toBe('X')
  expect(calculator('VI / II')).toBe('III')
  expect(calculator('V / IV')).toBe('I')
  expect(calculator('II / IV')).toBe('')
})

test('должен выбрасывать ошибку на некорректных данных', () => {
  expect(() => calculator('')).toThrowError()
  expect(() => calculator(' ')).toThrowError()
  expect(() => calculator('     ')).toThrowError()
  expect(() => calculator('4')).toThrowError()
  expect(() => calculator('+')).toThrowError()
  expect(() => calculator('++1')).toThrowError()
  expect(() => calculator('V')).toThrowError()
  expect(() => calculator('3 % 4')).toThrowError()
  expect(() => calculator('1 + 1 + 1')).toThrowError()
  expect(() => calculator('11 + 1')).toThrowError()
  expect(() => calculator('1 + 11')).toThrowError()
  expect(() => calculator('XI + I')).toThrowError()
  expect(() => calculator('I + XI')).toThrowError()
  expect(() => calculator('1 + V')).toThrowError()
  expect(() => calculator('I + 1')).toThrowError()
  expect(() => calculator('5 / 0')).toThrowError()
  expect(() => calculator('0 + 1')).toThrowError()
  expect(() => calculator('1 + 0')).toThrowError()
})

test('New cases', () => {
  expect(calculator('10 * 10')).toBe('100')
  expect(calculator('1 * 10')).toBe('10')
  expect(calculator('X * X')).toBe('C')
  expect(calculator('X * I')).toBe('X')
  expect(calculator('X / X')).toBe('I')
  expect(calculator('X / II')).toBe('V')
  expect(calculator('VII * VIII')).toBe('LVI') //7 * 8 = 56
  expect(calculator('VI * IX')).toBe('LIV') //6 * 9 = 54
  expect(() => calculator('6 / 0')).toThrowError()
})
