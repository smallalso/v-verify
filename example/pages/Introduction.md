### 介绍

**v-verify** 提供了少量的公共验证器、`insert` | `tip` 两种错误展示方法 和两个内置验证方法。

### 公共验证器

name | params | introduction
---- | -----  | -----------
required | 无 | 必填字段
date | format（YYYY-MM-DD、YYYY/MM/DD 等）| 指定格式填写日期
len | number(字符长度) | 字符长度必须为制定数字
max | number(字符长度) | 字符长度必须大于制定数字
min | number(字符长度) | 字符长度必须小于制定数字
email | 无 | 邮箱格式
numberic | 无 | 必须填写数字
identity | 无 | 中国身份证号验证

### 内置方法

Vue.$validator.verify(validator, value)

- validator: 验证器
- value: 需要验证等值

```javascript
<script>
    export default {
      data () { ... },
      methods: {
        verify() {
          this.$validator.verify('date:DD/MM/YYYY', '2018-09-07') // return false
        }
      }
    }
  </script>
```

Vue.$validator.verifyAll(name)

- name: 需要验证类别名称

该方法主要为了提交数据到服务器前再次验证所有需要验证到字段

<vuep template="#demo4"></vuep>

<script v-pre type="text/x-template" id="demo4">
  <style>
    .text {
      color: #4fc08d;
    }
  </style>

  <template>
    <div>
      <div>
        <label>日期</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required|date:YYYY/MM/DD',
                  submit: 'demo4',
                  name: '日期'
                }"
                placeholder="YYYY/MM/DD"/>
        </p>
      </div>

      <div>
        <label>电话</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required|numberic|len:11',
                  mode: 'tip',
                  submit: 'demo4',
                  name: '电话'
                }"
                placeholder="电话"/>
        </p>
      </div>

      <div>
        <label>姓名</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required',
                  submit: 'demo4',
                  name: '姓名'
                }"
                placeholder="姓名"/>
        </p>
      </div>

      <div>
        <button class="example-btn example-btn_default"
                @click="submitData">
          提交
        </button>
      </div> 
    </div>
  </template>

  <script>
    module.exports = {
      methods: {
        submitData() {
          const result = this.$validator.verifyAll('demo4')
          if (result.indexOf(false) > -1) {
            alert('抱歉！请按指定格式填写')
          } else {
            alert('填写成功')
          }
        }
      }
    }
  </script>
</script>

### tips提示框

tips 为默认的错误信息提示提示框


好了， 是不是很简单。快去看[基本示例](/#/basic)吧





