$(function(){
  // 第一屏满屏显示
  $("html").css("height", "100%");

  $(".content-wrapper .container-fluid").removeAttr("style");
  // $(".content-wrapper .container-fluid").css("padding", "0");

  $("#btn-toggle-sidebar").css("display","none");
  // 隐藏toggle精简布局设置按钮
  $("#btn-layout-small").css("display","none");
  // 顶部导航滚动显示底部挡板效果
  $(".navbar").addClass("nav-scroll");

  $.extend({"index":index});
  var window_width = $(window).width();
  $(window).on('scroll',function(){
    //  if(window_width > 980){
      $.index.checkScrollForBgSlow();
    //  }
  });

  //==================== Intro Text Slider ========================//
  $.index.introSlider();

  //==================== Portfolio ========================//
  $.index.portfolio();
});

var index = {
  isElementInViewport: function(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
  },
  bgSlowSroll: function(){
      no_of_elements = 0;
      var ctrl =this;
      $('.parallax').each(function() {
        var $elem = $(this);

        if(ctrl.isElementInViewport($elem)){
          var parent_top = $elem.offset().top;
          var window_bottom = $(window).scrollTop();
          var $image = $elem.find('img')

          oVal = ((window_bottom - parent_top) / 3);
          $image.css('transform','translate3d(0px, ' + oVal + 'px, 0px)');
        }
      });
  },
  checkScrollForBgSlow: function(){
    var timeout, wait = 6, context = this, args = arguments;
    clearTimeout(timeout);
    var func = this.bgSlowSroll;
    timeout = setTimeout(function() {
      timeout = null;
      func.apply(context, args);
    }, wait);
    if (!timeout) func.apply(context, args);
  },
  introSlider: function(){
      $('#intro-slider').flexslider({
          animation: "fade",
          controlNav: false,
          DirectionNav: false,
          slideshowSpeed: 4000,
          animationSpeed: 600
      });
  },
  portfolio: function(){
      mixitup($('#portfoliolist'),
        {
            animation: {
                enable: false,
                effects: 'fade',
                easing: 'snap'
            },
            selectors: {
                target: '.portfolio'
            },
            classNames: {
                elementFilter: 'filter'
            }
        }
      );
  }
};

$(window).scroll(function() {
  $('.text-slide').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("fadeIn");
    }
  });


  $('.welcome-text').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("bounceIn");
    }
  });

  $('.fact-info').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("fadeInRight");
    }
  });

  $('.staff-content').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("rollIn");
    }
  });

  $('.fade-text').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("fadeIn");
    }
  });


  $('.contact-info').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("flipInX");
    }
  });
});
