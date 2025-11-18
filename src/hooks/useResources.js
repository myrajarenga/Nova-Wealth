import { useEffect, useMemo, useReducer } from 'react'
import { fetchResources } from '../lib/resourcesApi.js'

function reducer(state, action) {
  switch (action.type) {
    case 'set': return { ...state, ...action.payload }
    case 'page': return { ...state, page: action.page }
    default: return state
  }
}

export function useResources(initial = {}) {
  const [state, dispatch] = useReducer(reducer, { query: '', category: '', type: [], topic: [], dateFrom: '', dateTo: '', sort: 'latest', page: 1, pageSize: 9, ...initial })
  const qp = useMemo(() => state, [state])
  const key = JSON.stringify(qp)
  const cache = useMemo(() => new Map(), [])
  const data = cache.get(key)
  useEffect(() => { let cancelled = false; (async () => { const res = await fetchResources(qp); if (!cancelled) { cache.set(key, res) } })(); return () => { cancelled = true } }, [key])
  const items = data?.items || []
  const total = data?.total || 0
  return { state, dispatch, items, total }
}