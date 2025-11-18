export default function CategoriesList({ categories }) {
  return (
    <ul className="space-y-2 text-sm">
      {categories.map(c => (
        <li key={c} className="flex items-center justify-between">
          <span className="text-gray-700">{c}</span>
          <span className="text-gray-400">›</span>
        </li>
      ))}
    </ul>
  )
}