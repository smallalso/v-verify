### 基本示例

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

#### 3.使用dom容器展示 错误信息

添加 `data-verify-dom` 属性

<vuep template="#demo3"></vuep>
<script v-pre type="text/x-template" id="demo3">
  <template>
    <div>
      <h3 class="example-main-color">date - initial</h3>
      <div>
        <input v-model="time"
               class="example-input"
               v-verify.initial.change="'required|date:DD/MM/YYYY'"
               data-verify-dom=".example-error"
               placeholder="DD/MM/YYYY"/>
        <span class="example-error"></span>
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

#### 4.给input 错误时样式

添加 `data-verify-style` 属性

<vuep template="#demo4"></vuep>
<script v-pre type="text/x-template" id="demo4">
  <template>
    <div>
      <h3 class="example-main-color">date - initial</h3>
      <div>
        <input v-model="time"
               class="example-input"
               v-verify.initial.change="'required|date:DD/MM/YYYY'"
               data-verify-dom=".example-error"
               data-verify-style="example-input-error"
               placeholder="DD/MM/YYYY"/>
        <span class="example-error"></span>
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

### 使用指令修饰符

v-verify 可以添加 `vue` 指令修饰符 focus 、input 、blur 、change 、 initial 等修饰符表示验证器触发等时机


### 指令表达式

v－verify 表达式值可以为一组字符串表示的验证器，多个验证器之间用符号 `|` 分割，指令v-verify将依次验证分割后的验证器。


### 使用自定义属性

属性 `data-verify-dom` 表示当验证不通过时，提示消息展示的dom容器,其值为选择器

> 这里的 `data-verify-dom` 和 `input` 必需拥有同一个父元素 不然将无法查找到 data-verify-dom