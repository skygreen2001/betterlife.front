'use strict';

module.exports = function(config) {

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
  config.cordova = false;

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

  // config.less.paths.push('./vendor/less');
  config.vendor.cssbower.push('./bower_components/bootstrap/dist/css/*.min.css');
  config.vendor.cssbower.push('./bower_components/eonasdan-bootstrap-datetimepicker/build/css/*.min.css');

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
  config.vendor.js.push('./bower_components/js-polyfills/web.min.js');

  config.vendor.js.push('./bower_components/angular-resource/angular-resource.js');
  config.vendor.js.push('./bower_components/ngstorage/ngStorage.min.js');

  config.vendor.js.push('./bower_components/angular-animate/angular-animate.min.js');
  config.vendor.js.push('./bower_components/angular-touch/angular-touch.min.js');
  config.vendor.js.push('./bower_components/angular-bootstrap/ui-bootstrap.min.js');

  config.vendor.js.push('./bower_components/angular-scroll/angular-scroll.min.js');

  config.vendor.js.push('./bower_components/fastclick/lib/fastclick.js');
  config.vendor.js.push('./bower_components/ng-fastclick/dist/index.min.js');

  //文件上传
  config.vendor.js.push('./bower_components/ng-file-upload/ng-file-upload-shim.js');
  config.vendor.js.push('./bower_components/ng-file-upload/ng-file-upload.js');

  //日期选择器
  config.vendor.js.push('./bower_components/moment/min/moment-with-locales.min.js');
  config.vendor.js.push('./bower_components/jquery/dist/jquery.min.js');
  config.vendor.js.push('./bower_components/bootstrap/dist/js/bootstrap.min.js');
  config.vendor.js.push('./bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js');

  //分页显示
  config.vendor.js.push('./bower_components/angularUtils-pagination/dirPagination.js');

  /**
   * Vendor Fonts
   *
   * @property config.vendor.fonts
   * @type {Array}
   */

   // config.vendor.fonts.push('.bower_components/mylib/fonts/**/*');
  config.vendor.fonts.push('./bower_components/bootstrap/fonts/glyphicons-halflings-regular.*');
  config.vendor.fonts.push('./bower_components/icomoon-bower/fonts/icomoon.*');

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
