export default function PopularList({ items }) {
  return (
    <div className="space-y-3">
      {items.map(i => (
        <a key={i.id} href="#" className="block">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
              <img src={i.thumbnailUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-black">{i.title}</div>
              <div className="text-xs text-gray-500">{new Date(i.publicationDate).toLocaleDateString()}</div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}