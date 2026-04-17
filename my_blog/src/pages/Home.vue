<template>
  <div>
    <h1>我的博客</h1>
    <ArticleCard v-for="a in articles" :key="a.id" :article="a" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import { loadPosts } from '../utils/posts.js'

const articles = ref([])
onMounted(async () => {
  articles.value = await loadPosts()
})
</script>
