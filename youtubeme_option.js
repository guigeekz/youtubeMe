$(document).ready(function(){
	chrome.storage.sync.get("displayYoutubeIcon", function(data) {
		if (data['displayYoutubeIcon'] == null) {
			$('.toggleYoutubemeIcon').attr('checked', true);
		}
		else if (data['displayYoutubeIcon'] == true) {
			$('.toggleYoutubemeIcon').attr('checked', true);
		}
		else {
			$('.toggleYoutubemeIcon').attr('checked', false);
		}
	});

	$('.youtubeMeOpenPopup').on('click', function() {
		window.open(chrome.extension.getURL('youtubeme_popup.html'), "_blank", 'noresize=true, menubar=no, scrollbars=no, top=100, left=100, width=400, height=260');
	});

	$('.toggleYoutubemeIcon').on('click', function() {
		if ($(this).is(':checked')) {
			chrome.storage.sync.set({'displayYoutubeIcon': true});
		}
		else {
			chrome.storage.sync.set({'displayYoutubeIcon': false});
		}
	});

});