const validators = require('../api/services/helpers/validators');

test('Email validator confirms valid email', () => {
  const testEmail = 'test@example.com';
  expect(validators.isNotEmpty(testEmail)).toBe(true);
  expect(validators.isEmail(testEmail)).toBe(true);
})

test('Email validator rejects invalid email', () => {
  const testEmail = 'testexample.com';
  expect(validators.isNotEmpty(testEmail)).toBe(true);
  expect(validators.isEmail(testEmail)).toBe(false);
})

test('String Validator checks for empty strings', () => {
  const test1 = ''
  const test2 = '   '
  const test3 = 'abc'
  expect(validators.isNotEmpty(test1)).toBe(false);
  expect(validators.isNotEmpty(test2)).toBe(false);
  expect(validators.isNotEmpty(test3)).toBe(true);
})

test('Username Validator works properly', () => {
  const username1 = "";
  const username2 = "1234abc";
  const username3 = "username";
  const username4 = "user_name";
  const username5 = "user.name";
  const username6 = "username123";
  expect(validators.isValidUsername(username1)).toBe(false)
  expect(validators.isValidUsername(username2)).toBe(true)
  expect(validators.isValidUsername(username3)).toBe(true)
  expect(validators.isValidUsername(username4)).toBe(true)
  expect(validators.isValidUsername(username5)).toBe(false)
  expect(validators.isValidUsername(username6)).toBe(true)
})

test('AlphaNumeric validator function works properly', () => {
  const alphaNum1 = "1234";
  const alphaNum2 = "abcd";
  const alphaNum3 = "1234abcd";
  const alphaNum4 = "1234abcd.";
  const alphaNum5 = "1234abcd_";
  expect(validators.isAlphaNumeric(alphaNum1)).toBe(true)
  expect(validators.isAlphaNumeric(alphaNum2)).toBe(true)
  expect(validators.isAlphaNumeric(alphaNum3)).toBe(true)
  expect(validators.isAlphaNumeric(alphaNum4)).toBe(false)
  expect(validators.isAlphaNumeric(alphaNum5)).toBe(false)
})


