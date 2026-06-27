import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllReviews, togglePublishReview, deleteReview } from '../../api'
import toast from 'react-hot-toast'
import { Star, Eye, EyeOff, Trash2 } from 'lucide-react'

export default function AdminReviews() {
  const qc = useQueryClient()
  const { data: reviews = [], isLoading } = useQuery({ queryKey: ['reviews-admin'], queryFn: getAllReviews })

  const publishMutation = useMutation({
    mutationFn: togglePublishReview,
    onSuccess: () => { toast.success('Updated'); qc.invalidateQueries({ queryKey: ['reviews-admin'] }) },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => { toast.success('Review deleted'); qc.invalidateQueries({ queryKey: ['reviews-admin'] }) },
  })

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Customer Reviews</h1>

      {isLoading ? (
        <div className="p-8 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.length === 0 && (
            <div className="col-span-2 bg-white rounded-2xl p-10 text-center text-gray-400">No reviews yet</div>
          )}
          {reviews.map(r => (
            <div key={r.id} className={`bg-white rounded-2xl shadow-sm border p-5 ${r.is_published ? 'border-green-200' : 'border-gray-100 opacity-70'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {r.initials || r.customer_name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{r.customer_name}</div>
                    {r.location && <div className="text-xs text-gray-500">{r.location}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => publishMutation.mutate(r.id)}
                    title={r.is_published ? 'Unpublish' : 'Publish'}
                    className={r.is_published ? 'text-green-500 hover:text-gray-400' : 'text-gray-300 hover:text-green-500'}
                  >
                    {r.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => { if (confirm('Delete review?')) deleteMutation.mutate(r.id) }} className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{r.comment}</p>
              <div className="flex items-center justify-between mt-3">
                <span className={`badge ${r.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {r.is_published ? '✓ Published' : 'Hidden'}
                </span>
                <span className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
