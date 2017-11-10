var Util = {
	UA: {}
};

Util.UA.isMobile = function() {
	if (navigator.userAgent.match(/(MicroMessenger|phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
		return true;
	}
	return false;
};

Util.UA.isWeChat = function() {
	return /micromessenger/i.test(navigator.userAgent);
};

Util.UA.isQQBroswer = function() {
	return /qq/i.test(navigator.userAgent);
};

Util.UA.isIOS = function() {
	return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
};

Util.UA.isAndroid = function() {
	return /(Android)/i.test(navigator.userAgent);
};

function wakeAPP(url) {
	var iframe1 = document.createElement('iframe');
	iframe1.src = url;
	iframe1.style.display = 'none';
	document.body.appendChild(iframe1);
	window.setTimeout(function() {
		// document.body.removeChild(iframe1);
	}, 2000);
}

window.onload = function() {
	var btn = document.querySelector('#download');
	if (!btn) {
		return;
	}
	btn.addEventListener(
		'click',
		function() {
			if (Util.UA.isIOS()) {
				window.location.href = 'https://itunes.apple.com/cn/app/hua-tu-zai-xian-gong-wu-yuan/id940376535';
				// window.location.href = "ztkschemes://"
				// window.location.href = "iting://open?msg_type=13&album_id=4416421";
				// wakeAPP("iting://open?msg_type=13&album_id=4416421");
			} else {
				window.location.href = 'http://app.qq.com/#id=detail&appid=1103583915';
			}
		},
		false
	);
};

// 测试
import test_foo from './test_foo.js';
