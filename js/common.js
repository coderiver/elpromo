$(document).ready(function() {

wnd = $(window);

function sizer () {
	var sizer = $('.js-page');
	var sizer_in = sizer.find('.page__in');
	wnd_height = wnd.height();
	sizer.height(wnd_height);
	sizer_in.height(wnd_height - 120);
}
sizer();

wnd.resize(function(){
	sizer();
});

//nav
function nav () {
	var el = $('.js-nav');
	btn = el.find('a');
	btn.on('click', function(){
		var attr = $(this).attr('href');
		var top = $(''+attr).offset().top;
		$('html, body').animate({scrollTop: top}, 500);			
		return false;
	});	
}
nav();

function nav_scroll () {
	var offset_top = $(window).scrollTop();
	var item_scroll = $('.js-page');
	item_scroll.each(function(){		
		var item_scroll_top = $(this).offset().top;
		if (offset_top >= item_scroll_top) {
			var item_el = $(this).attr('id');
			item_el = '#' + item_el;
			var link_el = $('.js-nav a');
			link_el.each(function(){	
				var link_item = $(this).attr('href');
				if (item_el == link_item) {
					link_el.removeClass('is-active');
					$(this).addClass('is-active');
				};
			});
		};
		var wnd_height = wnd.height();
		if (offset_top >= (item_scroll_top + wnd_height/2)) {
			$(this).next().addClass('is-scrolltop');
		}
		else {
			$(this).next().removeClass('is-scrolltop');
		};
	});
}
nav_scroll();

//tabs
function tabs() {
  $(".js-lyrics").each(function(){
    var tabs_btn = $(this).find('.lyrics__songs li');
    var tabs_container = $(this).find('.lyrics__text-in');
    var tabs_item = $(this).find('.lyrics__text-item');
    tabs_item.hide();
    tabs_item.first().show();
    tabs_btn.on('click', function() {
	    if (!$(this).hasClass('is-active')) {
	    	var id = $(this).attr('data-item');
		    tabs_btn.removeClass("is-active");
		    $(this).addClass("is-active");
		    tabs_item.fadeOut();
		    $('#'+id).fadeIn();
	    	return false;
	    };
    });
  });

  var btn_scr_up = $('.lyrics__text-up');
  var btn_scr_down = $('.lyrics__text-down');
  btn_scr_up.on('click', function(){
  	$(this).parent().find('.content').animate({scrollTop: "-=190px"}, 300);
  });
  btn_scr_down.on('click', function(){
  	$(this).parent().find('.content').animate({scrollTop: "+=190px"}, 300);
  });
}
tabs();

$('div[data-type="background"]').each(function(){
  var $bgobj = $(this); // создаем объект
  $(window).scroll(function() {
    var yPos = -($(window).scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент 
    // Присваиваем значение background-position
    var coords = 'center '+ yPos + 'px';
    // Создаем эффект Parallax Scrolling
    $bgobj.css({ backgroundPosition: coords });
  });
});

//window scroll
$(window).scroll(function(){
	var offset_top = $(window).scrollTop();
	var nav_el = $('.js-menu');
	if (nav_el.length) {
		var nav_top = nav_el.offset().top;
		if (offset_top > nav_top) {nav_el.addClass('is-fixed');}
		else{nav_el.removeClass('is-fixed');};
	};
	nav_scroll();
});

});