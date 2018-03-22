# 聊一聊关于js对url编码和解码的三种方式

> javscript有三个编码的函数，最古老是escape()，现在已经不提倡使用了，另外还有encodeURI()和encodeURIComponent()

## escape和unescape

        实际上，escape不能直接用于URL编码，它会返回一个Unicode编码值，具体规则