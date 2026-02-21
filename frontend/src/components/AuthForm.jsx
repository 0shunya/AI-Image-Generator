import styles from './AuthForm.module.css'

export default function AuthForm({ title, subtitle, onSubmit, error, loading, children, footer }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>✦</div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {error && (
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠</span>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className={styles.form} noValidate>
          {children}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : null}
            {loading ? 'Please wait…' : title}
          </button>
        </form>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}

export function Field({ label, id, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={styles.input}
        autoComplete={type === 'password' ? 'current-password' : 'email'}
      />
    </div>
  )
}
