
'use strict';

var document_timeout;
var document_duration = 400;

var feature_busy = true;
var feature_threshold = 1000;
var feature_direction = 'down';
var feature_duration = 800;

var system_delay = 1000;
var system_duration = 600;
var system_touch = {};

var filter_tag;
var filter_visible = 0;

var grid_count;
var grid_column;
var grid_visible;
var grid_override;
var grid_content = $();

var content_display;

var scroll_offset = 200;
var scroll_duration = 400;
 
var idle_timeout;
var idle_delay = 3000;


function init() {
	'use strict';
	document_init();
	header_init();
	share_init();
	if ($('html').is('.page_index, .page_about, .page_work, .page_journal, .page_news, .page_dev')) {
		system_init();
	}
	if ($('html').is('.page_project, .page_news')) {
		filter_init();
	}
	if ($('html').is('.page_project')) {
		grid_init();
	}
	if ($('html').is('.page_news')) {
		list_init();
		search_init();
	}
	if ($('html').is('.page_journal')) {
		cover_init();
	}
	if ($('html').is('.page_about, .page_work, .page_journal')) {
		scroll_init();
	}
	if ($('html').is('.page_index, .page_work, .page_news, .page_journal')) {
		video_init();
	}
	image_init();
	$('html').removeClass('status_init');
}
$(init);

/* --- DOCUMENT --- */

function document_init() {
	$(window).on('resize', function() {
		clearTimeout(document_timeout);
		$('html').addClass('status_resize');
		document_timeout = setTimeout(function(){ 
			$('html').removeClass('status_resize'); 
		}, document_duration);
	});
	$('.toggle').on('click', function() {
		if ($('html').hasClass('display_nav')) {
			$('html').removeClass('display_nav');
		} else {
			$('html').addClass('display_nav');
		}
	});
	$(window).on('mousemove touchstart press wheel', function() {
		clearTimeout(idle_timeout);
		$('html').removeClass('status_idle');
		idle_timeout = setTimeout(function(){ 
			$('html').addClass('status_idle'); 
		}, idle_delay);
	}).trigger('wheel');
	$('.src').on('wheel', function(event){
		var this_target = $('.target').scrollTop() + (event.originalEvent.deltaY);
		$('.target').scrollTop(this_target);
	});
	$(document).on('fullscreenchange webkitfullscreenchange', function() {
		$('html').toggleClass('status_fullscreen');
	});
	$(window).on('resize scroll', document_viewport).trigger('scroll');
	$('.container').on('scroll', document_viewport);
}

function document_viewport() {
	
	//visualViefport not available in Firefox
	if (window.visualViewport) {
		document.body.style.setProperty('--viewport_height', window.visualViewport.height + 'px');
	} else {
		document.body.style.setProperty('--viewport_height', $(window).height() + 'px');
	}
	
}

/* --- HEADER --- */

function header_init() {
	var this_url;

	$('header a.filter').on('click', function() {
		if ($('html').hasClass('display_filter')) {
			$('html').removeClass('display_filter');
            if ($('html').hasClass('page_project')) {
                grid_process();
            }
		} else {
			$('html').addClass('display_filter');
			if ($('html').hasClass('page_project')) {
                grid_override = 2;
                grid_process();
            }
		}
	});

	$('header a.info').on('click', function() {
		this_url = location.href.replace(/\/(short|long)/g, '');
		if ($('html').is('.view_short, .view_long')) {
			$('html').removeClass('view_short view_long').addClass('view_system');
		} else {
			$('html').removeClass('view_system').addClass('view_short');
			this_url += '/short';
		}
		history.replaceState({}, {}, this_url);
	});
	$('header a.read').on('click', function() {
		this_url = location.href.replace(/\/(short|long)/g, '');
		if ($('html').hasClass('view_short')) {
			$('html').removeClass('view_short').addClass('view_long');
			this_url += '/long';
		} else {
			$('html').removeClass('view_long').addClass('view_short');
			this_url += '/short';
		}
		history.replaceState({}, {}, this_url);
	});
    $('header a.subscribe').on('click', function() {
        if ($('html').hasClass('view_subscribe')) {
            $('html').removeClass('view_subscribe');
        } else {
            $('html').addClass('view_subscribe');
            $('html').removeClass('display_filter');
        }
	});
    $('header a.award').on('click', function() {
		this_url = location.href.replace(/\/award/g, '');
        if ($('html').hasClass('view_award')) {
            $('html').removeClass('view_award');
        } else {
            $('html').addClass('view_award');
			this_url += '/award';
        }
		history.replaceState({}, {}, this_url);
    });
	$('header').on('click', 'a.read, a.subscribe, a.award', function() {
		scroll_helper();
	});
}

