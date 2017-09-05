var socket = io();

// control scrolling
function scrollToBottom() {
	// Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

// connect client to server
socket.on('connect', function() {
	console.log('Connected to server');
});

// disconnect client from server
socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// runs when a new message is received from server
// renders message to screen
socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

// runs when a new location message is received from server
// renders location message to screen
socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
})

// jQuery to handle form submit
jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();
	var messageTextbox = jQuery('[name=message]')

// sends a message to server to be created
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function (){
		messageTextbox.val('');
	});
})

// jQuery to handle geolocation for location message
var locationButton = jQuery('#send-location');

locationButton.on('click', function(e) {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Could not fetch location');
	})
});