$(function(){
    var currentScreen = 1;
    mimicData(currentScreen);

    //滚动翻页: https://stackoverflow.com/questions/14035180/jquery-load-more-data-on-scroll
    $(window).scroll(function() {
      if (currentScreen<=3){
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
          mimicData(++currentScreen);
        }
      }
    });

    $(".btn-load-more button").click(function(){
      mimicData(++currentScreen);
    });

    if ($_.params("d")=="1") {
      $(".head-img img").attr("src","../../images/beauty.jpg");
      $(".head-img img").css("margin-top","-300px");
    }

    var img_src = $(".head-img img").attr("src");
    var img = new Image();
    $(".head-img img").css("margin-top","-300px");
    $(".head-img img").attr("src", "../../images/beauty.jpg");
    img.onload = function(){
        // 图片加载完成
        $(".head-img img").prop('src', img_src);
        $(".head-img img").css("margin-top","0");
    };
    img.onerror = function(){
        $(".head-img img").prop('src', "../../images/beauty.jpg");
    };

    function mimicData(screen){
      $.get("../../data/blog.json", function(response){
        var data = response.data;
        if (data && data.length>0){
          var unit;
          var result = "";
          if (screen <= data.length){
            for (var i = 0; i < data.length*3; i++) {
              unit = data[currentScreen-1];
              // if ($_.params("d")=="1") unit.img_src = "../../images/beauty.jpg";
              unit.default_img_src = "../../images/beauty.jpg";
              var img_src = unit.img_src;
              var img = new Image();
              img.src = img_src;
              img.onload = function(){
                  // 图片加载完成
                  $("img#uimg" + unit.id).prop('src', img_src);
              };
              img.onerror = function(){
                  $("img#uimg" + unit.id).prop('src', "../../images/beauty.jpg");
              };
              result += $.templates("#unitTmpl").render(unit);
            }
            $(".unit-list").append(result).fadeIn();

            $(window).scrollTop($(window).scrollTop()-1);
            $.common.autoresize();
            if (screen == data.length) $(".btn-load-more").css("display", "none");
          } else {
            $(".btn-load-more").css("display", "none");
          }
        }else{
          $(".btn-load-more").css("display", "none");
        }
      });
    }

});
