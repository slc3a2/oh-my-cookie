## oh-my-cookie

> 一个用于导出，增删改查`cookie`、`sessionstorage`、`localstorage`的 Chrome 扩展

<div style='text-align:center;'><img width='600px' height='350px;' src='https://i.loli.net/2020/05/19/95tvnW1rHmRgNwu.png' alt='example image'/></div>

## 介绍

Chrome 扩展技术基于`css`，`html`，`javascript`，并附加一些 chrome 提供的用来扩展 chrome 浏览器的 api。你也可以使用现代 mvvm 框架进行开发，例如本项目基于`vue@2.5.2`，最后生成构建后可直接被浏览器解析的 js 用于部署。与常规 web 开发不同，需要自行调整 webpack 配置，或使用开源脚手架，这里推荐一款基本 vue-cli 的扩展脚手架工具为 [vtemp-chrome-extension](https://github.com/kinglisky/vtemp-chrome-extension)。更多内容参考文档自己摸索吧。

## 资源

- [谷歌商店安装](https://chrome.google.com/webstore/detail/ohmycookie/edkfjjgklckogiepbhmmdlaohebiaigm?hl=zh-CN)
- [国内镜像安装](https://www.chromefor.com/ohmycookie_v1-1-6/)
- [官方文档](https://developer.chrome.com/extensions/overview)
- [国内镜像文档](https://open.chrome.360.cn/extension_dev/overview.html)

## 开始

```shell
cd ./template
# 安装依赖
yarn
# dev后会监测代码变化，有变化会重新打包，然后会在 template 目录中生成build文件夹，把根目录的./template/manifest.json复制到build中，就可以在浏览器中安装了
npm run dev
```

## 安装

- 打开 Chrome，进入地址：`chrome://extensions/`
- 打开右上角开发者开关，点击左上角`加载已解压扩展程序`
- 选择上一步得到的`build`项目文件夹即可

## 版本

- **v1.0.1**

  1.增加全部删除`cookie`功能

  2.增加商店评分链接

- **v1.1.1**

  1.增加`localStorage`和`sessionStorage`管理

  2.调整并优化操作界面

- **v1.1.2**

  1.调整扩展权限，以达到扩展商店快速审核标准

- **v1.1.3**

  1.删除多余的权限，用于快速发布到谷歌商店

- **v1.1.4**

  1.新增 `cookie` 过期时间编辑组件

  2.支持在页面加载过程中，读取 `cookie`

  3.新增信息操作后回显

  4.提醒简化，等若干细节优化

- **v1.1.5**

  1.新增创建`cookie`、`localStorage`和`sessionStorage`功能

  2.新增可以修改国际化文案功能
