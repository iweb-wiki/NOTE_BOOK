## 安装

`npm install -g gatsby`

## 创建demo

`gatsby new demo-name`

## 启动热更新

`gatsby develop`

Gatsby会自动启动热更新后台服务器，地址为: localhost:8000。现在如果修改了  src/pages 目录下的文件，保存后，会马上热更新到浏览器的页面上。

## 构建

` gatsby build`

Gatsby会在 public 目录下构建生产环境用的优化过的静态网站所需的一切静态资源、静态页面与js代码。如果要发布到自己的网站空间上，可以直接把此目录下面所有东西(除.map为后续的文件名的文件)丢过去自己的空间。如果有用过hexo的朋友们应该会比较熟悉，目录结构类似。 

## 本地服务器测试：

`gatsby serve`

此时Gatsby会启动静态网页服务器供你测试刚才“gatsby build”生成的静态网页