var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Marrio';
    var text = 'Hello';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate corrent location object', () => {
    var from = 'TestGuy';
    var lat = 1;
    var lng = 1;
    var location = generateLocationMessage(from, lat, lng);

    expect(location.from).toBe(from);
    expect(location.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
    expect(location.createdAt).toBeA('number');

  });
});
