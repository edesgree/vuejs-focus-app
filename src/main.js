import './assets/styles.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { makeServer } from './server.js';

const app = createApp(App);

makeServer();

app.use(createPinia());

app.mount('#app');
