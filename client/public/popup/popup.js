$(document).ready(function() {
    chrome.identity.getProfileUserInfo(function(userInfo) {
        $('#userId').text(userInfo.id);
    });
	$('#checkPage').click(function() {
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.identity.getProfileUserInfo(function(userInfo) {
				$.post('http://tranquil-wildwood-15780.herokuapp.com/createUser', {
					name: 'Brian',
					userId: userInfo.id.toString()
				})
					.done(function() {
						alert('success');
					})
					.fail(function() {
						alert('failure');
					});
			});
		});
	});
});