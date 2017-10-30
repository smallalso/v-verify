export default {
  name: 'vTips',
  data () {
    return {
      exist: false
    }
  },
  props: {
    position: {
      type: Object,
      default: () => {
        return {
          top: 0,
          left: 0
        }
      }
    },
    message: {
      type: String,
      default: ''
    },
    errorClass: {
      type: String,
      default: ''
    },
    errorIcon: {
      type: String,
      default: ''
    }
  },
  render (h) {
    if (!this.exist) return
    return h('div', {
      style: {
        fontSize: '12px',
        color: '#333',
        position: 'absolute',
        top: this.position.top + 'px',
        left: this.position.left + 'px',
        backgroundColor: '#fff',
        padding: '2px 8px',
        margin: 0,
        zIndex: '99',
        boxShadow: '0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04)',
        borderRadius: '4px'
      },
      class: [this.errorClass]
    }, [
      h('i', {
        class: [this.errorIcon]
      }),
      h('b', {
        style: {
          position: 'absolute',
          left: '4px',
          bottom: '-5px',
          width: '8px',
          height: '8px',
          display: 'block',
          borderRight: '1px solid rgba(0,0,0,.1)',
          transform: 'rotateZ(45deg)',
          borderBottom: '1px solid rgba(0,0,0,.1)',
          borderSizing: 'border-box',
          backgroundColor: '#fff'
        }
      }),
      h('span', this.message)
    ])
  }
}