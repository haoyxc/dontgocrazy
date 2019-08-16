$(document).ready(function() {
	chrome.identity.getProfileUserInfo(function(userInfo) {
		$('#userId').text(userInfo.id);
	});
	$('#checkPage').click(function() {
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.identity.getProfileUserInfo(function(userInfo) {
				let username = $('#username').val().trim().split(' ')[0];
				if (username === '') {
					$('#errorText').css('color', 'red');
					$('#errorText').text('Please enter a valid name');
				} else {
					$.post('http://46de41cf.ngrok.io/createUser', {
						name: username,
						userId: userInfo.id.toString()
					})
						.done(function() {
							$('#errorText').css('color', 'green');
							$('#errorText').text('Connected to mobile!');
						})
						.fail(function() {
							$('#errorText').css('color', 'red');
							$('#errorText').text("Something went wrong")
						});
				}
			});
		});
	});
});
