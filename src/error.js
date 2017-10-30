
export default function (Vue, config) {
  const errorList = []
  const ErrorConstructor = Vue.extend({
    template: '<div :class="[errorClass]" v-if="message"><i :class="[errorIcon]"></i><span>{{message}}</span></div>',
    data: () => {
      return {
        message: null
      }
    },
    props: {
      errorIcon: String,
      errorClass: String  
    }
  })

  function getAnInstance () {
    if (errorList.length > 1) {
      const instance = tipsList[0]
      errorList.splice(0, 1)
      return instance
    }
    return new ErrorConstructor({
      el: document.createElement('div')
    })
  }

  const errorRender = (options = {}) => {
    const container = options.el.parentNode
    const instance = options.target || getAnInstance(container)

    instance.message = options.message
    instance.errorClass = options.errorClass || config.errorClass
    instance.errorIcon = options.errorIcon || config.errorIcon
    container.appendChild(instance.$el)
    return instance
  }

  return errorRender
}