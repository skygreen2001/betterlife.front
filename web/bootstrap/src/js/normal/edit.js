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
      debug: true,
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
        maxHeight: 200,
        dropUp: true,
        buttonWidth: '86.5%'
    });
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
