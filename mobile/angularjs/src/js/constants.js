'use strict';

angular.
  module('bb').
  constant('Constants', {
    'DEV'         : false,
    'APP_NAME'    : 'Betterlife Front UI',
    'App_Version' : '1.0.0',
    'PAGE_SIZE'   : 10,
    'CURRENT_PAGE': 1,
    'SERVER_RUN'  : '',
    'SERVER_TEST' : '',
    'USERNAME'    : 'skygreen2001',
    // LAYOUT:布局显示
    //   1:顶部点击右侧菜单下拉，标题居左，左侧显示logo
    //   2:顶部点击右侧菜单左拉，标题居中，左侧有导航
    'LAYOUT'      : 1
  });
