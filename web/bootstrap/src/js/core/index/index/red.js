$(function(){
  // 第一屏满屏显示
  $("html").css("height", "100%");

  $(".content-wrapper .container-fluid").removeAttr("style");
  $(".content-wrapper .container-fluid").css("padding", "0");

  $("#btn-toggle-sidebar").css("display","none");
  // 隐藏toggle精简布局设置按钮
  $("#btn-layout-small").css("display","none");
  // 顶部导航滚动显示底部挡板效果
  $(".navbar").addClass("nav-scroll");

  window_width = $(window).width();
  $(window).on('scroll',function(){
     if(window_width > 980){
          rubik.checkScrollForParallax();
     }
  });
});

var window_width;
var rubik = {

   checkScrollForParallax: debounce(function() {

         no_of_elements = 0;
         $('.parallax').each(function() {
             var $elem = $(this);

             if(isElementInViewport($elem)){
                 var parent_top = $elem.offset().top;
                 var window_bottom = $(window).scrollTop();
                 var $image = $elem.find('img')

               oVal = ((window_bottom - parent_top) / 3);
                 $image.css('transform','translate3d(0px, ' + oVal + 'px, 0px)');
             }
           });

   }, 6)
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};


function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}
