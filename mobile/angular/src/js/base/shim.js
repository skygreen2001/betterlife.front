/**
 * JavaScript Shim Library
 * Copyright (c) 2016 skygreen2001@gmail.com
 *
 * @author skygreen2001 skygreen2001@gmail.com
 */

/*******************************Array Prototype Shim**************************************/
// 去除数组 a 里所包含的元素
// @see http://stackoverflow.com/questions/1187518/javascript-array-difference
// @example: [1,2,3,4,5,6].diff( [3,4,5] );  => [1, 2, 6]
// @example:["test1", "test2","test3","test4","test5","test6"].diff(["test1","test2","test3","test4"]);   => ["test5", "test6"]
Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

//对象数组,根据指定对象key获取数组中指定对象
//@example var array=[{"a":"1","n":"w"},{"a":"2","n":"h"},{"a":"3","n":"k"}}];  array.getObjectBy("a","2")=>{"a":"2","n":"h"}
Array.prototype.getObjectBy = function (name, value) {
  var index=-1;
  for (var i = 0; i < this.length; i++) {
      if (this[i][name] == value) {
          return this[i];
      }
  }
  return null;
};

//对象数组,根据指定对象key获取数组中指定对象
//@example var array=[{"a":"1","n":"w"},{"a":"2","n":"h"},{"a":"3","n":"k"}}];  array.getIndexBy("a","2")=>1
Array.prototype.getIndexBy = function (name, value) {
  for (var i = 0; i < this.length; i++) {
    if (this[i][name] == value) {
      return i;
    }
  }
  return -1;
};

//数组中去除指定值元素的数组
//@example var a=[3,4,5]; a.remove(4); => [3,5]
Array.prototype.remove = function(element) {
    var index = this.indexOf(element);
    if (index >= 0) {
        this.splice(index, 1);
        return true;
    }
    return false;
};

//Array.prototype.includes 的别名
if (!Array.prototype.contains) {
  Array.prototype.contains = function(searchElement /*, fromIndex*/) {
    return this.includes(searchElement /*, fromIndex*/);
  };
}

/*******************************Date Prototype Shim**************************************/
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt)
{
  fmt = fmt || "yyyy-MM-dd";
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

/*******************************String Prototype Shim**************************************/
//是否包含指定字符串
String.prototype.contains = function(substr) {
    if(substr==null||substr==""||this.length==0||substr.length>this.length)
        return false;
    return this.indexOf(substr) > 0;
};

//去除字符串中包含所有的空字符
String.prototype.trimAll = function(str){
    return str.replace(/\s*/g, '');
};

//计算中文字符串长度[包括英文数字长度]
String.prototype.chineseLength = function() {
  var len = 0;
  for (var i=0; i<this.length; i++) {
    if (this.charCodeAt(i)>127 || this.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len ++;
    }
  }
  return len;
};

/**
 * JS截取字符串，中英文都能用
 * 如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。
 * @param startIndex：需要截取的字符串的起始位置
 * @param len: 需要截取的长度
 */
String.prototype.chineseSubstr = function(startIndex, length)
{
  var str_length = 0;
  var str_len = 0;
  str_cut = new String();
  str_len = this.chineseLength();
  if (str_len < length) return this.substring(startIndex, str_len);
  for(var i = startIndex; i < str_len; i++)
  {
    a = this.charAt(i);
    str_length++;
    if(escape(a).length > 4) str_length++;//中文字符的长度经编码之后大于4
    str_cut = str_cut.concat(a);
    if(str_length>=length)
    {
      str_cut = str_cut.concat("...");
      return str_cut;
    }
  }
  //如果给定字符串小于指定长度，则返回源字符串；
  if(str_length < length) return  this;
};

//查看字符串是否手机号
String.prototype.isMobile=function checkMobile(){
  if(/^1([3-5]|[7-8])[0-9]\d{8}$/.test(this)){
    return true;
  }
  return false;
};
