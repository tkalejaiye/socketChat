const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Albert',
			room: 'Space'
		}, {
			id: '2',
			name: 'Isaac',
			room: 'Tree'
		}, {
			id: '3',
			name: 'Buzz',
			room: 'Space'
		}];
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Test',
			room: 'Test Room'
		};
		var res = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		var user = users.removeUser('1');
		expect(user.name).toBe('Albert');
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		var user = users.removeUser('5');
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find a user', () => {
		var userId = '2';
		var user = users.getUser(userId);
		expect(user.name).toBe('Isaac');
	});

	it('should not find a user', () => {
		var userId = '4';
		var user = users.getUser(userId);
		expect(user).toNotExist();
	});



	it('should return names for space room', () => {
		var userList = users.getUserList('Space');
		expect(userList).toEqual(['Albert', 'Buzz']);
	});

})