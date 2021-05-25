const validate = require('./validate')
describe('validate', () => {
  it('Без валидации', () => {
    expect(validate({ name: 'Alex', age: 41, city: null }, {})).toEqual({
      result: true,
      errors: [],
    })

    expect(
      validate(
        { name: 'Alex', age: 41, city: null },
        { name: {}, age: {}, city: {} },
      ),
    ).toEqual({ result: true, errors: [] })
  })

  it('isString', () => {
    expect(validate({ name: 'Alex' }, { name: { isString: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ name: '' }, { name: { isString: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ name: NaN }, { name: { isString: true } })).toEqual({
      result: false,
      errors: [{ value: NaN, field: 'name', rule: 'isString' }],
    })

    expect(validate({ name: 3 }, { name: { isString: true } })).toEqual({
      result: false,
      errors: [{ value: 3, field: 'name', rule: 'isString' }],
    })
  })

  it('isNumber', () => {
    expect(validate({ age: 10 }, { age: { isNumber: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ age: 0 }, { age: { isNumber: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ age: NaN }, { age: { isNumber: true } })).toEqual({
      result: false,
      errors: [{ value: NaN, field: 'age', rule: 'isNumber' }],
    })

    expect(validate({ age: '4' }, { age: { isNumber: true } })).toEqual({
      result: false,
      errors: [{ value: '4', field: 'age', rule: 'isNumber' }],
    })
  })

  it('isBoolean', () => {
    expect(validate({ value: true }, { value: { isBoolean: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ value: false }, { value: { isBoolean: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ value: 1 }, { value: { isBoolean: true } })).toEqual({
      result: false,
      errors: [{ value: 1, field: 'value', rule: 'isBoolean' }],
    })
  })

  it('min/max', () => {
    expect(validate({ age: 10 }, { age: { min: 5, max: 20 } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ age: 10 }, { age: { min: 10, max: 10 } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ age: 11 }, { age: { min: 10, max: 10 } })).toEqual({
      result: false,
      errors: [{ value: 11, field: 'age', rule: 'max' }],
    })

    expect(validate({ age: 9 }, { age: { min: 10, max: 10 } })).toEqual({
      result: false,
      errors: [{ value: 9, field: 'age', rule: 'min' }],
    })

    expect(validate({ age: NaN }, { age: { min: 10, max: 10 } })).toEqual({
      result: false,
      errors: [
        { value: NaN, field: 'age', rule: 'min' },
        { value: NaN, field: 'age', rule: 'max' },
      ],
    })
  })

  it('minLength/maxLength', () => {
    expect(
      validate({ name: 'Alex' }, { name: { minLength: 3, maxLength: 5 } }),
    ).toEqual({ result: true, errors: [] })

    expect(
      validate({ name: 'Alex' }, { name: { minLength: 4, maxLength: 4 } }),
    ).toEqual({ result: true, errors: [] })

    expect(
      validate({ name: 1 }, { name: { minLength: 4, maxLength: 4 } }),
    ).toEqual({
      result: false,
      errors: [
        { value: 1, field: 'name', rule: 'minLength' },
        { value: 1, field: 'name', rule: 'maxLength' },
      ],
    })

    expect(
      validate({ name: 'Alex1' }, { name: { minLength: 4, maxLength: 4 } }),
    ).toEqual({
      result: false,
      errors: [{ value: 'Alex1', field: 'name', rule: 'maxLength' }],
    })

    expect(
      validate({ name: 'Ale' }, { name: { minLength: 4, maxLength: 4 } }),
    ).toEqual({
      result: false,
      errors: [{ value: 'Ale', field: 'name', rule: 'minLength' }],
    })
  })

  it('required', () => {
    expect(validate({ value: true }, { value: { required: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ value: false }, { value: { required: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({ value: '' }, { value: { required: true } })).toEqual({
      result: true,
      errors: [],
    })

    expect(validate({}, { value: { required: true } })).toEqual({
      result: false,
      errors: [{ value: undefined, field: 'value', rule: 'required' }],
    })

    expect(validate({ value: null }, { value: { required: true } })).toEqual({
      result: false,
      errors: [{ value: null, field: 'value', rule: 'required' }],
    })
  })

  it('isString and required', () => {
    expect(
      validate({ name: 'Alex' }, { name: { isString: true, required: true } }),
    ).toEqual({ result: true, errors: [] })

    expect(
      validate({ name: null }, { name: { isString: true, required: true } }),
    ).toEqual({
      result: false,
      errors: [{ value: null, field: 'name', rule: 'required' }],
    })
  })

  it('isString, but not required', () => {
    expect(validate({}, { name: { isString: true } })).toEqual({
      result: true,
      errors: [],
    })
  })

  it('isNumber, but not required', () => {
    expect(validate({}, { name: { isNumber: true } })).toEqual({
      result: true,
      errors: [],
    })
  })

  it('isEmail', () => {
    expect(
      validate(
        { email: 'mail@example.com' },
        { naemailmemaile: { isEmail: true } },
      ),
    ).toEqual({ result: true, errors: [] })

    expect(
      validate(
        { email: 'fred-cooper@mail.spb.com' },
        { email: { isEmail: true } },
      ),
    ).toEqual({ result: true, errors: [] })

    expect(
      validate({ email: 'example.com' }, { email: { isEmail: true } }),
    ).toEqual({
      result: false,
      errors: [{ value: 'example.com', field: 'email', rule: 'isEmail' }],
    })

    expect(validate({ email: 'pix@' }, { email: { isEmail: true } })).toEqual({
      result: false,
      errors: [{ value: 'pix@', field: 'email', rule: 'isEmail' }],
    })
  })

  it('My cases', () => {
    expect(
      validate(
        { name: 'Alex', age: 1000, city: null },
        { age: { min: 1002, max: 1003 } },
      ),
    ).toEqual({
      result: false,
      errors: [{ field: 'age', value: 1000, rule: 'min' }],
    })
  })
})
