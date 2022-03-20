import _ from 'lodash-es';
// import { join } from '../node_modules/@types/lodash-es/index.d.ts';
// import _ from '../node_modules/lodash-es/lodash.default.js';
import add from './js/math';
import './css/index.css';
import './css/title.less';

console.log('hello world!');
console.log(add(20, 30));
console.log(_.join(['123', '1123'], '-'));
// _.join([]);
// join();

import mul from './ts/mul';
console.log(mul(10, 20));

// vue
import { createApp } from 'vue';
import App from './vue/app.vue';

createApp(App).mount('#app');
