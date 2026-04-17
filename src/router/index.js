import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Article from '../pages/Article.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/article/:id', component: Article },
  { path: '/about', component: About }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
