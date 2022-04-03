# 欢迎来到 Betterlife.Front 框架

下载地址：https://github.com/skygreen2001/betterlife.front

## 简介说明

专注于前端开发，并提供可供快速开发使用的通用前端模版

框架目标定义分为三部分:

* 专用于移动APP内嵌的html5 UI界面, 也可用于html5 web页面；可嵌入微信；手机端优先。
  - Vue.js + Quasar

* 专用于Web开发的html5自适应界面，用于Pc电脑端，也可用于嵌入原生应用的[iOS,Andriod]的Html5页面；可嵌入微信；Pc Web端优先。
  - jQuery + Bootstrap3                           [ IE9  + ]
  - Ant Design Pro                                [ IE9  + ]
  - Vue.js + iView + HTML5 Boilerplate            [ IE9  + ]
  - AngularJS + (Semantic-UI | Angular Material)  [ IE11 + ]
  - jQuery + Layui                                [ IE9  + ]

* Html5开发生成Native原生应用[iOS,Andriod]
  - `React Native`  [React + React Material]
  - `AngularJS`     [AngularJS + Mobile Angular UI + jQuery WeUI]
  - `Vue.js`        [Vue.js + ( iView | Framework7)]
  - `Angular`       [Angular + Typescript + Ionic]
  - `Native Script` [Native Script+ NativeScript UI]

## 准备工作

* **安装git工具**

  百度或者谷歌下载Git和图形化Git GUI工具

* **通过Github官网下载**

  官网地址: https://github.com/skygreen2001/betterlife.front
  ```
  > git clone https://github.com/skygreen2001/betterlife.front
  > git clone git@github.com:skygreen2001/betterlife.front.git
  ```