/* --- system --- */

function system_init() {
	
	$('section.system').each(function() {
		var this_system = $(this);
		this_system.find('.count').attr('data-total', this_system.children('.item').length);
		this_system.children('.item').first().addClass('display');
		this_system.find('.position a').first().addClass('selected');

		var this_video = this_system.children('.item').children('video + aside').length;
		if (this_video > 0) {
			this_system.addClass('system_video');
		}

	})

	$('section.system > .control a').on('click', function() {
		var this_system = $(this).closest('.system');
		if ($(this).hasClass('next')) {
			system_display(this_system, 'next');
		} else if ($(this).hasClass('prev')) {
			system_display(this_system, 'prev');
		}
	});

	$('section.system.full').bind('mousewheel DOMMouseScroll', function(event) {
		var this_system = $(this).closest('.system');
		var this_delta;
		event = event.originalEvent || event;
		if (event.detail !== undefined && event.detail !== null && event.detail !== 0) {
			this_delta = event.detail * -40; // firefox 
		} else if (event.deltaY !== undefined && event.deltaY !== null) {
			this_delta = event.deltaY * -40; // chrome & safari
		} else if (event.wheelDelta !== undefined && event.wheelDelta !== null) {
			this_delta = event.wheelDelta / 3; // msie
		}
		if (Math.abs(this_delta) > feature_threshold) {
			if (this_delta > 0) {
				system_display(this_system, 'prev');
			} else {
				system_display(this_system, 'next');
			}
		}
	});

	$('section.system').bind('touchmove', function(event) {
		var this_touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		var this_pos = { x: this_touch.pageX, y: this_touch.pageY };
		if (typeof system_touch.first === 'undefined') system_touch.first = this_pos;
		system_touch.last = system_touch.now;
		system_touch.now = this_pos;
	});

	$('section.system').bind('touchend', function() {
		var this_system = $(this).closest('.system');
		var this_touch = help_touchattribute(system_touch.first, system_touch.last);
		if (this_touch.distance < 40) return;
		if (this_touch.direction === 'down' || this_touch.direction === 'left') {
			system_display(this_system, 'prev');
		} else {
			system_display(this_system, 'next');
		}
		system_touch = {};
	});

	if ($('html').hasClass('page_index') == true) {
		$('section.system .position a').on('click', function() {
			var this_system = $(this).closest('.system');
			var this_index = $(this).index();
			system_display(this_system, '', this_index);
		});
	}

	if ($('html').hasClass('page_about') == true) {
		setInterval(function(){ 
			$('section.system .control a.next').trigger('click');
		}, system_delay);
	}

	if ($('html').hasClass('page_journal') == true) {
		var this_container = $('article.container');
		var this_system = $('section.system');
		var this_picture = this_container.find('.text picture');
		this_container.on('scroll', function() {
			var this_target = $(window).scrollTop() + ($(window).height() / 2);
			var this_index = 0;
			this_picture.each(function() {
				var this_top = $(this).offset().top;
				var this_bottom = this_top + $(this).height();
				if ((this_target > this_top) && (this_target < this_bottom)) {
					system_display(this_system, '', this_index);
				}
				this_index = this_index + 1;
			})
		})
	}	
	
}

function system_display(arg_system, arg_direction, arg_index) {
	var this_system = arg_system;
	if (this_system.hasClass('status_busy')) { return; };
	var this_src = this_system.find('.item'); 
	var this_position = this_system.find('.position a');
	var current_index = this_src.filter('.display').index();
	if (arg_index !== undefined) {
		var this_index = arg_index;
		if (this_index > current_index) {
			this_system.removeClass('prev').addClass('next');
		} else if (this_index < current_index) {
			this_system.removeClass('next').addClass('prev');
		}
	} else if (arg_direction !== undefined) {
		var this_direction = arg_direction;
		var this_total = this_src.length;
		var this_index = this_src.filter('.display').index();
		if (this_direction == 'next') {
			this_system.removeClass('prev').addClass('next');
			this_index = this_index + 1;
			if (this_index === this_total) {
				this_index = 0;
			}
		} else {
			this_system.removeClass('next').addClass('prev');
			this_index = this_index - 1;
			if (this_index < 0) {
				this_index = this_total - 1;
			}
		}
	}
	if (this_index === current_index) { return; };
	if ($('html').hasClass('status_intro')) {
		$('html').removeClass('status_intro');
	}
	this_system.addClass('status_busy');
	var current_video = this_src.eq(current_index).find('video');
	if (current_video.length > 0) {
		video_pause(current_video);
		this_system.removeClass('status_video');
    }
    
    this_src.filter('.display').addClass('last').removeClass('display');

	this_src.eq(this_index).addClass('display');
	this_position.removeClass('selected').eq(this_index).addClass('selected');
	this_system.find('.count').attr('data-index', this_index + 1);
	var this_video = this_src.eq(this_index).find('video');
	if (this_video.length > 0 && this_video.next('.control').length === 0) {
		video_play(this_video); // plays background
	}

	if (this_video.length > 0) {
		
		if (this_video.next('.control').length === 0) {
			video_play(this_video); // plays background
		} else {
			this_system.addClass('status_video');
		}
		
	}

	setTimeout(function() { 
        this_system.find('.item').filter('.last').removeClass('last');
        this_system.removeClass('prev next status_busy'); 
    }.bind(this_system), system_duration);
}

