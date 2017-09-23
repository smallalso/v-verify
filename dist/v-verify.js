/**
      * v-verify v1.0.0
      * (c) 2017 joinyi
      * @license MIT
      */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['v-verify'] = factory());
}(this, (function () { 'use strict';

/**
 * Here is a validator like date|phone|emial
 */

// required validator
var required = {
  reg: function (value) {
    if (value === undefined || value === null || value === '') {
      return false;
    }
  
    return !! String(value).trim().length;
  },
  msg: '必填选项，请填写'
};

// date validator
var date = {
  reg: /^[1|2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/,
  msg: '您填写的日期格式不正确'
};

var number = {
  reg: function (value) { return /^[0-9]+$/.test(String(value)) },
  msg: '您填写的内容包含非数字'
};

var validator = {
  required: required,
  number: number,
  date: date
};

var listener = {};

function addEvent (type, fn) {
  if (!type || !fn || typeof type !== 'string' || typeof fn !== 'function') {
    throw new Error('传入的参数不符合要求！')
    return
  }

  if (typeof listener[type] === 'undefined') {
    listener[type] = [];
  }

  listener[type].push(fn);
}

function fireEvent (type) {
  var _target = listener[type];
  var result = [];
  if (!type || !_target || !_target.length) {
    throw new Error('无该类型事件')
    return
  }
  _target.forEach(function (item) {
    if (typeof item !== 'function') { return }
    result.push(item({ type: type }));
  });
  return result
}

function removeEvent (type, fn) {
  var _target = listener[type];
  if (!type || !_target || !_target.length) {
    throw new Error('无该类型事件')
    return
  }
  if (typeof fn === 'function') {
    for (var i = 0; i < _target.length; i++) {
      if (_target[i] !== fn) { continue }
      listener[type].splice(i, 1);
      break
    }
  } else {
    delete listener[type];
  }
}

function getListener (type) {
  return listener[type]
}

var event = {
  addEvent: addEvent,
  fireEvent: fireEvent,
  removeEvent: removeEvent,
  getListener: getListener
};

/**
 * javscript data type judgment
 * @param {*} obj 
 */
function classOf (obj) {
  var class2type = {};
  'Boolean Number String Function Array Date RegExp Object tips'.split(' ')
  .forEach(function (e, i) {
    class2type['[object ' + e + ']'] = e.toLowerCase();
  });
  if (obj == null) {
    return String(obj)
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[ class2type.toString.call(obj) ] || 'object'
    : typeof obj
}

function verifyValue (reg, value) {
  var _regType = classOf(reg);
  var _fn = null;
  switch (_regType) {
    case 'regexp':
      _fn = function (data) {
        if (!reg.test(data)) {
          return false
        }
        return true
      };
      break
    case 'array':
      _fn = function (data) {
        var _bool = true;
        for (var i = 0; i < reg.length; i++) {
          if (_typeof(reg[i]) === 'regexp') {
            _bool = reg[i].test(data);
          }
          if (!_bool) { break }
        }
        return _bool
      };
      break
    case 'function':
      _fn = function (data) {
        return reg(data)
      };
      break
    default:
      _fn = function (data) {
        throw new function () {
          return 'type wrong in the config file'
        }()
      };
  }
  return _fn(value)
}


/**
 * generate verify function for all verifies
 * @param {Object} config 
 * @param {function} tips 
 */
function verifyFn (validators) {

  this.verify = function (validator, value) {
    var _config = validators[validator];
    if (!_config || !_config.reg) {
      throw new function () {
        return ("the " + validator + " is undefined")
      }()
      return
    } 
    return verifyValue(_config.reg, value)
  };

  this.verifyAll = function (type) {
    return event.fireEvent(type)
  };
}

/**
 *  registered directives in VUE for all verifies
 *  @param {Object} Vue
 *  @param {string} name
 *  @param {function} fn
*/

function directives (Vue, validator, fn) {

  function dealRegs (regs) {
    if (!regs) {
      throw new function () {
        return "the directive v-verify value is undefined"
      }()
      return
    }
    return regs.split('|')
  }

  function dealValue (value, regs, _error) {
    var _regs = dealRegs(regs);
    var _text = '';
    if (!_regs) { return }
    for (var i = 0; i < _regs.length; i++) {
      var reg = _regs[i].trim();
      if (fn(reg, value)) {
        _text = '';
        continue
      }
      _text = validator[reg] ? validator[reg].msg : '';
      break
    }
    _error.innerText = _text;
    return _text === ''
  }

  function dealSubmit (el, binding, _error) {
    var _submit = el.getAttribute('data-verify-submit');
    if (!_submit) { return }
    function submitValue (el, binding, _error) {
      return function () {
        return dealValue(el.value, binding.value, _error)
      }
    }
    event.addEvent(_submit, submitValue(el, binding, _error)); 
  }

  function bindEvent (el, _events, value, _error) {
    _events.forEach(function (item) {
      if (item === 'initial') {
        dealValue(el.value, value, _error);
        return
      }
      el.addEventListener(item, function (e) {
        dealValue(e.target.value, value, _error);
      });
    });
  }

  Vue.directive('verify', {
    inserted: function (el, binding, vnode) {
      var _events = Object.keys(binding.modifiers).length ? Object.keys(binding.modifiers) : ['change'];
      var _dom = el.getAttribute('data-verify-dom');
      var _error = _dom ? el.parentNode.querySelector(_dom) : null;
      dealSubmit(el, binding, _error);
      bindEvent(el, _events, binding.value, _error);
    },
    unbind: function (el) {
      var _submit = el.getAttribute('data-verify-submit');
      if (!_submit) { return }
      if (event.getListener(_submit)) {
        event.removeEvent(_submit);
      }
    }
  });
}

/**
 * VUE plugin registed function
 * @param {Object} Vue object 
 * @param {Object} plugin config object 
 */

function install (Vue, options) {
  if ( options === void 0 ) options = {};

  var tips = options.tips || function (msg) { alert(msg); };
  var validators = Object.assign(validator, options.validators = {});
  try {
    Vue.prototype.$validator = new verifyFn(validators);
    directives(Vue, validators, Vue.prototype.$validator.verify);
  } catch (e) {
    console.error((e + "\nfrom v-verify"));
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var index = {
  install: install
};

return index;

})));
