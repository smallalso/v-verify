
export default function (Vue, config) {
  const errorList = []
  const ErrorConstructor = Vue.extend({
    template: '<p :class="[errorClass]" v-if="message"><i :class="[icon]"></i>{{message}}</p>',
    data: () => {
      return {
        message: null
      }
    },
    props: {
      icon: String,
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
    instance.icon = options.icon || config.icon
    container.appendChild(instance.$el)
    console.log(instance.$el, 234)
    return instance
  }

  return errorRender
}