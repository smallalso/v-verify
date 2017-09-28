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
        padding: '4px 10px',
        zIndex: '999',
        boxShadow: '0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04)',
        borderLeft: '5px solid #f7ba2a',
        borderRadius: '5px 0 0 0'
      }
    }, [
      h('i', {
        style: {
          position: 'absolute',
          left: '-5px',
          bottom: '-7px',
          width: '5px',
          height: '10px',
          display: 'block',
          backgroundColor: '#f7ba2a',
          borderRadius: '8px'
        }
      }),
      h('span', this.message)
    ])
  }
}