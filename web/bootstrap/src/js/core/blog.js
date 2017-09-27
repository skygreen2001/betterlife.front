$(function(){
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
                { data:"sequenceNo" },
                { data:"title" },
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
                    var result = '<a id="' + "imgUrl" + row.id + '" href="#"><img src="' + data + '" class="img-thumbnail" alt="' + row.title + '" /></a>';

                    $("body").off('click', 'a#imgUrl'+row.id);
                    $("body").on('click', 'a#imgUrl'+row.id, function(){
                        var imgLink = $('a#imgUrl' + row.id + " img").attr('src');
                        $('#imagePreview').attr('src', imgLink);
                        $('#imagePreview-link').attr('href', imgLink);
                        var isShow = $.dataTable.showImages($(this).find("img"), "#imageModal .modal-dialog");
                        if (isShow) $('#imageModal').modal('show'); else window.open(imgLink, '_blank');
                    });
                    return result;
                  }
                },
                {"orderable": false, "targets": 6,
                 "render"   : function(data, type, row) {
                    switch (data) {
                        case '0':
                            return '<span class="status-wait">待审核</span>';
                            break;
                        case '1':
                            return '<span class="status-pass">审核通过</span>';
                            break;
                        default:
                            return '<span class="status-fail">已结束</span>';
                    }
                  }
                },
                {"orderable": false, "targets": 7,
                 "render"   : function(data, type, row){
                    var result = $.templates("#actionTmpl").render({ "id"  : data });
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

    if( $(".content-wrapper form").length ){
        $.edit.datetimePicker('#creationTime, #deadTime');
        $("#creationTime").on("dp.change", function (e) {
            if(e.date){
                $('#deadTime').data("DateTimePicker").minDate(e.date);
            }
        });

        $("#deadTime").on("dp.change", function (e) {
            if(e.date){
                $('#creationTime').data("DateTimePicker").maxDate(e.date);
            }
        });
        $.edit.fileBrowser("#iconImage", "#iconImageTxt", "#iconImageDiv");
        $.edit.fileBrowser("#authorImage", "#authorImageTxt", "#authorImageDiv");
        $.edit.multiselect('#categoryIds');

        $("input[name='isPublic']").bootstrapSwitch();

        $('input[name="isPublic"]').on('switchChange.bootstrapSwitch', function(event, state) {
            console.log(state);
        });

        var default_keyword_id   = 6;
        var default_keyword_text = "音乐";
        $.edit.select2("select[name='keyword_id']", "../../data/keyword.json", default_keyword_id, default_keyword_text);

        $('#editBlogForm').validate({
            errorElement: 'div',
            errorClass: 'help-block',
            // focusInvalid: false,
            focusInvalid: true,
            // debug:true,
            rules: {
                title:{
                    required:true
                },
                content:{
                    required:true
                },
                authorName:{
                    required:true
                },
                sequenceNo: {
                    required:true,
                    number:true,
                },
                authorUrl:{
                    url:true
                }
            },
            messages: {
                title:"此项为必填项",
                content:"此项为必填项",
                authorName:"此项为必填项",
                sequenceNo:{
                    required:"此项为必填项",
                    number:"此项必须为数字"
                },
                authorUrl:{
                    url:"必须输入正确格式的网址"
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function (e) {
                $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
            },

            success: function (e) {
                $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
                $(e).remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            },
            submitHandler: function (form) {
                form.submit();
            },
            invalidHandler: function (form) {
            }
        });
    }
});
