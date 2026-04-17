// 用于获取 posts/ 目录下的所有 markdown 文件信息
export async function loadPosts() {
  const ctx = import.meta.glob('/public/posts/*.md', { as: 'raw' })
  const posts = []

  for (const path in ctx) {
    const raw = await ctx[path]()
    // 解析 front-matter（简易格式解析）
    const match = raw.match(/---([\s\S]*?)---/)
    const meta = {}
    if (match) {
      match[1].split('\n').forEach(line => {
        const [key, ...rest] = line.split(':')
        if (key && rest.length) meta[key.trim()] = rest.join(':').trim()
      })
    }
    // 内容去掉 YAML
    const content = raw.replace(/---[\s\S]*?---/, '').trim()
    posts.push({
      id: meta.id,
      title: meta.title,
      date: meta.date,
      summary: meta.summary,
      path
        // 取文件名作为访问 id，例如 /article/1
        : meta.id ? `/article/${meta.id}` : path,
      content
    })
  }

  // 按日期排序
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}
