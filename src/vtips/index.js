import component from './component.js'

export default function (Vue, config) {
  const PromptConstructor = Vue.extend(component)
  const tipsList = []
  
  function getAnInstance () {
    if (tipsList.length > 1) {
      const instance = tipsList[0]
      tipsList.splice(0, 1)
      return instance
    }
    return new PromptConstructor({
      el: document.createElement('div')
    })
  }

  const returnAnInstance = instance => {
    if (instance) {
      tipsList.push(instance)
    }
  }

  function getElPosition (el) {
    if (window.getComputedStyle && (el.parentNode && !el.parentNode.style.position)) {
      const _position = window.getComputedStyle(el.parentNode).position
      if (!_position || _position === 'static') {
        el.parentNode.style.position = 'relative'
      }
    }
    return {
      top: el.offsetTop - 38,
      left: el.offsetLeft
    }
  }

  const removeDom = target => {
    const container = getContainer()
    if (target.parentNode) {
      container.removeChild(target)
    }
  }

  PromptConstructor.prototype.close = function (el) {
    this.exist = false
    // removeDom(el)
    // this.exist = true
    // returnAnInstance(this)
  }
  
  const vTips = (options = {}) => {
    const instance = options.target || getAnInstance()
    const container = options.el.parentNode
    if (options.remove) {
      instance.close(options.target)
      return
    }

    instance.message = typeof options === 'string' ? options : options.message
    instance.position = options.el ? getElPosition(options.el, instance) : options.position
    instance.exist = false
    instance.errorClass = options.errorClass || config.errorClass
    instance.errorIcon = options.errorIcon || config.errorIcon
    container.appendChild(instance.$el)
    Vue.nextTick(function () {
      instance.exist = true
    })
    return instance
  }

  return vTips
}