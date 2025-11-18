import { useEffect, useState } from 'react'

export default function SearchBar({ value, onChange }) {
  const [t, setT] = useState(value || '')
  useEffect(() => { const id = setTimeout(() => onChange(t), 300); return () => clearTimeout(id) }, [t])
  return (
    <label className="relative block w-full">
      <span className="sr-only">Search resources</span>
      <input value={t} onChange={e => setT(e.target.value)} placeholder="Search resources" className="w-full rounded-md border border-gray-300 px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
    </label>
  )
}