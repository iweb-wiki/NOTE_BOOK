# export那些事

> 相关的导出方法比较多，有时候，容易混淆，这里整理下

        require: node 和 es6 都支持的引入
        export / import : 只有es6 支持的导出引入
        module.exports / exports: 只有 node 支持的导出

## nodejs中的导出导入

- CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)

```
exports = module.exports = {};
```

- 其实require导出的内容是module.exports的指向的内存块内容，并不是exports的。
- 简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的。

## ES中的模块导出导入

- export、import可以有多个，export default仅有一个