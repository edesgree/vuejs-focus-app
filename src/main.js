import './assets/styles.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { makeServer } from './server.js';

const app = createApp(App);

if (process.env.NODE_ENV === 'development') {
    makeServer({ environment: 'development' }); // Initialize Mirage server in development environment
}
app.use(createPinia());

app.mount('#app');
