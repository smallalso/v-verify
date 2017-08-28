/**
    * vv-alidate v1.0.0
    * (c) 2017 joinyi
    * @license MIT
    */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['vv-alidate'] = factory());
}(this, (function () { 'use strict';

/**
 * Here is a validator like date|phone|emial
 */

// date validator
var date = {
  reg: /^[1|2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/,
  msg: 'sorry, the date format is incorrect'
};

var validator = {
  date: date
};

/**
 * javscript data type judgment
 * @param {*} obj 
 */
function classBe (obj) {
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

/**
 * generate verify function for all verifies
 * @param {Object} config 
 * @param {function} tips 
 */
function generateFn (config, tips) {
  var _regType = classBe(config.reg);
  var _fn = null;
  switch (_regType) {
    case 'regexp':
      _fn = function (data) {
        var reg = config.reg;
        if (!reg.test(data)) {
          return false
        }
        return true
      };
      break
    case 'array':
      _fn = function (data) {
        var reg = config.reg;
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
        return config.reg(data)
      };
      break
    default:
      _fn = function (data) {
        throw new function () {
          return 'type wrong in the config file'
        }()
      };
  }
  return _fn
}

/**
 *  registered directives in VUE for all verifies
 *  @param {Object} Vue
 *  @param {string} name
 *  @param {function} fn
*/
function directives (Vue, name, fn) {
  Vue.directive(name, {
    bind: function (el) {
      el.addEventListener('change', function (e) {
        fn(e.target.value);
      });
    }
  });
}

/**
 * VUE plugin registed function
 * @param {Object} Vue object 
 * @param {Object} plugin config object 
 */
function install (Vue, options) {
  var tips = options.tips || function (msg) { alert(msg); };
  var validators = Object.assign(validator, options.validators = {});

  var _keys = Object.keys(validators);

  Vue.prototype.$verify = {};
  try {
    _keys.forEach(function (name) {
      Vue.prototype.$verify[name] = generateFn(verifyObj[name], tips);
      directives(Vue, name, Vue.prototype.$verify[name]);
    });
  } catch (e) {
    console.log(e);
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
