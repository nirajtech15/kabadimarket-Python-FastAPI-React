import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMessages, markMessageRead, deleteMessage } from '../../api'
import toast from 'react-hot-toast'
import { MailOpen, Trash2 } from 'lucide-react'

export default function AdminMessages() {
  const qc = useQueryClient()
  const { data: messages = [], isLoading } = useQuery({ queryKey: ['messages'], queryFn: getMessages })

  const readMutation = useMutation({
    mutationFn: markMessageRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => { toast.success('Message deleted'); qc.invalidateQueries({ queryKey: ['messages'] }) },
  })

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Contact Messages</h1>

      {isLoading ? (
        <div className="p-8 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-400">No messages yet</div>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`bg-white rounded-2xl shadow-sm border p-5 ${!msg.is_read ? 'border-green-300 bg-green-50/30' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900">{msg.name}</span>
                    {!msg.is_read && <span className="badge bg-green-100 text-green-700">New</span>}
                    <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500 mb-3">
                    {msg.mobile && <span>📞 {msg.mobile}</span>}
                    {msg.email && <span>✉️ {msg.email}</span>}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{msg.message}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!msg.is_read && (
                    <button onClick={() => readMutation.mutate(msg.id)} title="Mark as read" className="text-green-500 hover:text-green-700">
                      <MailOpen size={16} />
                    </button>
                  )}
                  <button onClick={() => { if (confirm('Delete this message?')) deleteMutation.mutate(msg.id) }} className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
