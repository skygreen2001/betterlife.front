var dataTable = {
    pageSelectType: 1,
    maxMorePages  : 8,
    chinese       : {
        "sProcessing"    : "处理中...",
        "sLengthMenu"    : "显示 _MENU_ 项结果",
        "sZeroRecords"   : "没有匹配结果",
        "sInfo"          : "共 _TOTAL_ 项",
        "_sInfo"         : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty"     : "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered"  : "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix"   : "",
        "sSearch"        : "搜索:",
        "sUrl"           : "",
        "sEmptyTable"    : "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands" :  ",",
        "oPaginate"      : {
            "sFirst"   :    "首页",
            "sPrevious": "上一页",
            "sNext"    :     "下一页",
            "sLast"    :     "末页"
        },
        "oAria"          : {
            "sSortAscending" :  ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    },
    doFilter      : function(table){
        if ( $(".filter-up").has('#btn-query').length ){
          $(".filter-up #btn-query").click(function(){
            table.search($(".filter-up #input-search").val()).draw();
          });
        }else{
          $(".filter-up #input-search").on( 'keyup', function () {
            table.search( this.value ).draw();
          });
        }
    },
    filterDisplay : function(){
        $(".filter-up .icon-remove").remove();
        $(".filter-up #input-search").after('<i class="icon-remove"></i>');
        $(".filter-up .icon-remove").click(function(){
            $(".filter-up input").val("");
            $(".filter-up input").trigger("keyup");
            $(".filter-up .icon-remove").css("display","none");
        });
        $(".filter-up input").keyup(function(){
            if ($(this).val()==""){
                $(this).siblings(".icon-remove").css("display","none");
            }else{
                $(this).siblings(".icon-remove").show();
            }
        });
        this.resize();
    },
    resize        : function(){
        var offset = $(".content-wrapper .container-fluid.list .table-responsive").height() + $(".navbar-container").height() + $(".breadcrumb-line").height() + $("footer").height() + 10;
        if ( offset > $(window).height() ) {
          $(".content-wrapper .container-fluid.list").removeAttr("style");
        }
    },
    pageNumDisplay: function(dataTableThis){
        var self       = dataTableThis;
        var info       = self.api().page.info();
        var totalPages = info.pages
        if ( totalPages > this.maxMorePages ){
          if ( this.pageSelectType == 1 ){
              var currentPage       = info.page+1;
              var pageSelectOptions = "";
              for ( var int = 0; int < totalPages; int++ ) {
                  var showPageNum=int+1;
                  if (int==currentPage-1){
                      pageSelectOptions+='<option value="'+showPageNum+'" selected>'+showPageNum+'</option>';
                  }else{
                      pageSelectOptions+='<option value="'+showPageNum+'">'+showPageNum+'</option>';
                  }
              }
              if ( !self.selector ) self.selector = "#" + self[0].id;
              $(self.selector+'_ellipsis').before('<li class="paginate_button page_select_li"><a href="#" class="page_select" tabindex="1" style="display:block;"><select class="redirect_page">'+pageSelectOptions+'</select></a></li>');
              $('.redirect_page').change(function(e){
                  var sefRedirect=this;
                  if($(sefRedirect).val() && $(sefRedirect).val()>0){
                      var redirectpage = $(sefRedirect).val()-1;
                  }else{
                      var redirectpage = 0;
                  }
                  self.fnPageChange( redirectpage );
              });
          }else{
              $(self.selector+'_ellipsis').before('<li class="paginate_button"><a href="#" tabindex="1" style="display:block;"><input type="text" class="redirect_page"></a></li>');
              var globalTimeout = null;
              $('.redirect_page').keyup(function(e){
                  var sefRedirect=this;
                  if(globalTimeout != null) clearTimeout(globalTimeout);
                     globalTimeout=setTimeout(function(){
                     if($(sefRedirect).val() && $(sefRedirect).val()>0){
                         var redirectpage = $(sefRedirect).val()-1;
                     }else{
                         var redirectpage = 0;
                     }
                     self.fnPageChange( redirectpage );
                     if(globalTimeout != null) clearTimeout(globalTimeout);
                  },500);
              });
          }
        }
        $('.redirect_page').parent().click(function(e){
            e.preventDefault();
        });
    },
    showImages: function(imgIdJqueryObj, showModelDialogName){
        var screen_w = $(window).width();
        var screen_h = $(window).height();
        var img_w = imgIdJqueryObj[0].naturalWidth;
        var img_h = imgIdJqueryObj[0].naturalHeight;
        if ( img_w <=0 ) return false;
        var offset_h = 100;
        if (img_w < screen_w && img_h < screen_h){
            $(showModelDialogName).css("width", img_w);
            offset_h = (screen_h - img_h)/2;
        } else {
            if ( img_w >= screen_w ){
                if (img_h > screen_h) {
                    var w_ratio = img_w/screen_w;
                    var h_ratio = img_h/screen_h;
                    offset_h = (screen_h * 0.1)/2;
                    if (w_ratio > h_ratio){
                        $(showModelDialogName).css("width", screen_w*0.9);
                        var h = screen_w*0.9 * img_h / img_w;
                        if ( screen_h > h )offset_h = (screen_h - h) / 2 - 16;
                    }else
                        $(showModelDialogName).css("height", screen_h * 0.9);
                } else {
                    $(showModelDialogName).css("width", screen_w*0.9);
                    offset_h = (screen_h - img_h)/2;
                }
            } else {
                $(showModelDialogName).css("height", screen_h * 0.9);
                offset_h = (screen_h * 0.1)/2;
            }
        }
        $(showModelDialogName).css("margin-top", offset_h);
        return true;
    }
};

$(function(){
  $.extend({"dataTable":dataTable});
  //中文排序
  jQuery.fn.dataTableExt.oSort['chinese-string-asc']  = function(s1,s2) {
      return s1.localeCompare(s2);
  };
  jQuery.fn.dataTableExt.oSort['chinese-string-desc'] = function(s1,s2) {
      return s2.localeCompare(s1);
  };
  //设置超过多少页页数导航中间显示省略号
  $.fn.DataTable.ext.pager.numbers_length = dataTable.maxMorePages;
});
