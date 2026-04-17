<template>
  <nav class="navbar">
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.navbar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.router-link-active {
  color: #42b983;
}
</style>
