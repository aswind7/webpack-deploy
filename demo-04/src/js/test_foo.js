const foo = () => {
	console.log('foo1');
};

class BAR {
	constructor() {
		console.log('14:35');
		this.num = 90;
	}
}
const aa1 = new BAR();

const [a, b, c] = [...[1, 2, 3]];

// let ff1 = new Promise();
let ff2 = [1, 2, 3, 4];
let aaa3 = 32;
let c3 = 'foobar'.includes('foo');

//ajax
let sqf = process.env.NODE_ENV;
console.log(sqf);
console.log(AJAX_BASE_URL);

import axios from 'axios';
var instance = axios.create({
	baseURL: AJAX_BASE_URL,
	timeout: 5000
	// headers: { 'X-Custom-Header': 'foobar' }
});

instance
	.get('/api/v1/topic/5433d5e4e737cbe96dcef312')
	.then(res => {
		console.log('17:44');
		console.log(res);
	})
	.catch(err => {
		console.log('17:56');
		console.log(err);
	});
