import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosInstance'
import AuthForm, { Field } from '../components/AuthForm'

export default function Signup() {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/signup', form)
      const { data } = await api.post('/auth/login', form)
      login(data.token)
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthForm
      title="Create account"
      subtitle="Start generating images with AI"
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      footer={<>Already have an account? <Link to="/login">Sign in</Link></>}
    >
      <Field
        label="Email"
        id="email"
        type="email"
        value={form.email}
        onChange={handle('email')}
        placeholder="you@example.com"
        required
      />
      <Field
        label="Password"
        id="password"
        type="password"
        value={form.password}
        onChange={handle('password')}
        placeholder="Min. 6 characters"
        required
      />
    </AuthForm>
  )
}
