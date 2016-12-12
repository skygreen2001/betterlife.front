/**
 * String JavaScript Library
 * Copyright (c) 2016 skygreen2001@gmail.com
 *
 * @author skygreen2001 skygreen2001@gmail.com
 */

//是否包含指定字符串
String.prototype.contains = function(substr) {
    if(substr==null||substr==""||this.length==0||substr.length>this.length)
        return false;
    return this.indexOf(substr)>0;
}

//去除字符串中包含所有的空字符
String.prototype.trimAll = function(str){
    return str.replace(/\s*/g,'');
};

//计算中文字符串长度[包括英文数字长度]
String.prototype.chineseLength = function() {
  var len = 0;
  for (var i=0; i<this.length; i++) {
    if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
      len += 2;
    } else {
      len ++;
    }
  }
  return len;
}

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
}

//查看字符串是否手机号
String.prototype.isMobile=function checkMobile(){
  if(/^1([3-5]|[7-8])[0-9]\d{8}$/.test(this)){
    return true;
  }
  return false;
}
