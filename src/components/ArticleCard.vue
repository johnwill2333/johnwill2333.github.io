<template>
  <div class="card">
    <h2><router-link :to="article.path">{{ article.title }}</router-link></h2>
    <p class="summary">{{ article.summary }}</p>
    <small>{{ article.date }}</small>
  </div>
</template>

<script setup>
defineProps({ article: Object })
</script>

<style scoped>
.card {
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}
.summary {
  color: #555;
}
a {
  color: #42b983;
  text-decoration: none;
}
</style>
