$(function(){
  // 第一屏满屏显示
  $("html").css("height", "100%");

  // 第一屏内容垂直居中显示
  var lead_core_height = $(window).height() - $(".index #page1 .bb-lead-core").height();
  if (lead_core_height>0) {
    $(".index #page1 .section-header-container").css("margin-top", lead_core_height/2);
  }
  $("#btn-toggle-sidebar").css("display","none");
  if ($_.browser.mobile) $("a.navbar-brand,#btn-toggle-navbar").css("display","none");

  // 顶部导航滚动显示底部挡板效果
  $(document).scrollTop() <= 0 ? $(".navbar").removeClass("nav-scroll") : $(".navbar").addClass("nav-scroll");
  $(document).on("scroll", function() {
    if ($(document).scrollTop() <= 0) {
      $(".navbar").removeClass("nav-scroll");
      if ($_.browser.mobile) $("a.navbar-brand,#btn-toggle-navbar").css("display","none");
      $("#navbar").removeClass("in");
    } else {
      $(".navbar").addClass("nav-scroll");
      if ($_.browser.mobile) $("a.navbar-brand,#btn-toggle-navbar").css("display","block");
    }
  });

  $("nav").hover(function() {
    $(".navbar").addClass("nav-scroll");
    if ($_.browser.mobile) $("a.navbar-brand,#btn-toggle-navbar").css("display","block");
  },function(){
    $(".navbar").removeClass("nav-scroll");
    if ($_.browser.mobile) $("a.navbar-brand,#btn-toggle-navbar").css("display","none");
  });

  // 顶部导航条搜索展开
  $(".search-toggle").click(function(){
    $("#searchform-header").toggleClass("hidden");
  });

  $(".page-container").click(function(){
    $("#searchform-header").addClass("hidden");
  });

  //首页内容顶部显示星云效果
  $('.starfield').starfield();

  // 第三屏左右滚动效果
  $('#page3 .content-head .col-md-4').each(function(){
    $(this).hover(function(){
      $('#page3 .content-head .col-md-4').removeClass("active");
      $(this).addClass("active");
      var dataId = $(this).attr("data-id");
      $('#page3 .content-head .page-detail').find("p").not("[data-id='"+dataId+"']").hide();
      $('#page3 .content-head .page-detail').find("p[data-id='"+dataId+"']").css("display","block");
    });
  });
  $(".content-list-bg").click(function(){});

  //上下滑屏逐个出现
  if($(".section")){
    var t = $(".section");
    var tH = t.eq(0).height();
    var winH = $(window).height();
    var sTop = $(window).scrollTop();

    $(window).scroll(function(){
      sTop = $(window).scrollTop();
      if(navigator.userAgent.match(/mobile/i)) {
        pageAni(sTop);
      }else{
        pageAniWin(sTop)
      }
    });
    function pageAni(sTop){
      $.each(t,function(i){
        if( sTop>t.eq(i).offset().top-winH*1.1){
          t.eq(i).addClass("animation");
        }
      });
    }
    function pageAniWin(sTop){
      $.each(t,function(i){
        if( sTop>t.eq(i).offset().top-winH/1.3){
          t.eq(i).addClass("animation");
        }
      });
    }
    pageAni(sTop);
    pageAniWin(sTop);
    $(".section").removeClass("animation");
  }

  //coutUp
  var options = {
      useEasing : true,
      useGrouping : true,
      separator : ',',
      decimal : '.',
      prefix : '',
      suffix : ''
  };
  var countE1 = new CountUp("countE1", 0, 65, 0, 2.5, options);
  var countE2 = new CountUp("countE2", 0, 105000, 0, 2.5, options);
  var countE3 = new CountUp("countE3", 0, 56.3+25.6, 0, 2.5, options);
  var countE4 = new CountUp("countE4", 0, 70319, 0, 2.5, options);

  if(navigator.userAgent.match(/mobile/i)) {
    countE1.start();
    countE2.start();
    countE3.start();
    countE4.start();
  }else{
    if($(window).height() >= $("#page4").offset().top+300){
      countE1.start();
      countE2.start();
      countE3.start();
      countE4.start();
    }else{
      $(window).scroll(function(){
        // if($(window).scrollTop() >= $("#page4").offset().top-$(window).height()/4){
        if($(window).scrollTop() >= $("#page4").offset().top-$(window).height()*7/10){
          countE1.start();
          countE2.start();
          countE3.start();
          countE4.start();
        }
      })
    }
  }
});
