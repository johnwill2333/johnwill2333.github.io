---
id: 1
title: Vue3 响应式原理
date: 2026-03-01
summary: 通过 Proxy 实现数据响应式。
---

## Vue3 响应式原理
Vue3 使用 `Proxy` 来劫持数据读取与设置操作，让数据变化自动触发组件更新。

```js
const state = new Proxy({ count: 0 }, {
  set(target, key, value) {
    console.log('数据改变:', key, value)
    target[key] = value
  }
})
state.count++
