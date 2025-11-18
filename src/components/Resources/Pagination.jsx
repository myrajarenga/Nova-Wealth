export default function Pagination({ page, total, pageSize, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  return (
    <div className="flex items-center gap-2 justify-center">
      <button disabled={page<=1} onClick={() => onPage(page-1)} className={`px-3 py-2 rounded-md text-sm ${page<=1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Prev</button>
      {Array.from({ length: pages }).slice(0,5).map((_,i)=>{
        const p = i+1
        return <button key={p} onClick={() => onPage(p)} className={`px-3 py-2 rounded-md text-sm ${page===p ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700'}`}>{p}</button>
      })}
      <button disabled={page>=pages} onClick={() => onPage(page+1)} className={`px-3 py-2 rounded-md text-sm ${page>=pages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Next</button>
    </div>
  )
}