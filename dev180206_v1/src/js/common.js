let FastClick = require('fastclick');
import Vue from 'vue'


window.addEventListener(
	'load',
	() => {
		FastClick.attach(document.body);
		init();
	},
	false
);



function init() {
}