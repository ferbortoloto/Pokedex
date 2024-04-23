import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store';

const app = createApp(App)

app.use(router)
app.use(store) 
app.config.compilerOptions.isCustomElement = tag => tag.includes('swiper')

app.mount('#app')


Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});