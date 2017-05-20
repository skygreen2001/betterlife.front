
$(function(){
  $(".page-sidebar a.has-ul").click(function(){
    $(this).next("ul").toggleClass("in");
  });

  $(".navigation-header").click(function(){
    $(".page-sidebar .sidebar-nav ul").css("display","none");
    $(".page-sidebar").toggleClass("pin");


    //   // $(".page-content").off('click', '.page-sidebar.pin a');
    //   // $(".page-content").on('click', '.page-sidebar.pin a', function(e){
    //   //   e.preventDefault();
    //   // });
    if($('.page-sidebar').hasClass('pin')){

      $(".page-content").off('mouseenter', '.page-sidebar.pin a');
      $(".page-content").off('mouseenter', '.page-sidebar.pin a.has-ul');

      $(".page-content").on('mouseenter', '.page-sidebar.pin a', function(){
        $(".page-sidebar .sidebar-nav ul").css("display","none");
      });

      $(".page-content").on('mouseenter','.page-sidebar.pin a.has-ul', function(){
        $(this).next("ul").css("top",$(this).position().top);
        $(this).next("ul").css("display","block");
      });
    }else{
      $(".page-sidebar .sidebar-nav ul").removeAttr("style");
    }
  });
});
