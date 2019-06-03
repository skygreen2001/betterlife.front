# 欢迎来到 Betterlife.Front 框架

下载地址：https://github.com/skygreen2001/betterlife.front

## 简介说明

专用于Web开发的html5自适应界面，可用于pc电脑端，也可用于嵌入原生应用的[ios,andriod]的html5页面；可嵌入微信；Pc Web端优先。

## 准备工作

* **安装git工具**

  百度或者谷歌下载Git和图形化Git GUI工具

* **通过Github官网下载**

  官网地址: https://github.com/skygreen2001/betterlife.front
  ```
  > git clone https://github.com/skygreen2001/betterlife.front
  > git clone git@github.com:skygreen2001/betterlife.front.git
  ```

* **安装NodeJs**

  下载地址: https://nodejs.org/en/download/

* **安装目录下运行**

  ```
  > sudo npm install
  ```
  [说明]
  > 安装目录是根目录下的src目录, 即本说明文件目录下


* **安装目录下运行**

  ```
  > sudo npm start
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


* **使用JS框架**

  - React
  - Ant Design Pro
  - 飞冰

  [![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)

## 框架目录定义

├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.js            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json

## 学习资料

- React
  * React 官方网站    : https://reactjs.org/
  * Material-UI设计  : http://www.material-ui.com/
  * React 入门教程    : https://hulufei.gitbooks.io/react-tutorial/content/introduction.html
  * Ant Design Pro   : https://pro.ant.design/
  * 飞冰              : https://alibaba.github.io/ice
  * React Starter Kit: https://reactstarter.com/
  * Gatsby           : https://www.gatsbyjs.org/
    - Build blazing fast、modern、beautiful、secure apps and websites with React
  * DvaJS            : https://dvajs.com/
  * UmiJS            : https://umijs.org/zh/

## 特性

- :gem: **优雅美观**：基于 Ant Design 体系精心设计
- :triangular_ruler: **常见设计模式**：提炼自中后台应用的典型页面和场景
- :rocket: **最新技术栈**：使用 React/umi/dva/antd 等前端前沿技术开发
- :iphone: **响应式**：针对不同屏幕大小设计
- :art: **主题**：可配置的主题满足多样化的品牌诉求
- :globe_with_meridians: **国际化**：内建业界通用的国际化方案
- :gear: **最佳实践**：良好的工程实践助您持续产出高质量代码
- :1234: **Mock 数据**：实用的本地数据调试方案
- :white_check_mark: **UI 测试**：自动化测试保障前端产品质量

## 模板

```
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单页
  - 分步表单页
  - 高级表单页
- 列表页
  - 查询表格
  - 标准列表
  - 卡片列表
  - 搜索列表（项目/应用/文章）
- 详情页
  - 基础详情页
  - 高级详情页
- 用户
  - 用户中心页
  - 用户设置页
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 帐户
  - 登录
  - 注册
  - 注册成功
```

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 参考

- 预览：http://preview.pro.ant.design
- 首页：http://pro.ant.design/index-cn
- 使用文档：http://pro.ant.design/docs/getting-started-cn
- 更新日志: http://pro.ant.design/docs/changelog-cn
- 常见问题：http://pro.ant.design/docs/faq-cn
- 国内镜像：http://ant-design-pro.gitee.io
