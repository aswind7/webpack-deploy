import 'babel-polyfill';

// axios配置
import Vue from 'vue';
import axios from 'axios';
var instance = axios.create({
	baseURL: 'http://test.htexam.net/',
	timeout: 7000,
	headers: { 'X-Custom-Header': 'foobar' }
});

Vue.prototype.$http = instance;

// console.log(instance); /
// 公用js
import '@/js/rem.js';
import '@/js/common.js';

// 公用样式
import reset from '@/less/common/reset.less';
import common from '@/less/common/common.less';
