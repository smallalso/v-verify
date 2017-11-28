
## V-Verify

<img src="https://travis-ci.org/joinyi/v-verify.svg?branch=master">

<p align="center">
  <a href="https://joinyi.github.io/v-verify/" target="_blank">
    <img width="200" src="http://owgk3x2u9.bkt.clouddn.com/v-verify.svg" />
  </a>
</p>

v-verify 是 **vue.js** 的表单验证插件，它主要利用 `vue.js` 指令将验证逻辑放进 `html` 中，它主要针对用用户输入信息的验证处理。

<img height="500" src="http://owgk3x2u9.bkt.clouddn.com/QQ20171030-183337-HD.gif">
<img height="500" src="http://owgk3x2u9.bkt.clouddn.com/QQ20171030-184458-HD.gif">

### 特性

- 高度灵活、可配置（自主选择验证器触发的时机、自定义错误提示信息、自定义验证规则、自定义错误展示样式）。
- 轻便、逻辑简单、使用方便、打包后代码不到4kb。
- 支持初始化验证和提交时验证，提交数据时不用写任何验证逻辑
- 支持用在 `vue` 组件（components）中(组件必须有 `v-model` 指令才能生效)
- 支持根据 `v-verify` params 变化动态使用验证器)

### 安装

V-Verify 已经发布在 [npm](https://www.npmjs.com/package/v-verify), 可以使用 `npm` 和 `yarn` 安装，暂时不支持直接通过 `<script>` 在网页中引入。

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

### 使用

**v-verify** 和其他的 `vue` 插件一样，使用 `Vue.use()` 方法注册。

```javascript
import Vue form 'vue'
import vverify from 'v-verify'
Vue.use(vverify, config)
```

### 配置（config）

考虑到验证场景的高度个性化，**v-verify** 提供了比较少的公共验证器，你可以在 `v-verify` 定义你自己的验证器，如果和公共验证器重复，自定义的验证器将会覆盖公共验证器。

```javascript
Vue.use(vverify, {
  lang: 'zh_cn', // 提示语言 默认 中文
  mode: 'insert' | 'tip', // v-verify 提供了 tip 和 insert 两种错误展示方式
  errorClass: '', // 错误消息样式
  errorIcon: '', // String 错误提示 icon 样式
  errorForm: '', // 错误消息样式
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

验证器定义支持三种形式
- 正则表达式
- 正则表达式列表
- 函数，必须返回布尔值

当自定义了验证器，你最好提供对应的验证提示消息

|    Config Name    |       Default       |     Description    |
|-------------------|---------------------|--------------------|
| lang              |        zh_cn        |  消息提示语言，有 `zh_cn` 和 ｀en_us｀ 两种选择，默认 `zh_cn` |
| mode              |        insert       |  消息提示展示方式，有 ｀insert｀ 和 ｀tip｀ 两种展示方式，默认以全局 config 为准，当指令 `v-verify` 中有指定，则指令覆盖全局 config 中配置。|
| errorClass        |        null         |  消息提示的样式，如果为 null, 则为默认样式，当指令 `v-verify` 中有指定，则指令覆盖全局 config 中配置
| errorIcon         |        null         |  消息提示 `icon` 的样式，如果为 null, 则无icon，当指令 `v-verify` 中有指定，则指令覆盖全局 config 中配置|
| errorForm         |        null         |  errorForm（className） 样式将添加到 `v-verify` 指令上到dom元素上，当指令 `v-verify` 中有指定，则指令覆盖全局 config 中配置｜
|validators         |        null         | 自定义验证器支持三种形式 `正则表达式` `正则表达式列表` `函数(必须返回布尔值)` |
| messages          |        null         | 自定义验证器验证消息，和 `validators` 一一对应关系        |


### 自定义验证器

比如你说你有一个需求只能接受以 `zing.com` 结尾的公司邮箱，你就可以这样自定义

```javascript
Vue.use(vverify, {
  lang: 'zh-cn', // 提示语言
  mode: 'insert',
  errorClass: 'example-error',
  errorIcon: 'icon-warn iconfont',
  validators: { // 自定义验证器
    zing: (value) => {
      return /^[a-zA-Z0-9_-]+@zing\\.com$/.test(value)
    },
    ...
  },
  messages: { // 验证器消息提示
    zing: (filed) => `${filed}必须以@zing.com结尾`,
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

`v-verify` 的使用非常简单, 它提供了最多5个选项但只有 `regs` 是必需的

```html
<input class="example-input"
       v-verify.input.blur="{
         regs: 'required|date',
         mode: 'xxx',
         name: 'xxx',
         submit: 'xxx',
         style: 'xxx'
       }"
       placeholder="YYYY-MM-DD"/>
```

其中修饰符 `input` 和 `blur` 是 v-verify 提供的验证触发时机， 当指令 `v-verify` 加在 `vue` 组件上时，不需要添加触发时机修饰符， 但是必需要有 `v-model` 指令。

|  Param Name  | Required | Description |
|--------|----------|-------------|
| regs   | 是       | 验证器列表 以符号 竖号 分隔  |
| mode   | 否       | 验证消息提示，将覆盖全局配置 |
| name   | 否       | 字段名称，会展示在验证消息中 |
| submit | 否       | 当需要在提交到服务器前进行二次验证，必需要有submit属性，它的作用相当于标示验证器，具体看[文档](https://joinyi.github.io/v-verify/#/submit) |
|style   | 否        |将覆盖 全局 errorForm 配置 |

> 欢迎使用，如果有好的建议或issue,欢迎一起讨论。

好了， 是不是很简单。快去看[基本用例](https://joinyi.github.io/v-verify/#/basic)吧
