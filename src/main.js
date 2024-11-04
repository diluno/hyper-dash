import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import feather from 'feather-icons';

setTimeout(() => {
  feather.replace();
  console.log('feather');
}, 1000);
createApp(App).mount('#app')
