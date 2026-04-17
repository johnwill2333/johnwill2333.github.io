<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
body {
  margin: 0;
  font-family: system-ui;
  background-color: #fafafa;
}
#app {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>
