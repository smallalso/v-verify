### 安装

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
  lang: 'zh-cn', // 提示语言
  vtips: Function, // 自定义提示方法(v-verify提供了默认的弹窗，非必填项)
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

- language: `v-verify` 为公共验证器提供了 `zh-cn` 、`en-us`两种错误提示语言, 默认 `zh-cn`
- vtips: `v-verify` 提供了默认的验证器不通过时消息提时，当你自定义了将覆盖默认的

### 自定义验证器

比如你说你有一个需求只能接受以 `zing.com` 结尾的公司邮箱，你就可以这样自定义

```javascript
Vue.use(vverify, {
  lang: 'zh-cn', // 提示语言
  vtips: Function, // 自定义提示方法
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

在你自定义验证器之后就可以和公共验证器一样使用

```html
<input class="example-input"
       v-verify.input.blur="'required|date'"
       placeholder="YYYY-MM-DD"/>
```

好了， 是不是很简单。快去看[基本介绍](/#/introduction)吧
