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
   * 是否运行在手机上
   * -.不包括桌面运行所需的css和js库
   */
  config.isMobile = false,

  /**
   * 是否包含jquery及相关的组件
   */
  config.isJquery = true,

  /**
   * The output directory.
   *
   * @property config.dest
   * @type {String}
   */
  config.dest = 'www';

  /**
   * Whether to inject cordova script
   * into html.
   *
   * @property config.cordova
   * @type {Boolean}
   */
  if (!config.isMobile) config.cordova = false;

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
  config.server.port = '8000';

  //
  // Sources
  //

  /**
   * Less sources
   *
   * @property config.less.src
   * @type {Array}
   *
   * @default
   * 	 ['./src/less/app.less', './src/less/responsive.less']
   */

  // config.less.src.push('src/less/mystyle.less');

  /**
   * Less search paths
   *
   * @property config.less.paths
   * @type {Array}
   *
   * @default
   * 	 ['./src/less', './bower_components']
   */
  if(!config.isMobile) {
    // config.vendor.cssbower.push('./bower_components/bootstrap/dist/css/*.min.css*');
    // config.vendor.cssbower.push('./bower_components/eonasdan-bootstrap-datetimepicker/build/css/*.min.css');
  }

  //
  // 3rd party components
  //

  /**
   * Vendor Javascripts
   *
   * @property config.vendor.js
   * @type {Array}
   */
  //浏览器兼容性Javascript原生对象函数支持
  config.vendor.js.push('./bower_components/js-polyfills/polyfill.min.js');
  config.vendor.js.push('./bower_components/ngstorage/ngStorage.min.js');
  config.vendor.js.push('./bower_components/angular-cookies/angular-cookies.min.js');
  config.vendor.js.push('./bower_components/angular-animate/angular-animate.min.js');
  //分页显示
  config.vendor.js.push('./bower_components/angularUtils-pagination/dirPagination.js');
  config.vendor.js.push('./bower_components/angular-scroll/angular-scroll.min.js');

  if(config.isMobile) {
    config.vendor.js.push('./bower_components/angular-touch/angular-touch.min.js');

    config.vendor.js.push('./bower_components/fastclick/lib/fastclick.js');
    config.vendor.js.push('./bower_components/ng-fastclick/dist/index.min.js');
  } else {
    if(config.isJquery) config.vendor.js.push('./bower_components/jquery/dist/jquery.min.js');

    config.vendor.js.push('./bower_components/js-polyfills/web.min.js');
    // config.vendor.js.push('./bower_components/angular-bootstrap/ui-bootstrap.min.js');
    config.vendor.js.push('./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js');

    if(config.isJquery) {
      //日期选择器
      config.vendor.js.push('./bower_components/moment/min/moment-with-locales.min.js');
      config.vendor.js.push('./bower_components/bootstrap/dist/js/bootstrap.min.js');
      config.vendor.js.push('./bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js');

      //提示框
      config.vendor.js.push('./bower_components/bootbox/bootbox.js');

      //打开窗口显示图片
      config.vendor.js.push('./bower_components/jquery-colorbox/jquery.colorbox-min.js');
      config.vendor.js.push('./bower_components/angular-colorbox/js/angular-colorbox.js');

      //动画效果
      // config.vendor.js.push('./bower_components/particleground/jquery.particleground.min.js');
      config.vendor.js.push('./bower_components/jquery-smoove/dist/jquery.smoove.min.js');
      // config.vendor.cssbower.push('./bower_components/css3-animate-it/css/animations.css');
      // config.vendor.cssbower.push('./bower_components/css3-animate-it/css/animations-ie-fix.css');
      // config.vendor.js.push('./bower_components/css3-animate-it/js/css3-animate-it.js');
    }
  }

  //文件上传
  config.vendor.js.push('./bower_components/ng-file-upload/ng-file-upload-shim.js');
  config.vendor.js.push('./bower_components/ng-file-upload/ng-file-upload.js');

  /**
   * Vendor Fonts
   *
   * @property config.vendor.fonts
   * @type {Array}
   */
  if(!config.isMobile) {
    config.vendor.fonts.push('./bower_components/bootstrap/fonts/glyphicons-halflings-regular.*');
    config.vendor.fonts.push('./bower_components/icomoon-bower/fonts/icomoon.*');
  }

  /**
   * Vendor Css (prepended on compile time)
   *
   * @property config.vendor.css.prepend
   * @type {Array}
   */

  // config.vendor.css.prepend.push('.bower_components/mylib/mylib.css');

  /**
   * Vendor Css (appended on compile time)
   *
   * @property config.vendor.css.append
   * @type {Array}
   */

  // config.vendor.css.append.push('.bower_components/mylib/mylib.css');
};
