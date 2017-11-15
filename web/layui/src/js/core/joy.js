var Joy = Joy || {};

/**
 * 主程序
 */
(function(window, document){
  JoyNow = {
    config : {},
    init   : function(){
      this.config = this.configs();
      $("footer").append(this.config.APP_NAME);

    },
    configs: function(){
      return Joy.Config;
    }
  }
  window.$joy = JoyNow;
})(window, document);
