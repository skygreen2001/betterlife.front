$(function(){
    $.get("../../data/blog.json", function(response){
      var data = response.data;
      if (data){
        var unit;
        var result = "";
        for (var i = 0; i < data.length; i++) {
          unit = data[i];
          result += $.templates("#unitTmpl").render(unit);
        }
        $(".unit-list").html(result);
      }
    });


});
