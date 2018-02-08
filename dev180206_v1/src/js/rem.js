(function() {
	console.log("13:58");


	var timer,
		on = 'addEventListener',
		d = document,
		w = window,
		doc = d.documentElement,
		ps = 'pageshow';

	d[on]('DOMContentLoaded', resizeFontSize);

	if ('on' + ps in w)
		w[on](ps, function(e) {
			if (e.persisted) debouceResize();
		});
	else w[on]('load', debouceResize);

	w[on]('resize', debouceResize);

	function debouceResize() {
		clearTimeout(timer);
		setTimeout(resizeFontSize, 300);
	}

	function resizeFontSize() {
		console.log("13:59");
		doc.style.fontSize = getWidth() * 100 / 750 + 'px';
	}

	function getWidth() {
		return doc.getBoundingClientRect().width;
	}
})();
