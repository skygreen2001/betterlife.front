$(function(){
    $("#image-model").html($.templates("#imgModalTmpl"));

    //Datatables中文网[帮助]: http://datatables.club/
    var infoTable = $('#infoTable').DataTable({
        "language"  : $.dataTable.chinese,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url" : "../../data/list.json",
            // "type": "GET",
            // "contentType": "application/json",
            "data": function ( d ) {
                d.query = $("#input-search").val();
                return d;
                // return JSON.stringify( d );
            },
            //可以对返回的结果进行改写
            "dataFilter": function(data){
                // return data;
                var json = jQuery.parseJSON( data );
                var p = infoTable.ajax.params();
                json.draw = p.draw;
                var info = infoTable.page.info();
                var length= info.length;
                var page = p.start / length + 1;
                if (page == 1) {
                  json.data = json.data.slice(0, p.length);
                } else {
                  json.data = json.data.slice(p.length);
                }
                return JSON.stringify( json ); // return JSON string
            }
        },
        "responsive"   : true,
        "searching"    : false,
        "ordering"     : false,
        "dom"          : '<"top">rt<"bottom"lp><"clear">',
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
            {"orderable":false,"targets":5,
                "render" : function(data, type, row) {
                    // var result = '<a id="imgUrl'+row.id+'" href="#"><img src="'+data+'" alt="'+row.imgName+'" /></a>';
                    var data     = {
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
            {"orderable":false, "targets":6,
                "render" : function(data,type,row){
                    if (data==0){
                        return '<span class="status-fail">审核失败</span>';
                    }else if ( data == 1 )
                        return '<span class="status-pass">审核通过</span>';
                    else{
                        return '<span class="status-wait">待审核</span>';
                    }
                }
            },
            {"orderable":false, "targets":7,
                "render" : function(data, type, row){
                    // var result = '<a href="#" id ="info-view'+data+'" class="view" data-toggle="modal" data-target="#infoModal">查看</a>&nbsp;<a href="#" id ="info-edit'+data+'" class="edit" data-toggle="modal" data-target="#infoModal">修改</a>&nbsp;<a id="info-del'+data+'" data-toggle="modal" data-target="#infoModal" href="#" class="del">删除</a>';
                    var result = $.templates("#actionTmpl").render({ "id"  : data });

                    $("body").off('click', 'a#info-view'+data);
                    $("body").on('click', 'a#info-view'+data, function(){//查看
                        bootbox.confirm("确定要查看该用户:" + data + "?",function(result){
                            if ( result == true ){
                                console.log("查看用户:" + data);
                            }
                        });
                    });
                    $("body").off('click', 'a#info-edit'+data);
                    $("body").on('click', 'a#info-edit'+data, function(){//修改
                        bootbox.confirm("确定要编辑该用户:" + data + "?",function(result){
                            if ( result == true ){
                                console.log("编辑用户:" + data);
                            }
                        });
                    });
                    $("body").off('click', 'a#info-dele'+data);
                    $("body").on('click', 'a#info-dele'+data, function(){//删除
                        bootbox.confirm("确定要删除该用户:" + data + "?",function(result){
                            if ( result == true ){
                                console.log("删除用户:" + data);
                            }
                        });
                    });
                    return result;
                }
            }
        ],
        // "aoColumns"    : [
        //     null,
        //     { "sType": "chinese-string" },//中文排序列
        //     { "sType": "chinese-string" },
        //     null,
        //     null,
        //     null,
        //     null
        // ],
        "initComplete":function(){ },
        "drawCallback": function( settings ) {
            $.dataTable.pageNumDisplay(this);
        }
    });
    $("#btn-query").click(function(){infoTable.draw();});
});
