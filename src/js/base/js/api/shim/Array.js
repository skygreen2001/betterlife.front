/**
 * Array JavaScript Library
 * Copyright (c) 2016 skygreen2001@gmail.com
 *
 * @author skygreen2001 skygreen2001@gmail.com
 */

// 去除数组 a 里所包含的元素
// @see http://stackoverflow.com/questions/1187518/javascript-array-difference
// @example: [1,2,3,4,5,6].diff( [3,4,5] );  => [1, 2, 6]
// @example:["test1", "test2","test3","test4","test5","test6"].diff(["test1","test2","test3","test4"]);   => ["test5", "test6"]
Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
}

//对象数组,根据指定对象key获取数组中指定对象
Array.prototype.getObjectBy = function (name, value) {
  var index=-1;
  for (var i = 0; i < this.length; i++) {
      if (this[i][name] == value) {
          return this[i];
      }
  }
  return null;
}
