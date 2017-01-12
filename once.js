'use strict';

var callable     = require('es5-ext/object/valid-callable')
  , nextTick     = require('next-tick')
  , validTimeout = require('./valid-timeout');

module.exports = function (fn/*, timeout*/) {
	var scheduled, run, context, args, delay, timeout = arguments[1];
	callable(fn);
	if (timeout == null) {
		delay = nextTick;
	} else {
		timeout = validTimeout(timeout);
		delay = setTimeout;
	}
	run = function () {
		if (!scheduled) return; // IE8 tends to not clear immediate timeouts properly
		scheduled = false;
		fn.apply(context, args);
		context = null;
		args = null;
	};
	return function () {
		context = this;
		args = arguments;
		if (scheduled) return;
		scheduled = true;
		delay(run, timeout);
	};
};