/* --- FILTER --- */

function filter_init() {
	
	filter_process();
	
	$('aside.filter .container a').on('click', function() {
		$(this).toggleClass('selected');
		filter_process();
	});
	
	$('aside.filter a.reset').on('click', function() {
		$('aside.filter .container a').removeClass('selected');
		filter_process();
	});

	$(window).on('resize', function() {
		if ($('header a.filter:visible').length) {
			if (filter_visible == 0) {
				filter_visible = 1;
				$('input#query').val('');
				$('.search button').click();
				$('html').removeClass('display_search');
			}
		} else {
			if (filter_visible == 1) {
				filter_visible = 0;
				$('.filter a.reset').click();
				$('html').removeClass('display_filter');
			}
		}
	});

}

function filter_process() {
	filter_tag = new Array();
	$('aside.filter .container a.selected').each(function() {
		var this_tag = parseInt($(this).attr('data-tag-id'));
		filter_tag.push(this_tag);
	});

	if ($('html').hasClass('page_project') == true) {
		if (filter_tag.length > 0) {
			$('html').addClass('status_filter');
			$('.data article').removeClass('display').each(function() {
				var this_tag = JSON.parse($(this).attr('data-tag'));
				var this_match = help_arraymatch(filter_tag, this_tag);
				if (this_match.length > 0) {
					$(this).addClass('display');
				}
			});
		} else {
			$('html').removeClass('status_filter');
			$('.data article').addClass('display');
		}
		grid_process();
	} else if ($('html').hasClass('page_news')) {
		if (filter_tag.length > 0) {
			$('html').addClass('status_filter');
			$('.list article').removeClass('display').each(function() {
				var this_tag = JSON.parse($(this).attr('data-tag'));
				var this_match = help_arraymatch(filter_tag, this_tag);
				if (this_match.length > 0) {
					$(this).addClass('display');
				}
			});
		} else {
			$('html').removeClass('status_filter');
			$('.list article').addClass('display');
		}
	};

	filter_tag = new Array();
	$('aside.filter .container a.selected').each(function() {
		var this_uri = $(this).attr('data-tag-uri');
		filter_tag.push(this_uri);
	});

	var this_url = location.href.replace(/\/filter:[0-9a-z-.]*$/g, '');
	if (filter_tag.length > 0) {
		this_url += '/filter:' + filter_tag.join('.');
	}
	history.replaceState({}, {}, this_url);
}

/* --- SEARCH --- */

function search_init() {
	$('div.search button').on('click', function(event) {
		event.preventDefault();
		var $search;
		$search = $(this).closest('.search');
		search_process($search);
	});
	$('div.search input').on('keypress', function(event) {
		
	});

	$('div.search input').on('keyup input', function(){
		var $search;
			$search = $(this).closest('.search');
			search_process($search);
	});

}

function search_process(search) {
	var $search;
	var query;
	$search = $(search);
	query = $search.find('#query').val();
	if (query == '') {
		$('.list article').addClass('display');
		return;
	}
	$.post(ROOT_URL + '/src/include/data.php' + '?' + $.param({ func: 'news_search', }), { 
		query: query
	}, function(res) {
		var news_array = res;
		$('.list article').removeClass('display');
		$.each(news_array, function(_, news) {
			$('.list article[data-id=' + news.id + ']').addClass('display');
		});
	}, 'json');
}

/* --- GRID --- */

function grid_init() {
	$(window).on('resize', function() {
		grid_process();
	});
	grid_process();
}