* **安装开发工具 IDE**

  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Atom](https://atom.io/)
  - [Atom IDE](https://ide.atom.io/)
    - `Atom` 推荐安装 Package

      ```
      > apm install atom-beautify file-icons markdown-themeable-pdf
      ```
  - [Sublime](http://www.sublimetext.com)

* **运行环境**

  - 需安装有Node.js环境

    ```
    > sudo npm install http-server -g
    > http-server -p 8000
    ```
    说明: 开发需用到Node.js环境

  - Npx
    - 开启静态服务器

      ```
      > npx http-server
      ```
    - 指定node版本来运行npm scripts

      ```
      > npx -p node@8 npm run build
      ```

  - 需安装有Python环境:

    ```
    > python -m SimpleHTTPServer 8000
    ```
    说明: 一般Mac或linux系统已经安装有python

## 学习资料

- 0⃣️
  * Code Guide     : http://alloyteam.github.io/CodeGuide/
  * jQuery         : https://learn.jquery.com/
  * Bootstrap      : http://getbootstrap.com/
    * By Parcel    : https://getbootstrap.com/docs/5.1/getting-started/parcel/
    * Parcel       : https://en.parceljs.org/getting_started.html
  * Material Design: https://material.io/
  * Ant Design     : https://ant.design
  * Svelte         : https://www.sveltejs.cn/

- 🔰
  - Vue.js
    * VueJS     : https://cn.vuejs.org/
    * Vuex      : https://vuex.vuejs.org/
    * iView     : https://www.iviewui.com/
    * uni-app   : https://uniapp.dcloud.io/
    * Quasar    : https://quasar.dev
    * Quasar(zh): http://www.quasarchs.com/

  - Vue UI
    - Mobile Only
      * Vue Native: https://vue-native.io/
      * Framework7: http://framework7.io/
      * Meteor    : https://www.meteor.com/
      * Ionic     : http://ionicframework.com/

    - Web 优先
      * VueStrap    : http://yuche.github.io/vue-strap/
      * BV          : https://bootstrap-vue.js.org/
      * AT UI       : https://at-ui.github.io/at-ui
      * Vue Material: https://vuematerial.io/
      * uiv         : https://uiv.wxsm.space/
      * Vuetify     : https://vuetifyjs.com/
      * Buefy       : https://buefy.github.io
      * FISH-UI     : https://myliang.github.io/fish-ui/
      * iView admin : https://github.com/iview/iview-admin
      * Vue Antd    : https://github.com/okoala/vue-antd

    - Mobile 优先
      * MUI       : http://dev.dcloud.net.cn/mui/
      * Onsen UI  : https://onsen.io/
      * Vant      : https://youzan.github.io/vant/
      * Muse UI   : http://www.muse-ui.org/
      * Vue 全家桶 : https://github.com/hzzly/xyy-vue
      * vue-was   : https://github.com/VincentPat/vue-was
      * Mint UI   : https://mint-ui.github.io
      * VUM       : http://getvum.com/
      * vue-carbon: https://myronliu347.github.io/vue-carbon/#!/
      * WDUI      : https://wdfe.github.io/wdui/
      * Keen-UI   : https://josephuspaye.github.io/Keen-UI/
      * VUM       : http://getvum.com/
      * Vue-MDL   : https://posva.net/vue-mdl-docs/

  - 小程序
    * iView weapp: https://weapp.iviewui.com/
    * vant       : https://youzan.github.io/vant-weapp/
    * mpvue      : http://mpvue.com/
    * vux        : https://vux.li/
    * YDUI Vue   : http://vue.ydui.org/

- ⚛️
  - React
    * React 官方网站    : https://facebook.github.io/react/
    * Material-UI设计  : http://www.material-ui.com/
    * React 入门教程    : https://hulufei.gitbooks.io/react-tutorial/content/introduction.html
    * Preact           : https://preactjs.com/
    * React全家桶教程    : https://github.com/brickspert/react-family
    * React全家桶实战    : https://github.com/Juliiii/React-Cnode
    * Create React App : https://facebook.github.io/create-react-app/  
    * React Starter Kit: https://reactstarter.com/

  - Mobile Only
    * React Native: http://facebook.github.io/react-native/
    * Meteor      : https://www.meteor.com/
    * Framework7  : http://framework7.io/

  - Web 优先
    * Ant Design Pro   : https://pro.ant.design/
    * Semantic UI React: https://react.semantic-ui.com/
    * 飞冰              : https://alibaba.github.io/ice
    * Blueprint	       : https://blueprintjs.com/
    * React Toolbox    : http://react-toolbox.io/
    * Amaze UI React   : http://amazeui.org/react/

  - Mobile 优先
    * Onsen UI       : https://onsen.io/
    * Material-UI    : https://github.com/mui-org/material-ui
      - v0           : https://v0.material-ui.com/#/
      - bit share    : https://bit.dev/mui-org/material-ui
    * Fabric         : https://developer.microsoft.com/en-us/fabric
    * React-md       : https://react-md.mlaursen.com/
    * Grommet        : https://github.com/grommet/grommet
    * FUSION.JS      : https://fusionjs.com/
    * PrimeNG        : https://www.primefaces.org/
    * React Bootstrap: https://react-bootstrap.github.io
    
  - 小程序
    * Taro   : https://taro.aotu.io/
    * Remax  : https://remaxjs.org/
    * Nanachi: http://ued.qunar.com/nanachi-doc/

- 🅰️
  - Angular 1.*
    * AngularJS Github  : https://github.com/angular/angular.js
    * AngularJS 官方教程 : https://docs.angularjs.org/tutorial
    * Think in AngularJS: http://www.angularjs.cn/A0bz
    * AngularJS 初识     : https://docs.angularjs.org/guide/concepts
    * AngularJS 教程     : http://www.runoob.com/angularjs/angularjs-tutorial.html
    * 学习AngularJS 1.x  : https://hairui219.gitbooks.io/learning_angular/content/zh/index.html
    * AngularJS经验分享平台: http://docs.ngnice.com/
    * 极客学院            : http://wiki.jikexueyuan.com/project/angularjs/

    - Mobile 优先
      * MAUI        : http://mobileangularui.com/
      * UI Bootstrap: https://angular-ui.github.io/bootstrap/
      * AngularUI   : https://angular-ui.github.io/

  - Angular
    * Angular    : https://angular.io/
    * Angular 中文: https://angular.cn/
    * 大道至简:Angular2只有一个核心概念: http://www.angularjs.cn/A2Ar
    * awesome-angular-components   : https://github.com/brillout/awesome-angular-components

    - Mobile Only
      * Ionic : http://ionicframework.com/
      * Meteor: https://www.meteor.com/

    - Mobile 优先    
      * Onsen UI        : https://onsen.io/
      * Angular Material: https://material.angular.io/
      * ngx-bootstrap   : https://valor-software.com/ngx-bootstrap
      * Covalent        : https://teradata.github.io/covalent/

    - Web 优先
      - Ant Design of Angular: https://ng.ant.design
      - ng-bootstrap         : https://github.com/ng-bootstrap/ng-bootstrap
      - PrimeNG              : https://www.primefaces.org/
      - ng-semantic          : https://github.com/vladotesanovic/ngSemantic

- 🏆
  - Mobile 优先    
    * Onsen UI  : https://onsen.io/
    * Fronzen UI: http://frozenui.github.io/

  - Web 优先
    * Bootstrap  : http://getbootstrap.com/
    * Semantic   : https://semantic-ui.com/
    * Layui      : http://www.layui.com
    * Element    : http://element.eleme.io/ (饿了吗 - Vue.js 2.0)
    * Amaze UI   : http://amazeui.org/
    * uikit      : http://www.getuikit.net
    * ZUI        : http://zui.sexy/
    * H-ui       : http://www.h-ui.net/
    * AT UI      : https://at-ui.github.io/at-ui

  - 💬 [微信页面]
    - JqWeUI   : http://jqweui.com/
    - Chameleon: https://cml.js.org/
    - WePY     : https://wepyjs.github.io/wepy-docs
    - Megalo   : http://megalojs.org/#/quickstart
    - kbone    : https://developers.weixin.qq.com/miniprogram/dev/extended/kbone/
    - MPX      : https://didi.github.io/mpx/

- Css
  - PureCss: https://purecss.io/start/
  - tailwindcss: https://tailwindcss.com/
  - Bulma  : https://bulma.io/
  - PostCSS: https://postcss.org/

- 🔧
  - underscore  : http://underscorejs.org
  - lodash      : https://lodash.com/
  - Moment.js   : http://momentjs.com/
  - Ramda       : https://ramdajs.com/
  - ART-TEMPLATE: http://aui.github.io/art-template/zh-cn/
  - Immutable   : http://facebook.github.io/immutable-js/

-  🖥 [Customize IDE]
  - Electron      : http://electron.atom.io/
    - electron-vue: https://github.com/SimulatedGREG/electron-vue
  - Orion         : https://orionhub.org/
  - APICloud      : http://www.apicloud.com/  
  * React-desktop : http://reactdesktop.js.org/


- 资源
  - 掘金     : https://juejin.im/  
  - bit.blog: https://blog.bitsrc.io/
  - Share code components: https://bitsrc.io/

## 其他
  - [蚂蚁体验科技](https://xtech.antfin.com/)
    - [Ant Design](https://github.com/ant-design)
    - [AntV team](https://github.com/antvis): 蚂蚁金服 - 数据可视化
  - [GitHub最全的前端资源汇总仓库](https://github.com/FrontEndGitHub/FrontEndGitHub)
  - PhoneGap         : https://phonegap.com/
  - TypeScript       : http://www.typescriptlang.org/
  - Alpine.js        : https://alpinejs.dev/
  - 在线编辑器
    - [StackBlitz](https://stackblitz.com/): The fastest, most secure dev environment
    - [Code from anywhere](https://codesandbox.io/)
    - [jsfiddle](https://jsfiddle.net/)
  - Flutter          : https://flutter.io/
  - Blocs For Mac  : https://blocsapp.com/
  - Boilerplate    : https://html5boilerplate.com/
  - JSUI             : https://github.com/kitze/JSUI
  - web-starter-kit  : https://github.com/google/web-starter-kit
  - Backbone.js      : http://backbonejs.org/
  - Ember.Js         : https://emberjs.com/
  - Foundation       : https://foundation.zurb.com/sites/docs
  - Native Javascript: https://www.nativescript.org/
  - Polymer          : https://www.polymer-project.org
  - Riot             : http://riotjs.com/
  - elm              : http://elm-lang.org/
  - PM2 Runtime      : https://pm2.io/
  - FIS              : https://github.com/fis-dev/fis
  - WEEX             : http://weex.incubator.apache.org/

## Faq
  - How to run things locally: https://threejs.org/docs/index.html#manual/en/introduction/How-to-run-things-locally

  - Node 10 运行异常: Assertion 'args[1]->IsString()' failed
    - npm i natives (参考: https://github.com/karma-runner/karma/issues/3051)

  - Mac电脑运行gulp提示: ReferenceError: primordials is not defined

    - 安装nvm[Mac OS 下 NVM 的安装与使用]: https://www.jianshu.com/p/622ad36ee020
      - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
      - export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

    - nvm install 10.15.3
