/**
 *  registered directives in VUE for all verifies
 *  @param {Object} Vue
 *  @param {string} name
 *  @param {function} fn
*/
export default function directives (Vue, name, fn) {
  Vue.directive(name, {
    bind: function (el) {
      el.addEventListener('change', (e) => {
        fn(e.target.value)
      })
    }
  })
}