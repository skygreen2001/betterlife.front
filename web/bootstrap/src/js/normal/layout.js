$(function(){
  //自动高亮当前页面链接地址对应的导航菜单
  function showLayoutMenuActive(linkName){
    var urlstatus = false;
    var urlstr    = location.href;
    $(linkName).each(function () {
      if (!$(this).attr('href')) return;
      var link = $(this).attr('href').replace(/\.\.\//g, "");
      link     = link.substring(0, link.lastIndexOf(".")+1);
      if ( link && ( (urlstr + '/').indexOf(link) > -1) && ( link != '' ) && ( link != '#' ) ) {
        $(this).addClass('active');
        urlstatus = true;
        var parent = $(this).parent().parent();
        if (parent.hasClass("sub-menu")) {
          parent.parent().find("a.has-ul").addClass('hover');
          parent.slideToggle(200);
          parent.parent().find("i.menu-right").toggleClass("rotated");
        }
      } else {
        $(this).removeClass('active');
      }
      if($(linkName + ".active").length>1){
        $(linkName).eq(0).removeClass('active');
      }
    });
    if (!urlstatus) {
      $(linkName).eq(0).addClass('active');
    }
  }
  showLayoutMenuActive(".sidebar-nav li a");
  showLayoutMenuActive("#navbar .navbar-nav li a");

  //手机顶部菜单导航开关切换
  $(".navbar-container .navbar-header .navbar-toggle").click(function(){
    $(this).toggleClass("on");
  });

  // $("nav").hover(function() {
  //   $(".navbar").addClass("nav-scroll");
  //   $(".navbar-fixed-top").css("opacity","1");
  // },function(){
  //   $(".navbar").removeClass("nav-scroll");
  //   $(".navbar-fixed-top").css("opacity","0");
  // });
  $(".container-fluid").click(function(){
    $("#searchbar").collapse('hide');
  });

  $("#searchbar input").keyup(function(){
    if ($(this).val()==""){
      $(this).siblings(".fa-remove").css("display","none");
    }else{
      $(this).siblings(".fa-remove").show();
    }
  });

  //左侧导航条有子菜单点选
  $(".sidebar-nav >li > a.has-ul").click(function(e){
    e.preventDefault();
    $(this).next("ul").slideToggle(200);
    $(this).find("i.menu-right").toggleClass("rotated");
  });

  //左侧导航条点选
  $(".sidebar-nav > li > a").click(function(){
    if(!$(".page-sidebar").hasClass('pin')){
      $(".sidebar-nav ul").not($(this).next("ul")).removeAttr("style");
      $(".sidebar-nav a.has-ul").not($(this)).find("i.menu-right").removeClass("rotated");
    }
    $(".sidebar-nav li a.active").removeClass("active");
    if(($(".page-sidebar").hasClass('pin')&&(!$(this).hasClass('has-ul')))||(!$(".page-sidebar").hasClass('pin'))){
      $(this).addClass("active");
    }
  });

  $("#btn-toggle-sidebar").click(function(){
    $(".sidebar").toggle();
  })

  if ( ($(window).width() > 755) && ($(window).width() < 826) ) collapse_sidebar();

  //左侧导航条顶部切换按钮提示
  $('.sidebar .navigation-header i').tooltip({
      placement: 'right',
      container: 'body'
  });

  //左侧导航条点选是否折叠
  $(".sidebar .navigation-header").click(function(){
    collapse_sidebar();
  });

  // 页面整体布局宽窄屏切换
  $("#btn-layout-small").click(function(){
    if ($(this).find("i").hasClass("glyphicon-resize-full")) {
      $(this).find("i").removeClass("glyphicon-resize-full").addClass("glyphicon-resize-small");
      $(".navbar .navbar-container").removeClass("container");
      $(".page-container").removeClass("container");
    } else {
      $(this).find("i").removeClass("glyphicon-resize-small").addClass("glyphicon-resize-full");
      $(".navbar .navbar-container").addClass("container");
      $(".page-container").addClass("container");
      $(window).resize();
    }
  });

  /** 切换折叠左侧导航条 */
  function collapse_sidebar(){
    $(".page-sidebar .sidebar-nav ul").removeAttr("style");
    $(".page-sidebar").toggleClass("pin");
    $(".content-wrapper").toggleClass("pin");
    $('.page-sidebar.pin .sidebar-nav > li > a span').removeAttr("style");

    // 左侧导航条折叠后
    if ($('.page-sidebar').hasClass('pin')) {
      //鼠标移动到图标上
      $(".page-content").off('mouseenter', '.page-sidebar.pin .sidebar-nav > li > a');

      $(".page-content").on('mouseenter','.page-sidebar.pin .sidebar-nav > li > a', function(){
        $(".page-sidebar .sidebar-nav ul").css("display","none");
        $('.page-sidebar.pin .sidebar-nav > li > a span i').remove();
        $('.page-sidebar.pin .sidebar-nav > li > a span').css("display","none");

        $(this).find("span").prepend("<i class='glyphicon glyphicon-triangle-left'></i>");
        $(this).find("span").css("top",$(this).position().top);
        $(this).find("span").css("display","block");
        $(this).find("span").css("pointer-events","auto");

        if ($(this).hasClass('has-ul')) {
          $(this).next("ul").css("top",$(this).position().top+40);
          $(this).next("ul").css("display","block");
        }
      });

      $(".content-wrapper,.navigation-header").hover(function(){
        $(".page-sidebar .sidebar-nav ul").css("display","none");
        if($('.page-sidebar').hasClass('pin'))$('.sidebar-nav > li > a').find("span").css("display","none");
      });
    } else {
      $('.page-sidebar .sidebar-nav > li > a span').removeAttr("style");
      $(".page-sidebar .sidebar-nav ul").removeAttr("style");
      $('.page-sidebar .sidebar-nav > li > a span i').remove();
    }
  }

  //下拉菜单显示效果
  $.common.dropdown();

  //网页过长显示返回到顶部按钮
  $(document).on("scroll", function() {
    if ($(document).scrollTop() > $(window).height()-188) {
      $(".return-top").css("display","block");
    }else{
      $(".return-top").css("display","none");
    }
  });

  //点击返回顶部
  $(".return-top").click(function(){
    $('body,html').animate({scrollTop:0});
  });

  //布局自适应高度，确保footer始终显示在页面底部
  $.common.autoresize();
  $(window).resize(function(){
    $.common.autoresize();
  });
});