function grid_process() {
	grid_column = $('.grid .column');
	var this_content = $('.data article.display');
	if (typeof grid_override !== 'undefined') grid_visible = grid_visible.slice(0, grid_override);
	else grid_visible = grid_column.filter(':visible');
	if (help_objectcompare(this_content, grid_content) && grid_visible.length === grid_count.length) { return; }
	grid_content = this_content;
	grid_count = Array.apply(null, Array(grid_visible.length)).map(Number.prototype.valueOf, 0);
	if (typeof grid_override !== 'undefined') grid_column.slice(0, grid_override).empty();
	else grid_column.empty();
	grid_content.each(function() {
		var this_column = help_arraymin(grid_count);
		var this_size = 1.5;
		if ($(this).hasClass('small')) {
			this_size = 1;
		} else if ($(this).hasClass('large')) {
			this_size = 2;
		}
		grid_count[this_column] += this_size;
		$(this).clone().appendTo(grid_visible[this_column]);
	});
	grid_override = undefined;
}

/* --- LIST --- */

function list_init() {
	$('.back').on('click', function(event) {
		event.preventDefault();
		if ($('html').hasClass('view_article')) {
			$('html').removeClass('view_article').addClass('view_list');
		}
	});
	$('article.selected a').on('click', function(event) {
		event.preventDefault();
		if ($('html').hasClass('view_list')) {
			$('html').removeClass('view_list').addClass('view_article');
		}
	});
	$('aside.find > a.sort').on('click', function(event) {
		event.preventDefault();
		if ($('html').hasClass('display_sort')) {
			$('html').removeClass('display_sort');
		} else { 
			$('html').removeClass('display_search').addClass('display_sort');
		}
	});
	$('aside.find > a.search').on('click', function(event) {
		event.preventDefault();
		if ($('html').hasClass('display_search')) {
			$('html').removeClass('display_search');
		} else { 
			$('html').removeClass('display_sort').addClass('display_search');
			$('input#query').focus();
		}
	});
	$('aside.find div.sort').on('click', function(event) {
		event.preventDefault();
		$('aside.find div.sort a').toggleClass('selected');
		$('.container > .list article').each(function() {
			$(this).prependTo($('.container > .list'))
		});
	});
}

/* --- COVER --- */

function cover_init() {
	var this_container = $('article.container');
	var this_picture = $('section.cover picture img');
	var this_height = this_picture.height() - parseInt($('section.system').css('top'));
	this_container.on('scroll', function(event) {
		var this_scroll = this_container.scrollTop();
		this_scroll = Math.max(0, this_scroll);
		var this_progress = ((1 - Math.min(1, (this_scroll / this_height).toFixed(2))) * 0.8);
		this_picture.css('opacity', this_progress);
	})
	$(window).on('resize', function() {
		this_height = this_picture.height() - parseInt($('section.system').css('top'));
	});
}

/* --- IMAGE --- */
function image_init() {
	image_prepare();
}

function image_prepare() {
	// loop through images
	$('img[data-src]').each(function() {
		var $img;

		// cache element
		$img = $(this);

		// skip if loaded or in progress
		if ($img.data('image_load') == true) return;

		// load
		image_load($img);
	});
}

function image_load(img) {
	var $img;
	
	// cache element
	$img = $(img);

	$img.data('image_load', true);

	var xhr = new XMLHttpRequest();
	xhr.open('GET', $img.attr('data-src'));
	xhr.responseType = 'blob';
	xhr.onprogress = function(event) {
		$img.next('.load').css('--load', ((event.loaded / event.total) * 100) + '%');
	};
	xhr.onload = function(event) {
		$img.next('.load').css('--load', '100%');
		if (event.currentTarget.status == 404) {
			$img.addClass('error');
			return;
		}
		setTimeout(function() {
			$img.attr('src', URL.createObjectURL(event.srcElement.response));
			$img.addClass('complete');
		}, 1);
		setTimeout(function() {
			//$img.next('.load').remove();
		}, 800);
	};
	xhr.send();
}

/* --- VIDEO --- */

function video_init() {
	// prepare
	video_prepare();

	// control
	video_control();
}

function video_prepare() {
	// loop through hls elements
	$('video').each(function() {
		var $video;

		// cache element
		$video = $(this);

		// hls playback
		if ($video.attr('src').indexOf('m3u8') !== -1) {
			// load
			video_load($video);
		}
		// standard playback
		else {
			// set ready status
			video_status($video, 'ready');

			// listen
			video_listen($video);
		}
	});
}

