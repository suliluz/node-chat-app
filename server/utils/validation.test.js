const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {

  it('should reject non-string values', () => {
    var string = 1234;
    var result = isRealString(string);

    expect(result).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var string = '           ';
    var result = isRealString(string);

    expect(result).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var string = 'Marcus Marrio';
    var result = isRealString(string);

    expect(result).toBe(true);
  });

});
