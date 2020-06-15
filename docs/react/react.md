## React 本质

1. UI=f(data)
1. react 中一切皆组件
1. 声明式编程

## state 和 props

1. prop

- 父组件传入的数据
- 不应该改变传入的 prop

1. state

- 组件内部的状态
- 只能通过 settate 改变自己在状态

- 尽量使用无状态组件,props 能搞定的，就不要用 state

## 生命周期

- 三种过程

1. mount
1. update (state change/props change)
1. unmount

- mount 过程

  getdefaultProps->getInitalState->componentWillMount->render->componentDidMount

- state 改变引起在 update

  shouldComponentUpdate->componentWillUpdate->render->componentDidUpdate

- 父组件想要重新 render 这个组件引起在 update

  componentWillReceive->shouldComponentUpdate->componentWillUpdate->render->componentDidUpdate

- 在 render 执行之前，state 和 props 的改变都不不会生效
- v16 之后，render 之前生命周期都可能执行多次，所以，这些函数最好是纯函数

## 尽量使用无状态组件

- 尽量使少数组件控制状态
- 将状态控制尽量边缘化

## 高阶组件

- HOC Higher-Order-Component

- 功能复用

## 组件通信（不考虑 redux）

1. 父子

   1. props 传值
   1. refs 调用方法
   1. callback,子组件传值到父组件
   1. promise，和 callback 一样

1) 兄弟

   1. 父组件声明两个 function，通过父组件来通信

1) 任意位置的两个组件

   1. context
   1. 全局变量
