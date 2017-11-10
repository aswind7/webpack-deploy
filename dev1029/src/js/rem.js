(function() {
	var x = 312;
	var timer,
		on = 'addEventListener',
		d = document,
		w = window,
		doc = d.documentElement,
		ps = 'pageshow';

		var y = 90;

		var mm = 901;

	d[on]('DOMContentLoaded', resizeFontSize);

	if ('on' + ps in w)
		w[on](ps, function(e) {
			if (e.persisted) debouceResize();
		});
	else
		w[on]("load", debouceResize);

	w[on]("resize", debouceResize);

	function debouceResize() {
		clearTimeout(timer);
		setTimeout(resizeFontSize, 300);
	}

	function resizeFontSize() {
		doc.style.fontSize = getWidth() * 100 / 720 + "px";
	}

	function getWidth() {
		return doc.getBoundingClientRect().width;
	}
})();