/**
 * Betterlife JavaScript Library
 * Copyright (c) 2016 skygreen2001@gmail.com
 * @see APICloud script/app.js
 * @see 可想造一个属于你自己的jQuery库?: https://github.com/MeCKodo/forchange
 * @author skygreen2001 skygreen2001@gmail.com
 */
(function(window, document){
  var ua = navigator.userAgent.toLowerCase();

  var Bb = function(selector) {
    return new Bb.prototype.init(selector);
  };

  /************************* 定义静态方法:start ************************/
  Bb.t = Bb.u = Bb.tools = Bb.utils = {
    ua      : navigator.userAgent.toLowerCase(),
    browser : {
      trident : /trident/.test(ua),//IE内核
      mobile  : !!ua.match(/applewebkit.*mobile.*/) || !!ua.match(/applewebkit/),
      android : /android/.test(ua) || /linux/.test(ua),
      ios     : !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
    },

    /************************* 函数区:start ************************/
    //判断字符串是否为空
    empty : function(data) {
      if (typeof(data) == "undefined") return true;
      if (!data) return true;
      if ((typeof(data) == "string") && data.replace(/(^s*)|(s*$)/g, "").length == 0) return true;
      return false;
    },
    //  计算时间差
    dateTimeDiff : function(inputDate, beCompareDate) {
        var inputDate=inputDate;  //开始时间
        var nowDate=beCompareDate || new Date().getTime(); //结束时间
        var date3=nowDate-inputDate;          //时间差的毫秒数
        //计算出相差天数
        var days=Math.floor(date3/(24*3600*1000));
        //计算出小时数
        var leave1=date3%(24*3600*1000);      //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));
        //计算相差秒数
        var leave3=leave2%(60*1000);          //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);
        var timeDiff = [days, hours, minutes, seconds];
        // console.log(days+'天'+hours+'小时'+minutes+'分'+seconds+'秒');
        return timeDiff;
    },
    //显示当前日期
    //显示年月日 yyyy-MM-dd
    //显示年月日小时分钟 yyyy-MM-dd HH:mm
    now   : function(format) {
      format = format || 'yyyy-MM-dd hh:mm';
      var newDate = new Date();
      return newDate.format(format);
    },
    // 上几个月
    nowBack: function(months){
      var date = new Date();
      date.setMonth(date.getMonth() - months);
      return date.format('yyyy-MM-dd');
    },
    // 获取url指定param
    params: function(k){
      var p={};
      location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
      return k?p[k]:p;
    }
    /************************* 函数区:  end ************************/
  };
  /************************* 定义静态方法:  end ************************/
  Bb.prototype =  {
    constructor : Bb,
    //dom选择的一些判断
    init : function(selector) {
      if(!selector) { return this; }

      if (typeof selector == 'object') {
        var selector = [selector];
        for (var i = 0; i < selector.length; i++) {
          this[i] = selector[i];
        }
        this.length = selector.length;
        return this;
      } else if (typeof selector == 'function') {
        this.ready(selector);
        return;
      } else {
        var selector = selector.trim(), result;
        if (selector.charAt(0) == '#' && !selector.match('\\s')) {
          selector = selector.substring(1);
          result = document.getElementById(selector);
          return result;
        } else {
          result = document.querySelectorAll(selector);
          return result;
        }
      }
    }
  };

  Bb.prototype.init.prototype = Bb.prototype;
  window.$$ = window.$bb = Bb;
  window.$_ = Bb.utils;

})(window, document);
