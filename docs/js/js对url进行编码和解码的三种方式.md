# 聊一聊关于 js 对 url 编码和解码的三种方式

> javscript 有三个编码的函数，最古老是 escape()，现在已经不提倡使用了，另外还有 encodeURI()和 encodeURIComponent()

## escape 和 unescape

        实际上，escape不能直接用于URL编码，它会返回一个Unicode编码值，具体规则
