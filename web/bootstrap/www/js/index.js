$(function(){
  // 第一屏满屏显示
  $("html").css("height", "100%");
  $("body").addClass("index");
  $('body,html').animate({
      scrollTop: 0
  });
  $("#main-content-container").css("display","block");

  // 第一屏内容垂直居中显示
  var lead_core_height = $(window).height() - $(".index #page1 .bb-lead-core").height();
  if (lead_core_height>0) {
    $(".index #page1 .section-header-container").css("margin-top", lead_core_height/2);
  }
  $(".navbar-fixed-top").css("opacity","0");
  
  // 隐藏toggle精简布局设置按钮
  // $("#btn-layout-small").css("display","none");
  // $(window).resize(function(){
  //   $("#btn-layout-small").css("display","none");
  // });

  // 顶部导航滚动显示底部挡板效果
  $(document).scrollTop() <= 0 ? $(".navbar").removeClass("nav-scroll") : $(".navbar").addClass("nav-scroll");
  $(document).on("scroll", function() {
    if ($(document).scrollTop() <= 0) {
      $(".navbar").removeClass("nav-scroll");
      $(".navbar-fixed-top").css("opacity","0");
      $("#navbar").removeClass("in");
    } else {
      $(".navbar").addClass("nav-scroll");
      $(".navbar-fixed-top").css("opacity","1");
    }
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

  if($(".section")){
    $(window).scroll(function() {
      $('.section').each(function(){
        var imagePos = $(this).offset().top;
        var winH = $(window).height();
        var topOfWindow = $(window).scrollTop();
        if(navigator.userAgent.match(/mobile/i)) {
          if (imagePos < topOfWindow+winH/1.3) {
            $(this).find(".title").addClass("animated bounceInUp");
          }
        }else{
          if (imagePos < topOfWindow+winH/1.3) {
            $(this).find(".title").addClass("animated bounceInUp");
          }
        }
      });
    });
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


var login = "一张网页，要经历怎样的过程，才能抵达用户面前？\n一位新人，要经历怎样的成长，才能站在技术之巅？\n探寻这里的秘密，体验这里的挑战，成为这里的主人！\n欢迎来到Betterlife世界，你，可以影响世界。\n"
console.log(login);
var theUA = window.navigator.userAgent.toLowerCase();
if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
    var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
    if (ieVersion < 9) {
        var str = "本网站仅支持 IE9 以上版本的浏览器，您的浏览器版本过低 :(";
        var str2 = "<br>推荐升级或下载其他浏览器:"
            + "<a href='https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads' target='_blank' style='color:#464646;'>点我升级</a>,"
            + "<a href='https://www.google.cn/chrome/' target='_blank' style='color:#464646;'>谷歌</a>,"
            + "<a href='https://www.mozilla.org' target='_blank' style='color:#464646;'>火狐</a>";
        document.writeln("<pre style='text-align:center;color:#fff;background-color:#77cc6d; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
            "<h2 style='padding-top:200px;margin:0'><strong>" + str + "<br/></strong></h2><h2>" +
            str2 + "</h2><h2 style='margin:0'><strong><br>如果你使用的是双核浏览器,请切换到极速模式访问<br/></strong></h2></pre>");
        document.execCommand("Stop");
        document.getElementsByTagName('nav')[0].style.display = "none";
    }
}
