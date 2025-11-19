import { useAuth } from '../../lib/auth.jsx'
import { getBookmarks, toggleBookmark } from '../../lib/api/resources.js'
import { useState, useEffect } from 'react'
import { track } from '../../lib/analytics.js'

function TypeIcon({ type }) {
  if (type === 'pdf') return <span aria-hidden className="inline-block w-5 h-5 text-red-600">📄</span>
  if (type === 'video') return <span aria-hidden className="inline-block w-5 h-5 text-blue-600">🎬</span>
  if (type === 'calculator') return <span aria-hidden className="inline-block w-5 h-5 text-emerald-600">🧮</span>
  return <span aria-hidden className="inline-block w-5 h-5 text-gray-500">📦</span>
}

function formatSize(bytes) { if (!bytes) return ''; const units = ['KB','MB','GB']; const i = Math.floor(Math.log(bytes/1024)/Math.log(1024)); const v = (bytes/1024/Math.pow(1024,i)).toFixed(1); return `${v} ${units[i]}` }

export default function ResourceCard({ r }) {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  useEffect(() => { const s = getBookmarks(); setSaved(s.has(r.id)) }, [r.id])
  async function toggle() { const on = !saved; setSaved(on); await toggleBookmark(r.id, on); track(on ? 'bookmark_add' : 'bookmark_remove', { id: r.id }) }
  const locked = r.access === 'client' && !user
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      <img src={r.thumbnailUrl} alt="" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="w-full h-40 object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{r.title}</h3>
          <TypeIcon type={r.type} />
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{r.summary}</p>
        <div className="mt-3 text-xs text-gray-500 flex items-center gap-3">
          <span>{new Date(r.publicationDate).toLocaleDateString()}</span>
          {r.fileSize ? <span>{formatSize(r.fileSize)}</span> : null}
          {r.readingTime ? <span>{r.readingTime} min read</span> : null}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button disabled={locked} onClick={() => track('resource_download', { id: r.id })} className={`px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${locked ? 'bg-gray-200 text-gray-500' : 'bg-brand-navy text-white hover:bg-black focus:ring-brand-navy'}`}>{locked ? 'Client Only' : 'Download'}</button>
          <button disabled={locked} onClick={() => track('resource_card_view', { id: r.id })} className={`px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${locked ? 'bg-gray-200 text-gray-500' : 'bg-brand-gold text-black hover:bg-yellow-500 focus:ring-brand-gold'}`}>{locked ? 'Login Required' : 'View'}</button>
          <button onClick={toggle} aria-pressed={saved} className={`ml-auto px-2 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${saved ? 'bg-emerald-100 text-emerald-700 focus:ring-emerald-400' : 'bg-gray-100 text-gray-700 focus:ring-gray-400'}`}>{saved ? 'Saved' : 'Save'}</button>
        </div>
      </div>
    </article>
  )
}