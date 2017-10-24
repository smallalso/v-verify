
## V-Verify

<img src="https://travis-ci.org/joinyi/v-verify.svg?branch=master">

<p align="center">
  <a href="https://joinyi.github.io/v-verify/" target="_blank">
    <img width="200" src="http://owgk3x2u9.bkt.clouddn.com/v-verify.svg" />
  </a>
</p>

v-verify 是 **vue.js** 的表单验证插件，它主要利用 `vue.js` 指令将验证逻辑放进 `html` 中，它主要针对用用户输入信息的验证处理。

<img width="600" src="http://owgk3x2u9.bkt.clouddn.com/v-verify.jpg">

### 特性

- 高度灵活、可配置（自主选择验证器触发的时机、自定义错误提示信息、自定义验证规则、自定义错误展示样式）。
- 轻便、逻辑简单、使用方便、打包后代码不到4kb。
- 支持初始化验证和提交时验证，提交数据时不用写任何验证逻辑
- 支持用在input组件（components）中

### 安装

V-Verify 已经发布在 [npm](https://www.npmjs.com/package/v-verify), 可以使用 `npm` 和 `yarn` 安装，或者使用 `<script>` 直接在网页中引入。

### npm / yarn 安装

```bash
npm install --save v-verify

```

或者

```bash
yarn add v-verify

```
### 文档
https://joinyi.github.io/v-verify/

### 安装

**v-verify** 和其他的 `vue` 插件一样，使用 `Vue.use()` 方法注册。

```javascript
import Vue from 'vue'
import vverify from 'v-verify'
Vue.use(vverify, config)
```

### 配置（config）

考虑到验证场景的高度个性化，**v-verify** 提供了比较少的公共验证器，你可以在 `v-verify` 定义你自己的验证器，如果和公共验证器重复，自定义的验证器将会覆盖公共验证器。

```javascript
Vue.use(vverify, {
  validators: {
    email: RegExp|[RegExp, ...]|Function,
    ...
  }
})
```

验证器定义支持三种形式
- 正则表达式
- 正则表达式列表
- 函数，必须返回布尔值

当自定义了验证器，你最好提供对应的验证提示消息

```javascript
Vue.use(vverify, {
  lang: 'zh-cn', // 提示语言 默认 中文
  icon: '', // String 错误提示 icon 样式
  errorClass: '', // 错误消息样式
  mode: '', // v-verify 提供了 tip 和 insert 两种错误展示方式
  validators: { // 自定义验证器
    email: RegExp|[RegExp, ...]|Function,
    ...
  },
  messages: { // 验证器消息提示
    email: (filed) => `${filed}不符合指定邮箱格式`, // return 提示信息
    ...
  }
})
```
```

- language: `v-verify` 为公共验证器提供了 `zh-cn` 、`en-us`两种错误提示语言, 默认 `zh-cn`

### 自定义验证器

比如你说你有一个需求只能接受以 `zing.com` 结尾的公司邮箱，你就可以这样自定义

```javascript
Vue.use(vverify, {
  lang: 'zh-cn', // 提示语言 默认 中文
  icon: '', // String 错误提示 icon 样式
  errorClass: '', // 错误消息样式
  mode: '', // v-verify 提供了 tip 和 insert 两种错误展示方式
  validators: { // 自定义验证器
    email: RegExp|[RegExp, ...]|Function,
    ...
  },
  messages: { // 验证器消息提示
    email: (filed) => `${filed}不符合指定邮箱格式`, // return 提示信息
    ...
  }
})
```

```html
<input class="example-input"
       v-verify.input.blur="'required|email|zing'"
       placeholder="YYYY-MM-DD"/>
```

如果有参数， 可以在 `value` 后面直接加参数, 然后用符号 `:` 传参

```javascript
(value, params) => {
  ...
}
```

### 使用

在你自定义验证器之后就可以和公共验证器一样使用

```html
<input class="example-input"
       v-verify.input.blur="'required|date'"
       placeholder="YYYY-MM-DD"/>
```