function video_control() {
	// listen for click event
	$('video + .control a').on('click', function() {
		var $a,
			$video;
		var action;

		// cache elements
		$a = $(this);
		$video = $a.parent().prev('video');

		// store control action
		action = $a.attr('class').split(' ')[0];

		// determine action
		switch (action) {
			case 'state':
				// toggle state
				if (!$a.hasClass('active')) video_play($video);
				else video_pause($video);
			break;
			case 'audio' :
				// toggle audio
				video_audio($video);
			break;
			case 'fullscreen' :
				// toggle fullscreen
				video_fullscreen($video);
			break;
		}
	});

	// listen for click event
	$('video + .control .playback').on('click', function(event) {
		var $playback,
			$video;
		var offset;

		// cache elements
		$playback = $(this);
		$video = $playback.parent().prev('video');
		
		// determine scrub offset
		offset = ((event.pageX - $playback.offset().left) / $playback.width());

		// scrub
		video_scrub($video, offset);
	});
}

function video_load(video) {
	var $video;
	var player,
		src;
	
	// cache element
	$video = $(video);

	// hls supported enabled
	if (Hls.isSupported()) {
		// initalise player
		player = new Hls();

		// store video src
		src = $video.attr('src');

		// build player data
		player.loadSource(src);
		player.attachMedia($video[0]);

		// listen for parse event
		player.on(Hls.Events.MANIFEST_PARSED, function() {
			// set ready status
			video_status($video, 'ready');

			// listen
			video_listen($video);
		});
	}
	// native hls support enabled
	else if ($video[0].canPlayType('application/vnd.apple.mpegurl')) {
		// listen for loadedmetadata event
		$video.on('loadedmetadata', function() {
			// set ready status
			video_status($video, 'ready');

			// listen
			video_listen($video);
		});
	}
	// no hls support
	else {
		console.warn('HLS not supported');
	}
}

function video_play(video) {
	var $video;
	
	// cache elements
	$video = $(video);

	// set load status
	video_status($video, 'load');

	// trigger play
	$video[0].play();
}

function video_pause(video) {
	var $video;

	// cache element
	$video = $(video);

	// trigger pause
	$video[0].pause();
}

function video_audio(video) {
	var $video;
	
	// cache element
	$video = $(video);

	// toggle muted
	$video.prop('muted', !$video.prop('muted'));
}

function video_scrub(video, offset) {
	var $video;

	// cache element
	$video = $(video);

	// determine actual duration offset
	offset = ($video[0].duration * offset);

	// set current time
	$video.prop('currentTime', offset);
}

function video_fullscreen(video) {
	var $video;
	
	// cache element
	$video = $(video);

	// enter fullscreen mode
	if ($video[0].requestFullscreen) $video[0].requestFullscreen();
	else if ($video[0].webkitRequestFullscreen) $video[0].webkitRequestFullscreen();
	else if ($video[0].webkitEnterFullScreen) $video[0].webkitEnterFullScreen();
}

function video_listen(video) {
	var $video,
		$control;
	
	// cache elements
	$video = $(video);
	$control = $video.next('.control');

	// listen for play event
	$video.on('play', function() {
		// set play status
		video_status($(this), 'play');

		// add active classe
		$control.find('a.state').addClass('active');
	});

	// listen for timeupdate event
	$video.on('timeupdate', function() {
		var playback;

		// calculate current playback
		playback = (($(this)[0].currentTime / $(this)[0].duration) * 100);

		// set playback var
		$control.find('.playback').css('--playback', playback + '%');
	});

	// listen for volumechange event
	$video.on('volumechange', function() {
		// toggle active class
		$control.find('a.audio').toggleClass('active');
	});

	// listen for pause event
	$video.on('pause', function() {
		// set pause status
		video_status($(this), 'pause');

		// remove active class
		$control.find('a.state').removeClass('active');
	});

	// listen for ended event
	$video.on('ended', function() {
		// reset
		video_reset($(this));
	});

	// listen for error event
	$video.on('error', function() {
		// set error status
		video_status($(this), 'error');
	});
}

function video_reset(video) {
	var $video,
		$control;

	// cache elements
	$video = $(video);
	$control = $video.next('.control');

	// scrub
	video_scrub($video, 0);

	// remove active classes
	$control.find('a').removeClass('active');

	// remove playback var
	setTimeout(function() { $control.find('.playback').removeAttr('style'); }, 100);

	// clear status
	video_status($video);
}

