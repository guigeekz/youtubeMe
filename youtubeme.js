/******************
** CHROME CONFIG **
******************/

chrome.storage.sync.get("displayYoutubeIcon", function(data) {
		if (data['displayYoutubeIcon'] == null) {
			chrome.storage.sync.set({'displayYoutubeIcon': true});
		}
		if (data['displayYoutubeIcon'] == true) {
			if (!i_m_into_popup()) {
				$("body").append("<div class='youtubemeBloc youtubeArrow'><img class='youtubemeOpen' src='https://openmerchantaccount.com/img/youtubeme_icone.png'></img></div>");
				$("body").append("<div class='youtubemeBloc youtubeIframe'><div class='searchYoutubeMeInput'><img class='youtubeme_logo' src='https://openmerchantaccount.com/img/youtubeme.png'></img><input type='text' placeholder='Search on youtube..'></input><img class='arrowDownImg' src='https://openmerchantaccount.com/img/youtubeme_close_button.png'></img></img><img class='closeImg' src='https://openmerchantaccount.com/img/youtubeme_down_arrow.png'></img></div><div class='youtubeMeSearch'><p class='youtubeMeSearchTitle'>Latest searches </p><div class='youtubeMeSearchBloc'><ul></ul></div><div class='youtubeMePresentation'><img class='open_youtubeme_popup' src='https://cdn0.iconfinder.com/data/icons/the-essential/30/previous_arrow-512.png'></img></div></div></div>");
			}
		}
	});


/******************
** LATEST SEARCH **
******************/

chrome.storage.sync.get(null, function(items) {
	var reverse_keys = new Array();

  for (var key in items) {
  	reverse_keys.unshift(key);
  }

	for (var c = reverse_keys.length, n = 0; n < c; n++) {
		if (items[reverse_keys[n]] != true) {
			$(".youtubeMeSearch ul").append("<li><span>" + items[reverse_keys[n]] + "</span></li>");
		}
	}
});


/********************
** YOUTUBEME EVENT **
********************/

$(document).on('click', ".closeImg", function() {
	$(".youtubeIframe").hide();
	$(".youtubeArrow").show('slow');
	if ($(".youtubeIframeInside").length) {
		$(".youtubemeBloc").append("<img id='youtubemeVideoButton' class='youtubemePauseImg' src='https://openmerchantaccount.com/img/pause_youtubeme.png'></img>")
	}
});

$(document).on('click', ".arrowDownImg", function() {
	if ($("#youtubeMeIframe").length > 0) {
		$("#youtubeMeIframe").remove();
	}
	$(this).hide();
	$(".youtubeMePresentation").show();
	$(".youtubeMeSearch").show('slow');
});

$(document).on("click", ".youtubemeOpen", function() {
	if ($("#youtubeMeIframe").length <= 0) {
		$(".arrowDownImg").hide();
	}
	if ($(".youtubemePauseImg").length) {
		$(".youtubemePauseImg").remove();
	}
	if ($(".youtubemePlayImg").length) {
		$(".youtubemePlayImg").remove();
	}
	$(".youtubeIframe").show('slow');
	$(".youtubeArrow").hide();
});


if (!i_m_into_popup()) {
	$(document).on('click', '.youtubemePauseImg', function() {
		toggleVideo('pause');
		$(this).addClass('youtubemePlayImg');
		$(this).removeClass('youtubemePauseImg');
		$(this).attr('src', 'https://openmerchantaccount.com/img/play_youtubeme.png');
	});

	$(document).on('click', '.youtubemePlayImg', function() {
		toggleVideo('play');
		$(this).addClass('youtubemePauseImg');
		$(this).removeClass('youtubemePlayImg');
		$(this).attr('src', 'https://openmerchantaccount.com/img/pause_youtubeme.png');
	});
}

$(document).on('click', '.youtubeMeSearch ul li', function() {
		var search = $(this).children('span').html();
		launchYoutubeIframe(search); 
});

