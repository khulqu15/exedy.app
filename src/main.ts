import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import {IonicVue, toastController} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import '@/index.css';

import { defineRule } from 'vee-validate';
import axios from 'axios'
import VueAxios from "vue-axios";

defineRule('required', (value: any) => {
  if (!value || !value.length) {
    return 'This field is required';
  }
  return true;
});

defineRule('email', (value: any) => {
  if (!value || !value.length) {
    return true;
  }
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return 'This field must be a valid email';
  }
  return true;
});

/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';
import {informationCircle} from "ionicons/icons";

const app = createApp(App)
app.config.globalProperties.axios = axios
app.config.globalProperties.baseUrl = 'http://localhost:8000/v1/robots/'
app.use(IonicVue)
app.use(router)
app.provide("$baseUrl", 'http://localhost:8000/v1/robots/')
app.use(VueAxios, axios)

router.isReady().then(() => {
  app.mount('#app');
});