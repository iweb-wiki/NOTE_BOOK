react 中的 setState 特点：

1.是异步操作函数；

2.组件在还没有渲染之前, this.setState 还没有被调用；

3.批量执行 State 转变时让 DOM 渲染更快(相对比一个一个的 setState 的来的快)。

传入 setState 函数的第二个参数的作用是什么？

该函数会在 setState 函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成：

this.setState(
{ username: 'tylermcginnis33' },
() => console.log('setState has finished and the component has re-rendered.')
)
