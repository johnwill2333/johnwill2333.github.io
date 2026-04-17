import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import 'github-markdown-css'
import 'highlight.js/styles/github.css'
// import './style.css'

createApp(App).use(router).mount('#app')
