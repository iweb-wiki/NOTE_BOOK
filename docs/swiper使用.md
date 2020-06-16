---
title: swiper使用
tags: []
date: 2017-04-01 19:18:05
---

## Swiper 是什么

> 常用于移动网站的内容触摸滑动

- 是纯 javascript 打造的滑动特效插件，面向手机平板等移动终端
- 能实现触屏焦点图，触屏 tab 切换，触屏多图切换等常用效果；
- 是一款轻量级的移动设备触控滑块的 js 框架，使用硬件加速过度，主要适用于移动端的网站，移动 web app，native app,hybrid app.主要是为 ios 设计的，在 android wp8 系统也有着良好的用户体验，Swiper 从 3.0 开始不再全面支持 PC 端。因此，如需在 PC 端上兼容更多浏览器，可以选择 Swiper2.x(甚至兼容至 IE7).

## Swiper 使用方法

- 首先需要引入文件，需要引入 swiper.min.js 和 swiper.min.css.
- 如果页面中使用了 jquery 或者 zepto.js，可以使用更轻的 swiper.jquery.min.js

- HTML 内容

```html
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slide1</div>
    <div class="swiper-slide">slide2</div>
    <div class="swiper-slide">slide3</div>
  </div>
  <!--分页器-->
  <div class="swiper-pagination"></div>
  <!--导航按钮-->
  <div class="" swiper-button-prev></div>
  <div class="" swiper-button-next></div>
  <!--滚动条-->
  <div class="swiper-scrollbar"></div>
  <!--导航等组件也可以放在container外部-->
</div>
```

- 可以给 swiper 定义大小尺寸

```css
.swiper-container {
  width: 600px;
  height: 300px;
}
```

- 初始化 swiper，最好挨着 body 闭合标签

```javascript
var swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  loop: true,
  //分页器
  pagination: '.swiper-pagination',
  //前进后退按钮
  nextBUtton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  //滚动条
  scrollbar: '.swiper-scrollbar',
});
```

- 如果不使用 source map 功能,最好把 js 文件最后一行的 //# sourceMappingURL=maps/swiper.min.js.map 删掉,以免浏览器报错.

## 名词解释

- Swiper 整个滑动对象,有时特指滑块释放后仍然正向移动的贴合边缘的过程.
- container Swiper 的容器,里面包括滑动块(slides)的封套(wrapper),分页器(pagination),前进按钮等;
- wrapper 触控的对象,可触摸区域,移动的块的集合,过渡时会随 slide 切换产生位移
- slider 切换的滑块,可以包含文字,图片,html 元素或另外一个 swiper
- pagination 分页器,指示 slider 的数量和当前活动的 silder
- active slide 活动滑块,即当前看到的(visible)slide,当可视 slide 不止一个时,默认最左边那个是活动滑块,
- callback 回调函数,在某些情况下触发;

## Swiper 初始化

> new Swiper(swiperContainer,parameters)

- 用于初始化一个 Swiper,返回初始化后的 Swiper 实例.
- swiperContainer:必选,HTML 元素或者 string 类型,Swiper 容器的 css 选择器,例如".swiper-container"
- parameters:可选参数;参数以对象形式传入

```

```