function video_status(video, status) {
	var $video;
	
	// cache element
	$video = $(video);

	// set status
	status = status || null;

	// remove existing status classes
	$video.removeClass(function(_, name) { 
		return (name.match(/(^|\s)status\S+/g) || []).join(' ');
	});

	// bail if empty
	if (status === null) return;

	// add status
	$video.addClass(['status', status,].join('_'));
}

/* --- SCROLL --- */

function scroll_init() {
	var this_scroll = $('.scroll');
	var this_container = this_scroll.closest('.container');
	var this_top = this_container.scrollTop();
	this_scroll.on('click', function() {
		if ($(this).hasClass('up')) {
			this_container.animate({ scrollTop: 0 }, scroll_duration);
		} else {
			var this_target = this_top + $('main').height();
			this_container.animate({ scrollTop: this_target }, scroll_duration);
		}
	});
	this_container.on('scroll', function() {
		this_top = this_container.scrollTop();
		if (this_top > (this_container[0].scrollHeight - $('main').height() - scroll_offset)  ) {
			this_scroll.addClass('up');
		} else {
			this_scroll.removeClass('up');
		}
	});
	$(window).on('resize', function() {
		scroll_helper();
	});
	scroll_helper();
}

function scroll_helper() {
	var this_scroll = $('.scroll');
	var this_container = this_scroll.closest('.container:visible');
	if (this_container.length === 0) return;
	if (this_container.height() < this_container.prop('scrollHeight')) {
		this_scroll.addClass('display');
	}
	else {
		this_scroll.removeClass('display');
	}
}


/* --- SHARE --- */

function share_init() {
	$('.share a').on('click', function() {
		var this_link = $(this);
		var this_url = encodeURIComponent(location.href);
		var this_action = this_link.attr('class');
		if (this_action == 'twitter') {
			var this_text = encodeURIComponent($('title').text());
			share_window('https://twitter.com/intent/tweet?text=' + this_text + '&url=' + this_url);
		} else if (this_action == 'facebook') {
			share_window('https://www.facebook.com/sharer/sharer.php?u=' + this_url);
		}
	});
}

function share_window(url) {
	var left = ($(window).width() / 2) - (800 / 2);
	var top = ($(window).height() / 2) - (600 / 2);
	window.open(url, '', 'location=1,status=1,scrollbars=1,width=800,height=600,top=' + top + ',left=' + left);
}

/* --- ARRAY MATCH --- */
// returns matching elements from two arrays of integers

function help_arraymatch(array_1, array_2) {
	var this_match = [];
	array_1.sort();
	array_2.sort();
	for (var this_index = 0; this_index < array_1.length; this_index++) {
        if(array_2.indexOf(array_1[this_index]) > -1){
            this_match.push(array_1[this_index]);
        }
	}
	return this_match;
}

/* --- ARRAY MIN --- */
// returns the index of the lowest value in an array of integers

function help_arraymin(array) {
    var min_value = array[0];
    var min_index = 0;
	for (var this_index = 0; this_index < array.length; this_index++) {
		if (array[this_index] < min_value) {
            min_index = this_index;
            min_value = array[this_index];
        }
    }
    return min_index;
}

/* --- OBJECT COMPARE --- */
// returns true if two objects and their contents match

function help_objectcompare(object_1, object_2) {
	if (object_1.length != object_2.length) {
		return false;
  	}
  	for (var this_index = 0; this_index < object_1.length; this_index++) {
	  	if (object_1[this_index] !== object_2[this_index]) {
		  	return false;
	  	}
  	}
  	return true;
}

/* --- TOUCH ATTRIBUTE --- */
// returns touch distance travelled and direction

function help_touchattribute(a, b) {
	var this_direction;
	if (Math.abs(b.x - a.x) > Math.abs(b.y - a.y)) {
		if (b.x > a.x) this_direction = 'right';
		else this_direction = 'left';
	}
	else if (Math.abs(b.x - a.x) < Math.abs(b.y - a.y)) {
		if (b.y > a.y) this_direction = 'down';
		else this_direction = 'up';
	}
	Math.nthroot = function(x, n) {
		var negate = (n % 2) == 1 && x < 0;
		if (negate) x = -x;
		var possible = this.pow(x, 1 / n);
		n = this.pow(possible, n);
		if (this.abs(x - n) < 1 && (x > 0 == n > 0)) return negate ? -possible : possible;
	};
	var this_distance = Math.ceil(Math.nthroot(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2), 2));
	return { direction: this_direction, distance: this_distance };
}