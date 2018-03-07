"use strict";

module.exports = function (t, a, d) {
	var called = 0;
	var fn = t(function () {
		++called;
	}, 50);

	fn();
	a(called, 1);
	fn();
	fn();
	a(called, 1);
	// Wait 30ms
	setTimeout(function () {
		a(called, 1);
		fn();
		// Wait 30ms
		setTimeout(function () {
			a(called, 2);
			fn();
			fn();

			// Wait 20ms
			setTimeout(function () {
				a(called, 2);

				// Wait 30ms
				setTimeout(function () {
					a(called, 3);

					// Wait 100ms
					setTimeout(function () {
						a(called, 3);
						d();
					}, 100);
				}, 30);
			}, 20);
		}, 30);
	}, 30);
};
