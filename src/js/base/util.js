
//显示当前日期
//显示年月日 yyyy-MM-dd
//显示年月日小时分钟 yyyy-MM-dd HH:mm
function now(format) {
  format = format || 'yyyy-MM-dd hh:mm';
  var newDate = new Date();
  return newDate.format(format);
}

//类似php的print_r方法，遍历数据类型和对象的属性和方法。
function print_r(arr,level) {
  var dumped_text = "";
  if(!level) level = 0;

  //The padding given at the beginning of the line.
  var level_padding = "";
  for(var j=0;j<level+1;j++) level_padding += "  ";

  if(typeof(arr) == 'object') { //Array/Hashes/Objects
    for(var item in arr) {
      var value = arr[item];

      if(typeof(value) == 'object') { //If it is an array,
        dumped_text += level_padding + "'" + item + "' ...\n";
        dumped_text += dump(value,level+1);
      } else {
        dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
      }
    }
  } else { //Stings/Chars/Numbers etc.
    dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
  }
  return dumped_text;
}

//如果只是希望在IE中不出现Firebug调试函数的错误信息，那么可以在页面中加入以下代码
function log(msg){
	if (window["console"]){
		console.log(msg);
	}
}
//
// if (!window.console ||!console.firebug){
//   var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
//                "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
//   window.console = {};
//   for (var i = 0; i < names.length; ++i)
//     window.console[names[i]] = function() {}
// }
