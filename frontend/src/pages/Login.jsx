import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosInstance'
import AuthForm, { Field } from '../components/AuthForm'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', form)
      login(data.token)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Sign in to your Visionary account"
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      footer={<>Don't have an account? <Link to="/signup">Sign up</Link></>}
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
        placeholder="Your password"
        required
      />
    </AuthForm>
  )
}
