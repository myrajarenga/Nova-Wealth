import SearchBar from './SearchBar.jsx'

export default function ResourceFilters({ state, dispatch, categories }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3 overflow-x-auto">
        <button onClick={() => dispatch({ type: 'set', payload: { category: '' } })} className={`px-3 py-2 rounded-md text-sm ${state.category === '' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700'}`}>All Categories</button>
        {categories.map(c => (
          <button key={c} onClick={() => dispatch({ type: 'set', payload: { category: c } })} className={`px-3 py-2 rounded-md text-sm ${state.category === c ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700'}`}>{c}</button>
        ))}
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="w-full md:w-64">
          <SearchBar value={state.query} onChange={v => dispatch({ type: 'set', payload: { query: v, page: 1 } })} />
        </div>
        <select value={state.sort} onChange={e => dispatch({ type: 'set', payload: { sort: e.target.value, page: 1 } })} className="rounded-md border border-gray-300 px-3 py-2 text-sm">
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
        </select>
      </div>
    </div>
  )
}