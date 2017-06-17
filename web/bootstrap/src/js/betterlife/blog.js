$(function(){
    $("#image-model").html($.templates("#imgModalTmpl"));

    //Datatables中文网[帮助]: http://datatables.club/
    if ($.dataTable) {
        var infoTable = $('#infoTable').DataTable({
            "language"  : $.dataTable.chinese,
            "processing": true,
            "serverSide": true,
            "retrieve"  : true,
            "ajax": {
                "url" : "../../data/list.json",
                "data": function ( d ) {
                    d.query    = $("#input-search").val();
                    d.pageSize = d.length;
                    d.page     = d.start / d.length + 1;
                    d.limit    = d.start + d.length;
                    return d;
                    // return JSON.stringify( d );
                },
                //可以对返回的结果进行改写
                "dataFilter": function(data){
                    // //可以对返回的结果进行改写
                    // var json = jQuery.parseJSON( data );
                    // return JSON.stringify( json );

                    // 示例:静态代码修改返回结果如下
                    var json = jQuery.parseJSON( data );
                    var p = infoTable.ajax.params();
                    json.draw = p.draw;
                    if ((p.start + p.length) <= json.recordsFiltered){
                        json.data = json.data.slice(p.start, p.length);
                    }else{
                        json.data = json.data.slice(p.start);
                    }
                    return JSON.stringify( json );
                }
            },
            "responsive"   : true,
            "searching"    : false,
            "ordering"     : false,
            "dom"          : '<"top">rt<"bottom"ilp><"clear">',
            "deferRender"  : true,
            "bStateSave"   : true,
            "bLengthChange": true,
            "aLengthMenu"  : [[10, 25, 50, 100,-1],[10, 25, 50, 100,'全部']],
            "columns": [
                { data:"id" },
                { data:"name" },
                { data:"code" },
                { data:"contactName" },
                { data:"phone" },
                { data:"imgUrl" },
                { data:"status"},
                { data:"id" }
            ],
            "columnDefs": [
                {"orderable": false, "targets": 5,
                 "render"   : function(data, type, row) {
                    var data = {
                        "img_id"  : "imgUrl"+row.id,
                        "img_src" : data,
                        "img_name": row.imgName
                    };
                    var result = $.templates("#imgTmpl").render(data);

                    $("body").off('click', 'a#imgUrl'+row.id);
                    $("body").on('click', 'a#imgUrl'+row.id, function(){
                        $('#imagePreview').attr('src', $('a#imgUrl' + row.id + " img").attr('src'));
                        $('#imagePreview-link').attr('href', $('a#imgUrl' + row.id + " img").attr('src'));
                        $('#imageModal').modal('show');
                    });
                    return result;
                 }
                },
                {"orderable": false, "targets": 6,
                 "render"   : function(data,type,row){
                    if ( data == 0 ){
                        return '<span class="status-fail">审核失败</span>';
                    } else if ( data == 1 ) {
                        return '<span class="status-pass">审核通过</span>';
                    } else {
                        return '<span class="status-wait">待审核</span>';
                    }
                 }
                },
                {"orderable": false, "targets": 7,
                 "render"   : function(data, type, row){
                    var result = $.templates("#actionTmpl").render({ "id"  : data });

                    $("body").off('click', 'a#info-view'+data);
                    $("body").on('click', 'a#info-view'+data, function(){//查看
                        bootbox.confirm("确定要查看该博客:" + data + "?",function(result){
                            if ( result == true ){
                                console.log("查看博客:" + data);
                            }
                        });
                    });
                    $("body").off('click', 'a#info-edit'+data);
                    $("body").on('click', 'a#info-edit'+data, function(){//修改
                        bootbox.confirm("确定要编辑该博客:" + data + "?",function(result){
                            if ( result == true ){
                                console.log("编辑博客:" + data);
                            }
                        });
                    });
                    $("body").off('click', 'a#info-dele'+data);
                    $("body").on('click', 'a#info-dele'+data, function(){//删除
                        bootbox.confirm("确定要删除该博客:" + data + "?",function(result){
                            if ( result == true ){
                                console.log("删除博客:" + data);
                            }
                        });
                    });
                    return result;
                }
             }
            ],
            "initComplete":function(){
                $.dataTable.filterDisplay();
            },
            "drawCallback": function( settings ) {
                $.dataTable.pageNumDisplay(this);
                $.dataTable.filterDisplay();
            }
        });
        $.dataTable.doFilter(infoTable);
    }

    if( $("form").length ){

    }
});
