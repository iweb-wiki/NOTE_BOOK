---
title: angular学习2
tags: [angular学习]
date: 2017-03-26 08:54:36
---
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="//music.163.com/outchain/player?type=0&id=611811413&auto=1&height=32"></iframe>

### 作用域

-   angular的作用域，$scope 获取数据的作用域
-   如果我们想让一部分数据在整个应用里面需要共享，我们就把这个数据放在$rootScope上，然后整个应用都可以获取。

### 过滤器
>   过滤器的作用就是把数据格式化为我们需要的格式，在"{{}}"中使用"|"调用过滤器，使用":"传递参数。
-   angular为我们提供了很多过滤器：

-   date 日期

    ```
    {{time|date:'yyyy年MM月dd HH:mm:ss'}}
    //格式化日期格式
    ```
-   currency 货币

    ```
    {{1.2323 | currency : "￥" : 3}}
    //第一个参数是货币前显示的符号，第二个参数是小数保留的位数,
    //如果位数不够，会自动加0
    ```
-   limitTo 截取字符串

    ```
    {{str|limitTo:'3':'3'}}
    //第一个参数是截取字符的长度，第二个是开始的索引值
    ```
-   number  获取数据，对数据的小数点做精确
    ```
    {{1.2323|number:4}}
    //小数点位数不够会自动加0
    ```
-   filter  数据过滤
    ```
    {{arr|filter:"an"}}
    //得到数组中符号要求的项
    {{arr2|filter:{age:19} }}
    //为了避免冲突，后边需要加一个空格
    ```
-   json    将对象格式化为json字符串
    ```
    {{obj|json}}
    ```
-   upperCcase
    ```
    {{"wwqw"|uppercase}}
    ```
-   lowercase   
    ```
    {{"QQWW"|lowercase}}
    ```
-   orderBy  排序，
    ```
    {{obj|"age":true}}
    //按照age大小排序，默认是false升序，true是降序
    ```
### 自定义过滤器
-   自定义指令   app.directive
-   自定义过滤器  

    ```
    app.filter("filterName",function(){
        return function(arg){
            谁调用，谁就是第一参数
        }
    })
    ```


### 注入

>   angular提供了很多的服务，服务对应功能，功能对应函数，或者对象；

-   我们在使用这个服务的时候，就需要注入这个服务；

-   注入两种方式
1.   行内式
    -   第二个参数是数组，数组内最后一个参数是函数，
2.  推断式 

    -   第二个参数是函数，函数里面的参数就是需要依赖的服务名称。但是如果代码压缩，就会导致代码出问题。
-   推荐使用行内式，为了避免代码压缩，

### 服务

#####   $timeout

>   封装了settimeout延时定时器

#####   $interval

>   用来封装setinterval循环定时器的。

####    $location

>   angular封装了window.location对象。

    ```angular
    $location.protocol()
    //获取协议
    $location.host()
    //获取主机
    $location.port()
    //获取端口
    $location.path()
    //获取#/后面的地址
    $location.absUrl()
    //获取绝对路径
    $location.search()
    //获取?后面的值
    $location.hash()
    //获取到第二个#后跟的参数的哈希值；
    ```

####    $log

>   我们封装一些服务或者过滤器时，给用户一些提示，$log打印日志，是有级别的，下面是按照级别排序的。

1.   $log.error("错误提示");     错误级别,有代码行数提示
2.   $log.warn("警告提示")       警告级别，ie有兼容性问题
3.   $log.info("提示信息")           提示
4.   $log.log("打印输出")            打印
5.   $log.debug("dubug")          debug

####    $http

>   angular封装了xmlhttprequest对象，用来跟服务器进行数据交互的，一般是通过$http获取数据，然后把数据复制给$scope，然后通过模型自动传递

-   交互有get和post两种方式，有两个参数可以配置发送到服务器的参数，
-   使用get的时候，发送数据使用params
-   使用post方式的时候，发送数据使用data；
-   get请求没有请求头，post需要设置请求头header为"Content-Type:":"application/x-form-urlencoded"
    ```angular
    $http({
        url: "",
        method: "",
        data: "key=value",
        params: {key:value},
        header: {},
    }).success(function(data,status,responeHeader,config){
        //成功之后的回调函数,data是响应主体，status是状态码，responseHeader响应头，config前边传入的配置信息
    }).error(function(data,status,responseHeader,config){
        //失败时执行的回调函数
    })
    ```

### 跨域

>   一个站点去请求另一个站点，这两个站点不在同一个端口，域名，主机域名，只要有一个或多个不同，就属于跨域，
-   原生跨域
1.   jsonp
    -   原理：使用script发送请求，传递给服务器一个回调函数，服务器端返回一个回调函数的调用，因为使用的是script标签的src属性，所以这种方式只支持get方式请求，
    jsonp支持兼容程度高，只能使用get请求方式，由于get发送内容大小有限制，所以jsonp跨域 方式对放松文本方式有限制；

2.   cors
    这种跨域方式需要浏览器支持Access-Control-Allow-Origin，需要后台开放端口支持，支持post和get方式请求
