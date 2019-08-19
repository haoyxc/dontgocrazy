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
					localStorage.setItem("userId", userInfo.id.toString())
					$.post('https://tranquil-wildwood-15780.herokuapp.com/createUser', {
						name: username,
						userId: userInfo.id.toString()
					})
						.done(function() {
							$('#errorText').css('color', 'green');
							$('#errorText').text('Connected to your account!');
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
