/**
 * Betterlife JavaScript Library
 * Copyright (c) 2016 skygreen2001@gmail.com
 * @see APICloud script/app.js
 * @see 可想造一个属于你自己的jQuery库?: https://segmentfault.com/a/1190000003994531
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
      iPad    : ua.match(/(ipad).*os\s([\d_]+)/),
      mobile  : (!!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/) || /android/.test(ua) || /linux/.test(ua)) && (!(ua.match(/(ipad).*os\s([\d_]+)/))),
      android : /android/.test(ua) || /linux/.test(ua),
      ios     : !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
    },

    /************************* 函数区:start ************************/
    // 校验是否正确的手机号码
    isMobilePhone(value) {
        var reg = /^1[3456789]\d{9}$/
        return reg.test(value);
    },
    // 校验是否中国电话号码（包括移动和固定电话）
    isPhone(value) {
        var reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/
        return reg.test(value);
    },
    // 判断字符串是否为空
    //   - @param data: 输入的字符串
    empty : function(data) {
      if (typeof(data) == "undefined") return true;
      if (!data) return true;
      if ((typeof(data) == "string") && data.replace(/(^s*)|(s*$)/g, "").length == 0) return true;
      return false;
    },
    // 计算时间差
    //   - @param inputDate: 开始时间
    //   - @param beCompareDate: 结束时间
    dateTimeDiff : function(inputDate, beCompareDate) {
        var inputDate=inputDate || new Date().getTime();  //开始时间
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
    // 显示当前日期
    // 显示年月日 yyyy-MM-dd
    // 显示年月日小时分钟秒 yyyy-MM-dd HH:mm:ss
    //   - @param format: 指定显示时间格式
    now   : function(format) {
      format = format || 'yyyy-MM-dd hh:mm:ss';
      var newDate = new Date();
      return newDate.format(format);
    },
    // 微信显示当前时间的方式
    //   -. 日期为今天显示时间
    //   -. 日期为昨天显示昨天
    //   -. 日期为昨天之前显示: 月份-日期
    //   - @param dateStr: 需要显示的日期时间
    // 微信显示当前时间的方式
    //   -. 日期为今天显示时间
    //      -. 大于一小时显示: +小时
    //      -. 小于一小时显示:
    //        -. 小于一分钟显示: 刚刚
    //        -. 大于一分钟显示: +分钟
    //   -. 日期为昨天显示昨天
    //   -. 日期为昨天之前显示: 月份-日期
    //   - @param dateStr: 需要显示的日期时间
    wxnow : function(dateStr) {
      dateStr = dateStr || (new Date()).format('yyyy-MM-dd hh:mm:ss');
      var now = new Date();
      dateStr = dateStr.replace(/-/g,"/");
      var d   = new Date(Date.parse(dateStr));
      var n   = new Date();
      var date,timediff;
      if (d.setHours(0,0,0,0) == n.setHours(0,0,0,0)){
        dateStr  = new Date(Date.parse(dateStr));
        now      = now.getTime();  //开始时间
        date     = dateStr.getTime(); //结束时间
        timediff = now - date;     //时间差的毫秒数
        //计算出相差小时
        var hours = Math.floor(timediff/(3600*1000));
        if (hours == 0) {
          //计算出相差小时
          var minutes = Math.floor(timediff/(60*1000));
          if (minutes == 0) {
            return "刚刚";
          } else {
            return minutes + "分钟前";
          }
        } else {
          return hours + "小时前";
        }
        return dateStr.format("hh:mm");
      }

      now      = now.getTime();  //开始时间
      date     = new Date(Date.parse(dateStr)).getTime(); //结束时间
      timediff = now - date;     //时间差的毫秒数
      //计算出相差天数
      var days = Math.floor(timediff/(24*3600*1000));
      if (days == 1) return "昨天";
      var showDate = (new Date(Date.parse(dateStr))).format('MM-dd');
      return showDate;
    },
    /**
     * 校验输入的身份证号是否正确
     * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
     * 身份证18位组成：由十七位数字本体码和一位校验码组成。排列顺序从左到右依次为：六位数字地址码，八位数字出生日期码， 三位数字顺序码和一位数字校验码。
     * 地址码(前六位数)：表示编码对象常住户口所在县(市、旗、区)的行政区划代码
     * 出生日期码(第七位至十四位)：表示编码对象出生的年、月、日
     * 顺序码(第十五位至十七位)：表示在同一地址码所标识的区域范围内，对同年、同月、同日出生的人编定的顺序号，顺序码的奇数分配给男性，偶数分配给女性。
     * 校验码（第十八位数）：作为尾号的校验码，是由号码编制单位按统一的公式计算出来的，如果某人的尾号是0－9，都不会出现X，但如果尾号是10，那么就得用X来代替，因为如果用10做尾号，那么 此人的身份证就变成了19位。X是罗马数字的10，用X来代替10，可以保证公民的身份证符合国家标准
     * [参考]
     *      vue-elementUI中身份证验证: https://github.com/Believel/vueHoutaiPCModel/issues/3
     */
    isIdCard: function(value) {
        var vcity = {
            11:"北京", 12:"天津", 13:"河北", 14:"山西", 15:"内蒙古", 
            21:"辽宁", 22:"吉林", 23:"黑龙江", 31:"上海", 32:"江苏", 
            33:"浙江", 34:"安徽", 35:"福建", 36:"江西", 37:"山东", 41:"河南", 
            42:"湖北", 43:"湖南", 44:"广东", 45:"广西", 46:"海南", 50:"重庆", 
            51:"四川", 52:"贵州", 53:"云南", 54:"西藏", 61:"陕西", 62:"甘肃", 
            63:"青海", 64:"宁夏", 65:"新疆", 71:"台湾", 81:"香港", 82:"澳门", 91:"国外"
        };
        //是否为空
        if ( value === '' ) {
            return false;
        }
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
        var reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;  
        if ( reg.test(value) === false ) {
            return false;  
        }
        //检查省份  
        var province = value.substr(0, 2);  
        if ( vcity[province] == undefined ) {  
            return false;
        }
        //校验生日
        var len = value.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
        if ( len == '15' ) {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            var arr_data   = value.match(re_fifteen);
            var year  = arr_data[2];
            var month = arr_data[3];
            var day   = arr_data[4];
            var birthday = new Date('19'+year+'/'+month+'/'+day);
            
            var now = new Date();
            var now_year = now.getFullYear();
            year = '19' + year;
            //年月日是否合理 
            if ( birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day ) {
                //判断年份的范围（3岁到100岁之间)
                var time = now_year - year;
                if ( time < 3 || time > 100 ) {
                    return false;
                }
            } else {
                return false; 
            }
        }
        value = value.toUpperCase();
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
        if ( len == '18' ) {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data    = value.match(re_eighteen);
            var year  = arr_data[2];
            var month = arr_data[3];
            var day   = arr_data[4];
            var birthday = new Date(year + '/' + month + '/' + day);
            var now = new Date();  
            var now_year = now.getFullYear();
            //年月日是否合理  
            if ( birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day ) {
                //判断年份的范围（3岁到100岁之间)
                var time = now_year - year;
                if ( time < 3 || time > 100 ) {
                    return false;
                }
            } else {
                return false; 
            }
        }
        //检验位的检测
        //15位转18位 
        if ( len == '15' ) {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);  
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');  
            var cardTemp = 0, i;
            value = value.substr(0, 6) + '19' + value.substr(6, value.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += value.substr(i, 1) * arrInt[i];  
            }  
            value += arrCh[cardTemp % 11];
        }
        len = value.length;
        if ( len == '18' ) {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i, valnum;
            for (i = 0; i < 17; i ++) {
                cardTemp += value.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[cardTemp % 11];
            if ( valnum == value.substr(17, 1) ) {
                return true;
            }
            return false;
        }
        return false;
    },
    // 上几个月
    // months: 倒数几个月
    nowBack: function(months){
      var date = new Date();
      date.setMonth(date.getMonth() - months);
      return date.format('yyyy-MM-dd');
    },
    // 获取url指定param
    params: function(k,url){
      url = url || location.search;
      var p = {};
      url.replace(/[?&]+([^=&]+) = ([^&]*)/gi,function(s,k,v){p[k]=v})
      return k ? p[k] : p;
    }
    /************************* 函数区:  end ************************/
  };

  /************************* 定义静态方法:  end ************************/
  Bb.each   = function(obj, callback) {
      var len = obj.length,
          i = 0;

      if (obj.constructor === window.$$ || obj.constructor === window.$bb) {
          for (; i < len; i++) {
              var val = callback.call(obj[i],i,obj[i]);
              if(val === false) break;
          }
      } else if (Array.isArray(obj)) {
          for (; i < len; i++) {
              var val = callback.call(obj[i],i,obj[i]);
              if(val === false) break;
          }
      } else {
          for( i in obj ) {
              if ( i === 'length' || i=== 'item' ) return;
              var val = callback.call(obj[i],i,obj[i]);
              if ( val === false ) break;
          }
      }
  };

  Bb.prototype =  {
    constructor : Bb,
    element     : '',
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
          result   = document.getElementById(selector);
        } else {
          result = document.querySelectorAll(selector);
          // result.selector = selector;
          // for (var i = 0; i < result.length; i++) {
          //   this[i] = result[i];
          // }
          // this.selector = selector;
          // this.length = result.length;
          // return this;
        }
        this.element = result;
        return this;
        // var result = Sizzle(selector);
        // if (result.length == 1) result = result[0];
        // return result;
      }
    },
    ready: function(fn) {
      document.addEventListener('DOMContentLoaded',function() {
          fn && fn();
      },false);
      document.removeEventListener('DOMContentLoaded',fn,true);
    },
    attr : function(name, value, el) {
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('attr');
        return;
      }
      if(arguments.length == 2){
        return el.getAttribute(name);
      }else if(arguments.length == 3){
        el.setAttribute(name, value);
        return el;
      }
    },
    dom : function(selector, el){
      if (!el) el = this.element;
      if(arguments.length === 1 && typeof arguments[0] == 'string'){
        if(document.querySelector){
          return document.querySelector(arguments[0]);
        }
      }else if (arguments.length === 2){
        if(el.querySelector){
          return el.querySelector(selector);
        }
      }
    },
    prepend : function(html, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('prepend');
        return;
      }
      el.insertAdjacentHTML('afterbegin', html);
      return el;
    },
    append : function(html, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('append');
        return;
      }
      el.insertAdjacentHTML('beforeend', html);
      return el;
    },
    before : function(html, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('before');
        return;
      }
      el.insertAdjacentHTML('beforebegin', html);
      return el;
    },
    after : function(html, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('after');
        return;
      }
      el.insertAdjacentHTML('afterend', html);
      return el;
    },
    html : function(html, el) {
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('html');
        return;
      }
      if(arguments.length === 0){
        return el.innerHTML;
      }else if(arguments.length === 1){
        el.innerHTML = html;
        return el;
      }
    },
    text : function(txt, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('text');
        return;
      }
      if(arguments.length === 1){
        return el.textContent;
      }else if(arguments.length === 2){
        el.textContent = txt;
        return el;
      }
    },
    val : function(val, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('val');
        return;
      }
      if(arguments.length === 1){
        switch(el.tagName){
          case 'SELECT':
            var value = el.options[el.selectedIndex].value;
            return value;
            break;
          case 'INPUT':
            return el.value;
            break;
          case 'TEXTAREA':
            return el.value;
            break;
        }
      }
      if(arguments.length === 2){
        switch(el.tagName){
          case 'SELECT':
            el.options[el.selectedIndex].value = val;
            return el;
            break;
          case 'INPUT':
            el.value = val;
            return el;
            break;
          case 'TEXTAREA':
            el.value = val;
            return el;
            break;
        }
      }
    },
    css : function(css, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('css');
        return;
      }
      if(typeof css == 'string' && css.indexOf(':') > 0){
        el.style && (el.style.cssText += ';' + css);
      }
    },
    cssVal : function(prop, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('cssVal');
        return;
      }
      if(arguments.length === 2){
        var computedStyle = window.getComputedStyle(el, null);
        return computedStyle.getPropertyValue(prop);
      }
    },
    post : function(/*url,data,fnSuc,dataType*/){
      var argsToJson = parseArg.apply(null, arguments);
      var json = {};
      var fnSuc = argsToJson.fnSuc;
      argsToJson.url && (json.url = argsToJson.url);
      argsToJson.data && (json.data = argsToJson.data);
      if(argsToJson.dataType){
        var type = argsToJson.dataType.toLowerCase();
        if (type == 'text'||type == 'json') {
          json.dataType = type;
        }
      }else{
        json.dataType = 'json';
      }
      json.method = 'post';
      api.ajax(json,
        function(ret,err){
          if (ret) {
            fnSuc && fnSuc(ret);
          }
        }
      );
    },
    get : function(/*url,fnSuc,dataType*/){
      var argsToJson = parseArg.apply(null, arguments);
      var json = {};
      var fnSuc = argsToJson.fnSuc;
      argsToJson.url && (json.url = argsToJson.url);
      //argsToJson.data && (json.data = argsToJson.data);
      if(argsToJson.dataType){
        var type = argsToJson.dataType.toLowerCase();
        if (type == 'text'||type == 'json') {
          json.dataType = type;
        }
      }else{
        json.dataType = 'text';
      }
      json.method = 'get';
      api.ajax(json,
        function(ret,err){
          if (ret) {
            fnSuc && fnSuc(ret);
          }
        }
      );
    },
    remove : function(el){
      if (!el) el = this.element;
      if(el && el.parentNode){
        el.parentNode.removeChild(el);
      }
    },
    removeAttr : function(el, name){
      if(!this.isElement(el)){
        Bb.eleNoInfo('removeAttr');
        return;
      }
      if(arguments.length === 2){
        el.removeAttribute(name);
      }
    },
    hasCls : function(cls, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('hasCls');
        return;
      }
      if(el.className.indexOf(cls) > -1){
        return true;
      }else{
        return false;
      }
    },
    addCls : function(cls, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('addCls');
        return;
      }
      if('classList' in el){
        el.classList.add(cls);
      }else{
        var preCls = el.className;
        var newCls = preCls +' '+ cls;
        el.className = newCls;
      }
      return el;
    },
    removeCls : function(el, cls){
      if(!this.isElement(el)){
        Bb.eleNoInfo('removeCls');
        return;
      }
      if('classList' in el){
        el.classList.remove(cls);
      }else{
        var preCls = el.className;
        var newCls = preCls.replace(cls, '');
        el.className = newCls;
      }
      return el;
    },
    toggleCls : function(cls, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('toggleCls');
        return;
      }
       if('classList' in el){
        el.classList.toggle(cls);
      }else{
        if(bb.hasCls(el, cls)){
          bb.removeCls(el, cls);
        }else{
          bb.addCls(el, cls);
        }
      }
      return el;
    },
    isElement : function(obj){
      return !!(obj && obj.nodeType == 1);
    },
    addEvt : function(name, fn, useCapture, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('addEvt');
        return;
      }
      useCapture = useCapture || false;
      if(el.addEventListener) {
        el.addEventListener(name, fn, useCapture);
      }
    },
    rmEvt : function(name, fn, useCapture, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('rmEvt');
        return;
      }
      useCapture = useCapture || false;
      if (el.removeEventListener) {
        el.removeEventListener(name, fn, useCapture);
      }
    },
    one : function(name, fn, useCapture, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('one');
        return;
      }
      useCapture = useCapture || false;
      var that = this;
      var cb = function(){
        fn && fn();
        that.rmEvt(el, name, cb, useCapture);
      };
      that.addEvt(el, name, cb, useCapture);
    },
    domAll : function(selector, el){
      if (!el) el = this.element;
      if(arguments.length === 1 && typeof arguments[0] == 'string'){
        if(document.querySelectorAll){
          return document.querySelectorAll(arguments[0]);
        }
      }else if(arguments.length === 2){
        if(el.querySelectorAll){
          return el.querySelectorAll(selector);
        }
      }
    },
    first : function(selector, el){
      if (!el) el = this.element;
      if(arguments.length === 1){
        if(!this.isElement(el)){
          Bb.eleNoInfo('first');
          return;
        }
        return el.children[0];
      }
      if(arguments.length === 2){
        return this.dom(el, selector+':first-child');
      }
    },
    last : function(selector, el){
      if (!el) el = this.element;
      if(arguments.length === 1){
        if(!this.isElement(el)){
          Bb.eleNoInfo('last');
          return;
        }
        var children = el.children;
        return children[children.length - 1];
      }
      if(arguments.length === 2){
        return this.dom(el, selector+':last-child');
      }
    },
    eq : function(index, el){
      if (!el) el = this.element;
      return this.dom(el, ':nth-child('+ index +')');
    },
    not : function(selector, el){
      if (!el) el = this.element;
      return this.domAll(el, ':not('+ selector +')');
    },
    prev : function(el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('prev');
        return;
      }
      var node = el.previousSibling;
      if(node.nodeType && node.nodeType === 3){
        node = node.previousSibling;
        return node;
      }
    },
    next : function(el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('next');
        return;
      }
      var node = el.nextSibling;
      if(node.nodeType && node.nodeType === 3){
        node = node.nextSibling;
        return node;
      }
    },
    closest : function(selector, el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('closest');
        return;
      }
      var doms, targetDom;
      var isSame = function(doms, el){
        var i = 0, len = doms.length;
        for(i; i<len; i++){
          if(doms[i].isEqualNode(el)){
            return doms[i];
          }
        }
        return false;
      };
      var traversal = function(el, selector){
        doms = bb.domAll(el.parentNode, selector);
        targetDom = isSame(doms, el);
        while(!targetDom){
          el = el.parentNode;
          if(el != null && el.nodeType == el.DOCUMENT_NODE){
            return false;
          }
          traversal(el, selector);
        }

        return targetDom;
      };

      return traversal(el, selector);
    },
    offset : function(el){
      if (!el) el = this.element;
      if(!this.isElement(el)){
        Bb.eleNoInfo('offset');
        return;
      }
      var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
      var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

      var rect = el.getBoundingClientRect();
      return {
        l: rect.left + sl,
        t: rect.top + st,
        w: el.offsetWidth,
        h: el.offsetHeight
      };
    }
  };

  var parseArg = function (url, data, fnSuc, dataType) {
    if (typeof(data) == 'function') {
      dataType = fnSuc;
      fnSuc = data;
      data = undefined;
    }
    if (typeof(fnSuc) != 'function') {
      dataType = fnSuc;
      fnSuc = undefined;
    }
    return {
      url: url,
      data: data,
      fnSuc: fnSuc,
      dataType: dataType
    };
  };

  Bb.prototype.init.prototype = Bb.prototype;

  Bb.eleNoInfo = function(fnName){
    console.warn('$bb.' + fnName + ' Function 需要el参数, el参数必须是DOM Element');
  };

  window.$$ = window.$bb = Bb;
  window.$_ = Bb.utils;
})(window, document);
