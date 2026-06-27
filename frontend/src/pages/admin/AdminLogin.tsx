import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { adminLogin } from '../../api'
import { useAuth } from '../../hooks/useAuth'
import type { AdminLogin as AdminLoginType } from '../../types'
import { Recycle, Loader2, Lock } from 'lucide-react'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginType>()

  const mutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      login(data.access_token)
      toast.success('Welcome back!')
      navigate('/admin')
    },
    onError: () => toast.error('Invalid username or password'),
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Recycle className="text-white" size={30} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">KabadiMarket</h1>
          <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input
              {...register('username', { required: 'Username is required' })}
              className="input"
              placeholder="admin"
              autoComplete="username"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              className="input"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={mutation.isPending} className="btn-primary w-full flex items-center justify-center gap-2 py-4">
            {mutation.isPending ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : <><Lock size={16} /> Sign In</>}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Default: admin / Admin@123 (change in .env)
        </p>
      </div>
    </div>
  )
}
