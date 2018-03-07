"use strict";

var customError   = require("es5-ext/error/custom")
  , isValue       = require("es5-ext/object/is-value")
  , ensurePromise = require("es5-ext/object/ensure-promise")
  , nextTick      = require("next-tick")
  , ensureTimeout = require("../valid-timeout");

module.exports = function (/* timeout */) {
	ensurePromise(this);
	var timeout = arguments[0];
	if (isValue(timeout)) timeout = ensureTimeout(timeout);
	return new this.constructor(
		function (resolve, reject) {
			var isSettled = false;
			this.then(
				function (value) {
					isSettled = true;
					resolve(value);
				},
				function (reason) {
					isSettled = true;
					reject(reason);
				}
			);
			var timeoutCallback = function () {
				if (isSettled) return;
				reject(customError("Operation timeout", "PROMISE_TIMEOUT"));
			};
			if (isValue(timeout)) setTimeout(timeoutCallback, timeout);
			else nextTick(timeoutCallback);
		}.bind(this)
	);
};
