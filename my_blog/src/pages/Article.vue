<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p><small>{{ post.date }}</small></p>

    <!-- TOC -->
    <div class="markdown-toc" v-html="toc"></div>

    <!-- 内容 -->
    <div class="markdown-body content" v-html="html"></div>
  </div>
  <div v-else>
    <p>文章未找到。</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import hljs from 'highlight.js'
import { loadPosts } from '../utils/posts.js'

const route = useRoute()
const post = ref(null)
const html = ref('')
const toc = ref('')

onMounted(async () => {
  const posts = await loadPosts()
  post.value = posts.find(a => a.id == route.params.id)
  if (post.value) {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
      }
    })
      .use(markdownItAnchor, { permalink: markdownItAnchor.permalink.headerLink() })
      .use(markdownItTocDoneRight, { containerClass: 'toc', listType: 'ul' })

    toc.value = md.render('[TOC]')
    html.value = md.render(post.value.content)
  }
})
</script>

<style scoped>
.markdown-body {
  line-height: 1.7;
}

/* TOC 样式 */
.markdown-toc {
  background-color: #f9f9f9;
  padding: 15px;
  border-left: 3px solid #42b983;
  margin: 20px 0;
}
.markdown-toc ul {
  list-style: none;
  padding-left: 0;
}
.markdown-toc li a {
  text-decoration: none;
  color: #333;
}
.content h2 {
  margin-top: 1em;
}
</style>
