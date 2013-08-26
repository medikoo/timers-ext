'use strict';

var toUint   = require('es5-ext/lib/Number/to-uint')
  , maxValue = require('./max-value');

module.exports = function (value) {
	value = toUint(value);
	if (value > maxValue) {
		throw new TypeError(value + " is to large for a timeout");
	}
	return value;
};
