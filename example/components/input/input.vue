<template>
  <div class="ui-form ui-form-item"
       :class="[{ 'ui-border': border },
                { 'ui-border-radius': round },
                { 'ui-form-item-r': btnText},
                { 'ui-whitespace-rl': type === 'textarea'}]">
    <i v-if="icon" :class="[icon, 'iconfont']"></i>
    <input v-if="type !== 'textarea'" :type="type"
           :placeholder="placeholder"
           @input="handleInput"
           :value="currentValue"
           @change="handleChange">
    <textarea v-if="type === 'textarea'"
              :placeholder="placeholder"
              @input="handleInput"
              :value="currentValue"
              @change="handleChange">
    </textarea>
    <button v-if="btnText"
            :disabled="btnDisabled"
            @click="$emit('rightClick')">
      {{btnText}}
    </button>
    <span class="ui-input-unit" v-if="unit">{{unit}}</span>
    <a class="ui-icon-close"
       v-show="currentValue"
       @click="handleClear"></a>
  </div>
</template>

<script>
/**
 * z-input
 * @desc 输入框
 * @module packages/input
 *
 * @param {string} [type=text] - field 类型，接受 text, textarea, tel 等
 * @param {string} [icon] - 标签
 * @param {string} [unit] - 单位
 * @param {string} [placeholder] - placeholder
 * @param {string} [disabled] - disabled
 * @param {string} [readonly] - readonly
 * @param {string} [state] - 表单校验状态样式，接受 error, warning, success
 *
 * @example
 */
export default {
  name: 'v-input',
  props: {
    value: {},
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    icon: String,
    unit: String,
    btnText: String,
    border: Boolean,
    round: Boolean,
    btnDisabled: Boolean
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleInput (evt) {
      this.currentValue = evt.target.value
    },
    handleChange (evt) {
      this.$emit('change', evt.target.value)
    },
    handleClear () {
      this.currentValue = ''
      console.log(this.currentValue)
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>