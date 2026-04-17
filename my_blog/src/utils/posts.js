
// 用于获取 posts/ 目录下的所有 markdown 文件信息
/*
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
*/

/**
 * 修改说明：
 * 1. 路径改为 /src/assets/posts/*.md (请确保文件夹已移动)
 * 2. 使用 { query: '?raw', import: 'default' } 确保 Vite 将其作为纯文本读取，不进行 JS 解析
 */
export async function loadPosts() {
  // 注意：此处路径建议使用相对路径或 src 路径
  const ctx = import.meta.glob('/src/assets/posts/*.md', { 
    query: '?raw', 
    import: 'default' 
  })
  
  const posts = []

  for (const path in ctx) {
    // 获取文件原始内容
    const raw = await ctx[path]()
    
    // 解析 front-matter
    const match = raw.match(/---([\s\S]*?)---/)
    const meta = {}
    
    if (match) {
      const yamlContent = match[1]
      yamlContent.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':')
        if (colonIndex !== -1) {
          const key = line.slice(0, colonIndex).trim()
          const value = line.slice(colonIndex + 1).trim()
          if (key) meta[key] = value
        }
      })
    }

    // 移除 YAML 部分获取正文
    const content = raw.replace(/---[\s\S]*?---/, '').trim()
    
    // 提取文件名作为备用 ID
    const fileName = path.split('/').pop().replace('.md', '')

    posts.push({
      id: meta.id || fileName,
      title: meta.title || 'Untitled',
      date: meta.date || '',
      summary: meta.summary || '',
      path: meta.id ? `/article/${meta.id}` : `/article/${fileName}`,
      content: content
    })
  }

  // 按日期排序（降序）
  return posts.sort((a, b) => {
    return new Date(b.date || 0) - new Date(a.date || 0)
  })
}
