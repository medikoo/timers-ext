'use strict';

var callable     = require('es5-ext/object/valid-callable')
  , validTimeout = require('./valid-timeout')

  , apply = Function.prototype.apply;

module.exports = function (fn, timeout) {
	callable(fn);
	timeout = validTimeout(timeout);
	return function () {
		return setTimeout(apply.bind(fn, this, arguments), timeout);
	};
};
