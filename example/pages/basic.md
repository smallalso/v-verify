### 日期示例

<vuep template="#demo1"></vuep>

<script v-pre type="text/x-template" id="demo1">
  <style>
    .text {
      color: #4fc08d;
    }
  </style>

  <template>
    <div>
      <h3 class="text">date - input</h3>
      <div>
        <input class="example-input"
               v-verify.input.blur="'required|date'"
               data-verify-dom=".date-error"
               placeholder="yyyy-mm-dd"/>
        <span class="date-error example-error"></span>
      </div>
      <h3 class="text">date - initial</h3>
      <div>
        <input v-model="time"
               class="example-input"
               v-verify.input.initial="'required|date'"
               data-verify-dom=".date-error"
               placeholder="yyyy-mm-dd"/>
        <span class="date-error example-error"></span>
      </div>
    </div>
  </template>

  <script>
    module.exports = {
      data () {
        return {
          time: '2017/09/09'
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