$(document).keydown(function(e){
	if (e.keyCode == 27) {
		$(".youtubeIframe").hide();
		$(".youtubeArrow").show('slow');
	}

	if (e.keyCode == 8) {
		if ($("#youtubeMeIframe").length > 0) {
			if ($(".searchYoutubeMeInput input").val().length <= 1) {
				$("#youtubeMeIframe").remove();
		  	$(".youtubeMePresentation").show();
		  	$(".youtubeMeSearch").show();
		  	$(".searchYoutubeMeInput .arrowDownImg").hide();
			}  		
	  }
	}

  if (e.keyCode == 13) {
  	if ($(".searchYoutubeMeInput input").is(":focus")) {
  		launchYoutubeIframe("");
  	}
  }
});


/****************
* LAUNCH IFRAME *
****************/

function launchYoutubeIframe(search) {
	if ($("#youtubeMeIframe").length > 0) {
		$("#youtubeMeIframe").remove();
		}
	saveChanges();
	$(".youtubeMePresentation").hide();
	$(".youtubeMeSearch").hide();
	$(".arrowDownImg").show();
	$('<iframe />');

	if (search.length > 0) {
		link ='https://www.youtube.com/embed?listType=search&list=' + search + '&enablejsapi=1';
	}
	else {
		link = 'https://www.youtube.com/embed?listType=search&list=' + $(".searchYoutubeMeInput input").val() + '&enablejsapi=1';
	}
	
	if (i_m_into_popup()) {
   iframe_width = $(document).width() - 4;
	 iframe_height = $(document).height() - 20;
	}
	else {
		iframe_width = 397;
		iframe_height = 220;
	}


	$('<iframe />', {
      name: 'frame1',
      id: 'youtubeMeIframe',
      class: 'youtubeIframeInside',
      width: iframe_width,
			height: iframe_height,
      src: link,
      allowFullScreen: true
  }).appendTo('.youtubeIframe');
}

/****************
**** STORAGE ****
****************/

function saveChanges() {
  var youtubeSearch = $(".searchYoutubeMeInput input").val();

  if (youtubeSearch.length > 0) {
  	var id = (Math.floor(Math.random() * 99999999) + 1).toString();
  	var dt = new Date();
		var id = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ":" + dt.getMilliseconds() + " " + dt.getUTCDate() + "/" + dt.getUTCMonth() + "/"  + dt.getUTCFullYear();

		var searchStorage = {};

		searchStorage[id] = youtubeSearch;
	  chrome.storage.sync.set(searchStorage);
	  $(".youtubeMeSearch ul").prepend("<li><span>" + youtubeSearch + "</span></li>");
  }
}



/****************
***** POPUP *****
****************/

function i_m_into_popup() {
	return ($("body.youtubeme_popup").length)
}

if (i_m_into_popup) {
	$(document).on('click', ".open_youtubeme_popup", function() {
		$(".closeImg").trigger('click');
		window.open(chrome.extension.getURL('youtubeme_popup.html'), "_blank", 'menubar=no, scrollbars=no, top=100, left=100, width=400, height=260');
	});
}


/******************
** POPUP RESIZE **
******************/

$(document).ready(function(){
	if (i_m_into_popup) {
		var resizeTimer = null;

    $(window).resize(function() {
    	var youtubeMeIframe = $("#youtubeMeIframe");
    	var youtubeMeSearch = $(".youtubeMeSearch");
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            windowWidth = $(window).width();

            if (youtubeMeIframe.length) {
	            youtubeMeIframe.css("height", youtubeMeIframe.parent().height() - 40);
	            youtubeMeIframe.css("width", 	youtubeMeIframe.parent().width() - 10);
            }
            if (youtubeMeSearch.length) {
	            youtubeMeSearch.css("height", $(document).height() - 40);
	            youtubeMeSearch.css("width", 	$(document).width() - 10);
            }

        }, 75);

    }).trigger("click");
	}
});

/**************************
**** PLAY/PAUSE BUTTON ****
**************************/

function toggleVideo(state) {
  if(state == 'pause'){
    var t = document.getElementById('youtubeMeIframe').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }
  else {
    document.getElementById('youtubeMeIframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  }
}

