import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.logo}>
        <span className={styles.logoIcon}>✦</span>
        Visionary
      </a>
      <div className={styles.actions}>
        {isAuthenticated ? (
          <button className={styles.logoutBtn} onClick={logout}>
            Sign out
          </button>
        ) : (
          <div className={styles.links}>
            <a href="/login">Sign in</a>
            <a href="/signup" className={styles.signupLink}>Get started</a>
          </div>
        )}
      </div>
    </nav>
  )
}
