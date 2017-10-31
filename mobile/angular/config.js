'use strict';

module.exports = function(config) {
  /**
   * 是否开发模式, 在开发模式下
   * -.不清除运行路径下的文件
   * -.不编译文件
   * [说明]:
   *      在开发时，修改css或者js文件会重新编译和加载比较慢，因此希望在正式运行路径下编写css和js文件，最后再放在开发要求路径下，再编译发布在正式服务器上
   */
  config.isDev    = false,

  /**
   * 是否清理复制图片到目标路径
   */
  config.isImage  = true,

  /**
   * The output directory.
   *
   * @property config.dest
   * @type {String}
   */
  config.dest = 'www';

  //
  // Development web server
  //

  /**
   * Development server config.
   *
   * @type {Boolean}
   * @property config.server
   *
   * @example Disable development server
   *   config.server = false;
   */

  /**
   * The host name where to bind development server.
   *
   * @property config.server.host
   * @type {String}
   */
  config.server.host = '127.0.0.1';

  /**
   * The port where development server will to listen.
   *
   * @property config.server.port
   * @type {String}
   */
  config.server.port = '9000';


  //
  // 3rd party components
  //

  /**
   * Vendor Css (appended on compile time)
   *
   * @property config.vendor.css.append
   * @type {Array}
   */
  // config.vendor.css.push('./bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-hover.css');
  // config.vendor.css.push('./bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-base.css');
  // config.vendor.css.push('./bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-desktop.css');
  // config.vendor.css.push('./bower_components/jquery-weui/dist/lib/weui.min.css');
  // config.vendor.css.push('./bower_components/jquery-weui/dist/css/jquery-weui.min.css');


  /**
   * Vendor Javascripts
   *
   * @property config.vendor.js
   * @type {Array}
   */
  //浏览器兼容性Javascript原生对象函数支持
  config.vendor.js.push('./bower_components/js-polyfills/polyfill.min.js');
  config.vendor.js.push('./bower_components/js-polyfills/web.min.js');

  config.vendor.js.push('./bower_components/angular-resource/angular-resource.min.js');
  config.vendor.js.push('./bower_components/ngstorage/ngStorage.min.js');
  config.vendor.js.push('./bower_components/angular-cookies/angular-cookies.min.js');
  config.vendor.js.push('./bower_components/angular-animate/angular-animate.min.js');

  // config.vendor.js.push('./bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js');
  config.vendor.js.push('./bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.js');

  // jQuery WeUI 相关组件
  // config.vendor.js.push('./bower_components/jquery-weui/dist/lib/jquery-2.1.4.js');
  config.vendor.js.push('./bower_components/jquery/dist/jquery.js');
  config.vendor.js.push('./bower_components/jquery-weui/dist/js/jquery-weui.min.js');

  <!-- 如果使用了某些拓展插件还需要额外的JS -->
  config.vendor.js.push('./bower_components/jquery-weui/dist/js/swiper.min.js');
  config.vendor.js.push('./bower_components/jquery-weui/dist/js/city-picker.min.js');


};
