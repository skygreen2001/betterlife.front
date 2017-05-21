$(function(){
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
//   $(".sidebar").animate({width : "hide"});
  })
  $(window).resize(function(){
    if($(window).width()>752)$(".sidebar").removeAttr("style");
  });
  //左侧导航条点选是否折叠
  $(".navigation-header").click(function(){
    $('.navigation-header i').tooltip('destroy');
    $(".page-sidebar .sidebar-nav ul").removeAttr("style");
    $(".page-sidebar").toggleClass("pin");
    $('.page-sidebar.pin .sidebar-nav > li > a span').removeAttr("style");

    // 左侧导航条折叠后
    if($('.page-sidebar').hasClass('pin')){
      //左侧导航条顶部切换按钮提示
      $('.navigation-header i').tooltip({
          placement: 'right',
          container: 'body'
      });

      //鼠标移动到图标上
      $(".page-content").off('mouseenter', '.page-sidebar.pin .sidebar-nav > li > a');

      $(".page-content").on('mouseenter','.page-sidebar.pin .sidebar-nav > li > a', function(){
        $(".page-sidebar .sidebar-nav ul").css("display","none");
        $('.page-sidebar.pin .sidebar-nav > li > a span i').remove();
        $('.page-sidebar.pin .sidebar-nav > li > a span').css("display","none");
        if($(this).hasClass('has-ul')){
          $(this).find("span").prepend("<i class='glyphicon glyphicon-triangle-left'></i>");
          $(this).find("span").css("top",$(this).position().top);
          $(this).next("ul").css("top",$(this).position().top+40);
          $(this).find("span").css("display","block");
          $(this).find("span").css("pointer-events","auto");
          $(this).next("ul").css("display","block");

        }
      });

      $(".content-wrapper").hover(function(){
        $(".page-sidebar .sidebar-nav ul").css("display","none");
        if($('.page-sidebar').hasClass('pin'))$('.sidebar-nav > li > a').find("span").css("display","none");
      });
    }else{
      $('.page-sidebar .sidebar-nav > li > a span').removeAttr("style");
      $(".page-sidebar .sidebar-nav ul").removeAttr("style");
    }
  });

  // 顶部导航条搜索展开
  $(".search-toggle").click(function(){
    $("#searchform-header").toggleClass("hidden");
  });

  $(".page-container").click(function(){
    $("#searchform-header").addClass("hidden");
  });


});
