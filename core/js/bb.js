/**
 * Betterlife JavaScript Library
 * Copyright (c) 2016 skygreen2001@gmail.com
 * @see APICloud script/app.js
 *
 * @author skygreen2001 skygreen2001@gmail.com
 */
(function(window){
  var ua = navigator.userAgent.toLowerCase();
  var bb =  {
    ua      : navigator.userAgent.toLowerCase(),
    browser : {
      trident : /trident/.test(ua),//IE内核
      mobile  : !!ua.match(/applewebkit.*mobile.*/) || !!ua.match(/applewebkit/),
      android : /android/.test(ua) || /linux/.test(ua),
      ios     : !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
    },
    byId : function(id){
      return document.getElementById(id);
    },
    attr : function(el, name, value){
      if(!this.isElement(el)){
        eleNoInfo('attr');
        return;
      }
      if(arguments.length == 2){
        return el.getAttribute(name);
      }else if(arguments.length == 3){
        el.setAttribute(name, value);
        return el;
      }
    },
    dom : function(el, selector){
      if(arguments.length === 1 && typeof arguments[0] == 'string'){
        if(document.querySelector){
          return document.querySelector(arguments[0]);
        }
      }else if(arguments.length === 2){
        if(el.querySelector){
          return el.querySelector(selector);
        }
      }
    },
    prepend : function(el, html){
      if(!this.isElement(el)){
        eleNoInfo('prepend');
        return;
      }
      el.insertAdjacentHTML('afterbegin', html);
      return el;
    },
    append : function(el, html){
      if(!this.isElement(el)){
        eleNoInfo('append');
        return;
      }
      el.insertAdjacentHTML('beforeend', html);
      return el;
    },
    before : function(el, html){
      if(!this.isElement(el)){
        eleNoInfo('before');
        return;
      }
      el.insertAdjacentHTML('beforebegin', html);
      return el;
    },
    after : function(el, html){
      if(!this.isElement(el)){
        eleNoInfo('after');
        return;
      }
      el.insertAdjacentHTML('afterend', html);
      return el;
    },
    html : function(el, html){
      if(!this.isElement(el)){
        eleNoInfo('html');
        return;
      }
      if(arguments.length === 1){
        return el.innerHTML;
      }else if(arguments.length === 2){
        el.innerHTML = html;
        return el;
      }
    },
    text : function(el, txt){
      if(!this.isElement(el)){
        eleNoInfo('text');
        return;
      }
      if(arguments.length === 1){
        return el.textContent;
      }else if(arguments.length === 2){
        el.textContent = txt;
        return el;
      }
    },
    val : function(el, val){
      if(!this.isElement(el)){
        eleNoInfo('val');
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
    css : function(el, css){
      if(!this.isElement(el)){
        eleNoInfo('css');
        return;
      }
      if(typeof css == 'string' && css.indexOf(':') > 0){
        el.style && (el.style.cssText += ';' + css);
      }
    },
    cssVal : function(el, prop){
      if(!this.isElement(el)){
        eleNoInfo('cssVal');
        return;
      }
      if(arguments.length === 2){
        var computedStyle = window.getComputedStyle(el, null);
        return computedStyle.getPropertyValue(prop);
      }
    },
    jsonToStr : function(json){
      if(typeof json === 'object'){
        return JSON && JSON.stringify(json);
      }
    },
    strToJson : function(str){
      if(typeof str === 'string'){
        return JSON && JSON.parse(str);
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
    contains : function(parent,el){
      var mark = false;
      if(el === parent){
        mark = true;
        return mark;
      }else{
        do{
          el = el.parentNode;
          if(el === parent){
            mark = true;
            return mark;
          }
        }while(el === document.body || el === document.documentElement);

        return mark;
      }

    },
    remove : function(el){
      if(el && el.parentNode){
        el.parentNode.removeChild(el);
      }
    },
    removeAttr : function(el, name){
      if(!this.isElement(el)){
        eleNoInfo('removeAttr');
        return;
      }
      if(arguments.length === 2){
        el.removeAttribute(name);
      }
    },
    hasCls : function(el, cls){
      if(!this.isElement(el)){
        eleNoInfo('hasCls');
        return;
      }
      if(el.className.indexOf(cls) > -1){
        return true;
      }else{
        return false;
      }
    },
    addCls : function(el, cls){
      if(!this.isElement(el)){
        eleNoInfo('addCls');
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
        eleNoInfo('removeCls');
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
    toggleCls : function(el, cls){
      if(!this.isElement(el)){
        eleNoInfo('toggleCls');
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
    isEmptyObject : function(obj){
      if(JSON.stringify(obj) === '{}'){
        return true;
      }
      return false;
    },
    addEvt : function(el, name, fn, useCapture){
      if(!this.isElement(el)){
        eleNoInfo('addEvt');
        return;
      }
      useCapture = useCapture || false;
      if(el.addEventListener) {
        el.addEventListener(name, fn, useCapture);
      }
    },
    rmEvt : function(el, name, fn, useCapture){
      if(!this.isElement(el)){
        eleNoInfo('rmEvt');
        return;
      }
      useCapture = useCapture || false;
      if (el.removeEventListener) {
        el.removeEventListener(name, fn, useCapture);
      }
    },
    one : function(el, name, fn, useCapture){
      if(!this.isElement(el)){
        eleNoInfo('one');
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
    domAll : function(el, selector){
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
    first : function(el, selector){
      if(arguments.length === 1){
        if(!this.isElement(el)){
          eleNoInfo('first');
          return;
        }
        return el.children[0];
      }
      if(arguments.length === 2){
        return this.dom(el, selector+':first-child');
      }
    },
    last : function(el, selector){
      if(arguments.length === 1){
        if(!this.isElement(el)){
          eleNoInfo('last');
          return;
        }
        var children = el.children;
        return children[children.length - 1];
      }
      if(arguments.length === 2){
        return this.dom(el, selector+':last-child');
      }
    },
    eq : function(el, index){
      return this.dom(el, ':nth-child('+ index +')');
    },
    not : function(el, selector){
      return this.domAll(el, ':not('+ selector +')');
    },
    prev : function(el){
      if(!this.isElement(el)){
        eleNoInfo('prev');
        return;
      }
      var node = el.previousSibling;
      if(node.nodeType && node.nodeType === 3){
        node = node.previousSibling;
        return node;
      }
    },
    next : function(el){
      if(!this.isElement(el)){
        eleNoInfo('next');
        return;
      }
      var node = el.nextSibling;
      if(node.nodeType && node.nodeType === 3){
        node = node.nextSibling;
        return node;
      }
    },
    closest : function(el, selector){
      if(!this.isElement(el)){
        eleNoInfo('closest');
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
      if(!this.isElement(el)){
        eleNoInfo('offset');
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
    },
    setStorage : function(key, value){
      if(arguments.length === 2){
        var v = value;
        if(typeof v == 'object'){
          v = JSON.stringify(v);
          v = 'obj-'+ v;
        }else{
          v = 'str-'+ v;
        }
        var ls = bbStorage();
        if(ls){
          ls.setItem(key, v);
        }
      }
    },
    getStorage : function(key){
      var ls = bbStorage();
      if(ls){
        var v = ls.getItem(key);
        if(!v){return;}
        if(v.indexOf('obj-') === 0){
          v = v.slice(4);
          return JSON.parse(v);
        }else if(v.indexOf('str-') === 0){
          return v.slice(4);
        }
      }
    },
    rmStorage : function(key){
      var ls = bbStorage();
      if(ls && key){
        ls.removeItem(key);
      }
    },
    clearStorage : function(){
      var ls = bbStorage();
      if(ls){
        ls.clear();
      }
    }
  };

  //手机存储 html5 缓存模式
  var bbStorage = function(){
    var ls = window.localStorage;
    if((/android/gi).test(navigator.appVersion)){
       ls = os.localStorage();
    }
    return ls;
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
  }

  var eleNoInfo = function(fnName){
    console.warn('$bb.' + fnName + ' Function need el param, el param must be DOM Element');
  }

/*end*/
  window.$bb = bb;
  window.$$ = $bb;
})(window);
