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

    $(".head-img img").css("margin-top","-300px");

    function mimicData(screen){
      $.get("../../data/blog.json", function(response){
        var data = response.data;
        if (data && data.length>0){
          var unit, unitdata;
          var result = "";
          var count = 0;
          if (screen <= data.length){
            for (var i = 0; i < data.length*3; i++) {
              unit = data[currentScreen-1];
              unitdata = Object.assign({}, unit);
              count = currentScreen * i + 2;
              unitdata.img_src = unitdata.img_src.replace(/\?r=1/,"?r="+count);
              result += $.templates("#unitTmpl").render(unitdata);
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
