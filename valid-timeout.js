'use strict';

var toPosInt = require('es5-ext/number/to-pos-integer')
  , maxValue = require('./max-value');

module.exports = function (value) {
	value = toPosInt(value);
	if (value > maxValue) {
		throw new TypeError(value + " is to large for a timeout");
	}
	return value;
};
