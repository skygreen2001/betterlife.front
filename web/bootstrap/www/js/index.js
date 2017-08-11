$(function(){
  // 顶部导航滚动显示底部挡板效果
  $(document).scrollTop() <= 0 ? $(".navbar").removeClass("nav-scroll") : $(".navbar").addClass("nav-scroll");
  $(document).on("scroll", function() {
      if ($(window).width() >= 768){
        $(document).scrollTop() <= 0 ? $(".navbar").removeClass("nav-scroll") : $(".navbar").addClass("nav-scroll");
      }
  });
  if ($(window).width() < 768) $(".navbar").addClass("nav-scroll");
  $("nav").hover(function() {
      $(".navbar").addClass("nav-scroll");
  },function(){
      if ($(window).width() >= 768) $(".navbar").removeClass("nav-scroll");
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
  // $('#page3 .content-head .bl-line').css("left",$('#page3 .content-head .col-md-4:first-child')[0].offsetLeft-10-$('#page3 .content-head')[0].offsetLeft);
  // $('#page3 .content-head .col-md-4 i:first-child').css("border-color", "#fff");
  $('#page3 .content-head .col-md-4').each(function(){
    $(this).hover(function(){
      // $('#page3 .content-head .bl-line').css("left",this.offsetLeft-10-$('#page3 .content-head')[0].offsetLeft);
      var dataId = $(this).attr("data-id");
      $('#page3 .content-head .page-detail').find("p").not("[data-id='"+dataId+"']").hide();
      $('#page3 .content-head .page-detail').find("p[data-id='"+dataId+"']").css("display","block");
    })
  });

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
