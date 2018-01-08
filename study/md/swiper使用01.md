---
title: swiper使用01
tags: []
date: 2017-04-01 19:18:05
---
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="//music.163.com/outchain/player?type=0&id=611811413&auto=1&height=32"></iframe>

##  Swiper是什么
>   常用于移动网站的内容触摸滑动
-   是纯javascript打造的滑动特效插件，面向手机平板等移动终端
-   能实现触屏焦点图，触屏tab切换，触屏多图切换等常用效果；
-   是一款轻量级的移动设备触控滑块的js框架，使用硬件加速过度，主要适用于移动端的网站，移动web app，native app,hybrid app.主要是为ios设计的，在android wp8系统也有着良好的用户体验，Swiper从3.0开始不再全面支持PC端。因此，如需在PC端上兼容更多浏览器，可以选择Swiper2.x(甚至兼容至IE7).

##  Swiper使用方法

-   首先需要引入文件，需要引入swiper.min.js和swiper.min.css.
-   如果页面中使用了jquery或者zepto.js，可以使用更轻的swiper.jquery.min.js

-   HTML内容

```HTML

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">slide1</div>
            <div class="swiper-slide">slide2</div>
            <div class="swiper-slide">slide3</div>
        </div>
        <!--分页器-->
        <div class="swiper-pagination"></div>
        <!--导航按钮-->
        <div class=""swiper-button-prev></div>
        <div class=""swiper-button-next></div>
        <!--滚动条-->
        <div class="swiper-scrollbar"></div>
        <!--导航等组件也可以放在container外部-->
    </div>

```
-   可以给swiper定义大小尺寸
```css
.swiper-container {
    width: 600px;
    height: 300px;
}
```

-   初始化swiper，最好挨着body闭合标签

```javascript
var swiper = new Swiper('.swiper-container',{
    direction: 'vertical',
    loop: true,
    //分页器
    pagination: '.swiper-pagination',
    //前进后退按钮
    nextBUtton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    //滚动条
    scrollbar: '.swiper-scrollbar'
});
``
- 如果不使用source map功能,最好把js文件最后一行的 //# sourceMappingURL=maps/swiper.min.js.map删掉,以免浏览器报错.

![](/images/swiper.png)

## 名词解释
-   Swiper  整个滑动对象,有时特指滑块释放后仍然正向移动的贴合边缘的过程.
-   container   Swiper的容器,里面包括滑动块(slides)的封套(wrapper),分页器(pagination),前进按钮等;
-   wrapper 触控的对象,可触摸区域,移动的块的集合,过渡时会随slide切换产生位移
-   slider  切换的滑块,可以包含文字,图片,html元素或另外一个swiper
-   pagination  分页器,指示slider的数量和当前活动的silder
-   active slide 活动滑块,即当前看到的(visible)slide,当可视slide不止一个时,默认最左边那个是活动滑块,
-  callback 回调函数,在某些情况下触发; 

##  Swiper初始化

>  new Swiper(swiperContainer,parameters)

-   用于初始化一个Swiper,返回初始化后的Swiper实例.
-   swiperContainer:必选,HTML元素或者string类型,Swiper容器的css选择器,例如".swiper-container"
-   parameters:可选参数;参数以对象形式传入