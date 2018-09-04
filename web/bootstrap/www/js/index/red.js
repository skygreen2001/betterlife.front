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

  $.extend({"index": index});
});
