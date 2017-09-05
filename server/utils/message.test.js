var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		var from = 'Tolu';
		var text = 'Test message';
		var message = generateMessage(from, text);

		expect(message.from).toBe(from);
		expect(message.text).toBe(text);
		expect(message.createdAt).toBeA('number');
	});

});

describe('generateLocationMessage', () => {
	it('should generate location object', () => {
		var from = 'Admin';
		var latitude = 29;
		var longitude = 0;
		var url = 'https://google.com/maps?q=29,0'
		var message = generateLocationMessage(from, latitude, longitude);

		expect(message.from).toBe(from);
		expect(message.url).toBe(url);
		expect(message.createdAt).toBeA('number');
	});
});