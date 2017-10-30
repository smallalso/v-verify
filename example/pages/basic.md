### 基本示例

### 开始之前

```javascript
import vVerify from 'v-verify'

Vue.use(vVerify, {
  mode: 'insert',
  errorClass: 'example-error',
  errorForm: 'example-form-error',
  errorIcon: 'icon-warn iconfont',
  validators: { // 自定义验证器
    zing: (value) => {
      return /^[a-zA-Z0-9_-]+@zing\\.com$/.test(value)
    }
  },
  messages: { // 验证器消息提示
    zing: (name) => `${name}必须以@zing.com结尾`
  }
})
```

#### 1.使用 `input` `blur` 触发验证

<vuep template="#demo1"></vuep>
<script v-pre type="text/x-template" id="demo1">
  <template>
    <div>
      <h3 class="example-main-color">date - input</h3>
      <div>
        <input class="example-input"
               v-verify.input.blur="'required|date'"
               placeholder="YYYY-MM-DD"/>
      </div>
    </div>
  </template>
</script>

#### 2.使用 `initial` 初始化验证并使用 `change` 触发验证

<vuep template="#demo2"></vuep>
<script v-pre type="text/x-template" id="demo2">
  <template>
    <div>
      <h3 class="example-main-color">date - initial</h3>
      <div>
        <input v-model="time"
               class="example-input"
               v-verify.initial.change="'required|date:DD/MM/YYYY'"
               placeholder="DD/MM/YYYY"/>
      </div>
    </div>
  </template>
  <script>
    module.exports = {
      data () {
        return {
          time: '2018-09-24'
        }
      }
    }
  </script>
</script>

#### 3.使用tip模式展示 错误信息

<vuep template="#demo3"></vuep>
<script v-pre type="text/x-template" id="demo3">
  <template>
    <div>
      <h3 class="example-main-color">date - initial</h3>
      <div>
        <input v-model="time"
               class="example-input"
               v-verify.initial.change="{
                 regs: 'required|date:DD/MM/YYYY',
                 mode: 'tip',
                 name: '日期'
                }"
               placeholder="DD/MM/YYYY"/>
      </div>
    </div>
  </template>
  <script>
    module.exports = {
      data () {
        return {
          time: '2018-09-24'
        }
      }
    }
  </script>
</script>

#### 4.使用自定义验证器

<vuep template="#demo4"></vuep>
<script v-pre type="text/x-template" id="demo4">
  <template>
    <div>
      <h3 class="example-main-color">date - initial</h3>
      <div>
        <input v-model="email"
               class="example-input"
               v-verify.initial.change.blur="{
                 regs: 'required|email|zing',
                 name: '邮箱'
               }"
               placeholder="xxx@zing.com"/>
      </div>
    </div>
  </template>
  <script>
    module.exports = {
      data () {
        return {
          email: 'hu141418@gmail.com'
        }
      }
    }
  </script>
</script>

### 使用指令修饰符

v-verify 可以添加 `vue` 指令修饰符 focus 、input 、blur 、change 、 initial 等修饰符表示验证器触发等时机


### 指令表达式

v－verify 表达式值可以为一组字符串表示的验证器，多个验证器之间用符号 `|` 分割，指令v-verify将依次验证分割后的验证器。


### 使用自定义属性

属性 `data-verify-dom` 表示当验证不通过时，提示消息展示的dom容器,其值为选择器

> 这里的 `data-verify-dom` 和 `input` 必需拥有同一个父元素 不然将无法查找到 data-verify-dom