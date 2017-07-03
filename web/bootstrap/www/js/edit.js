var edit = {
  fileBrowser: function(fieldName, inputName, btnBrowserName){
    $(inputName + "," + btnBrowserName).click(function(e){
        $(fieldName).trigger('click');
    });
    $(fieldName).change(function(){
        $(inputName).val($(this).val());
    });
  },
  datetimePicker: function(inputNames, formatStr){
    if(!formatStr) formatStr = 'YYYY-MM-DD';
    $(inputNames).datetimepicker({
      format: formatStr,
      locale: 'zh-cn',
      allowInputToggle: true,
      // debug: true,
      useCurrent: true
    });
  },
  multiselect: function(selectNames, promptText){
    if(!promptText) promptText = '请选择';
    $(selectNames).multiselect({
        includeSelectAllOption: true,
        nonSelectedText: promptText,
        selectAllText: '全部',
        allSelectedText: '选中全部',
        maxHeight: 200
    });
  },
  select2: function(selectName, ajaxUrl, defaultId, defaultText, cache, delay){
    if(!cache) cache = true;
    if(!delay) delay = 250;
    $(selectName).select2({
        placeholder: {
          id: '-1',
          text: '请选择'
        },
        allowClear: true,
        data:[{"id":defaultId,"text":defaultText}],
        ajax: {
          url: ajaxUrl,
          dataType: 'json',
          delay: delay,
          cache: cache,
          data: function (query) {
            return query;
          },
          processResults: function (response,params) {
            return {
              results: response.data
            };
          }
        }
    });

    $(selectName).val(defaultId).trigger("change");
  }
};

$(function(){
  $.extend({"edit":edit});

  $(".edit .selector").validate({
      onfocusout:true,
      onkeyup:true
  });

  $(".edit .btn").click(function(){
      $(".btn").blur();
  });
});
