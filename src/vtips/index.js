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

  function getElPosition (el, container) {
    const _height = el.clientHeight
    return {
      top: el.offsetTop - _height - 12,
      left: el.offsetLeft
    }
  }

  const getContainer = function () {
    let container = document.body
    const el = document.querySelector(config.el) || container
    container = el.children[0] || el
    if (!container.style.position) {
      container.style.position = 'relative'
    }
    return container
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
    instance.position = options.el ? getElPosition(options.el, container) : options.position
    instance.exist = false
    container.appendChild(instance.$el)
    Vue.nextTick(function () {
      instance.exist = true
    })
    return instance
  }

  return vTips
}