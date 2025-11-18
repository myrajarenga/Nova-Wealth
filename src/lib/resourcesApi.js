const DATA = [
  { id: 'r1', title: 'Oil Market Outlook: Navigating Uncertainty', summary: 'Key drivers in the energy markets and portfolio implications.', category: 'Latest Articles', type: 'pdf', topic: 'Markets', publicationDate: '2025-10-01', fileSize: 1024 * 512, readingTime: 8, thumbnailUrl: '/images/articles/oil-market.jpg', downloadUrl: '#', access: 'public', popularityScore: 89 },
  { id: 'r2', title: 'Strategic Diversification Strategies', summary: 'Approaches to balance risk and optimize returns.', category: 'Latest Articles', type: 'pdf', topic: 'Strategy', publicationDate: '2025-09-20', fileSize: 1024 * 420, readingTime: 7, thumbnailUrl: '/images/articles/diversification.jpg', downloadUrl: '#', access: 'client', popularityScore: 78 },
  { id: 'r3', title: 'Digital Assets in Traditional Portfolios', summary: 'Framework to assess digital assets integration.', category: 'Latest Articles', type: 'video', topic: 'Alternatives', publicationDate: '2025-08-12', fileSize: 0, readingTime: 12, thumbnailUrl: '/images/articles/digital-assets.jpg', downloadUrl: '#', access: 'public', popularityScore: 95 },
  { id: 'r4', title: 'Retirement Planning in Your 50s', summary: 'Milestones and actions to secure retirement.', category: 'Latest Articles', type: 'pdf', topic: 'Planning', publicationDate: '2025-11-10', fileSize: 1024 * 388, readingTime: 6, thumbnailUrl: '/images/articles/retirement.jpg', downloadUrl: '#', access: 'client', popularityScore: 82 }
]

export async function fetchResources(params) {
  const { query = '', category = '', type = [], topic = [], dateFrom = '', dateTo = '', sort = 'latest', page = 1, pageSize = 9 } = params || {}
  let items = [...DATA]
  if (category) items = items.filter(r => r.category === category)
  if (type.length) items = items.filter(r => type.includes(r.type))
  if (topic.length) items = items.filter(r => topic.includes(r.topic))
  if (dateFrom) items = items.filter(r => new Date(r.publicationDate) >= new Date(dateFrom))
  if (dateTo) items = items.filter(r => new Date(r.publicationDate) <= new Date(dateTo))
  if (query) items = items.filter(r => (r.title + ' ' + r.summary).toLowerCase().includes(query.toLowerCase()))
  if (sort === 'latest') items.sort((a,b) => new Date(b.publicationDate) - new Date(a.publicationDate))
  if (sort === 'popular') items.sort((a,b) => b.popularityScore - a.popularityScore)
  const total = items.length
  const start = (page - 1) * pageSize
  const pageItems = items.slice(start, start + pageSize)
  await new Promise(r => setTimeout(r, 150))
  return { items: pageItems, total }
}

export async function fetchPopular(limit = 5) {
  const sorted = [...DATA].sort((a,b) => b.popularityScore - a.popularityScore)
  await new Promise(r => setTimeout(r, 100))
  return sorted.slice(0, limit)
}

export async function fetchCategories() {
  const cats = Array.from(new Set(DATA.map(d => d.category)))
  await new Promise(r => setTimeout(r, 50))
  return cats
}

export async function toggleBookmark(id, on) {
  const key = 'nw_bookmarks'
  const raw = localStorage.getItem(key)
  const set = new Set(raw ? JSON.parse(raw) : [])
  if (on) set.add(id); else set.delete(id)
  localStorage.setItem(key, JSON.stringify(Array.from(set)))
  await new Promise(r => setTimeout(r, 80))
  return { ok: true }
}

export function getBookmarks() {
  const raw = localStorage.getItem('nw_bookmarks')
  return new Set(raw ? JSON.parse(raw) : [])
}