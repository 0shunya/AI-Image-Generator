import { useState } from 'react'
import api from '../api/axiosInstance'
import styles from './Dashboard.module.css'

const EXAMPLE_PROMPTS = [
  'A lone lighthouse at dusk, oil painting style',
  'Bioluminescent forest at midnight, hyperrealistic',
  'Vintage astronaut floating through a nebula',
  'Ancient temple overgrown with golden vines',
]

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setError('')
    setImage(null)
    setLoading(true)
    try {
      const { data } = await api.post('/image/generate', { prompt: prompt.trim() })
      if (data.success) {
        setImage(data.image)
      } else {
        setError('Generation failed. Please try again.')
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please sign in again.')
      } else {
        setError(err.response?.data?.message || 'Something went wrong. Try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (text) => {
    setPrompt(text)
  }

  const downloadImage = () => {
    if (!image) return
    const link = document.createElement('a')
    link.href = image
    link.download = `visionary-${Date.now()}.png`
    link.click()
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Turn words into <em>art</em>
          </h1>
          <p className={styles.subtitle}>
            Describe anything. Let AI render it for you.
          </p>
        </header>

        <form onSubmit={generate} className={styles.form}>
          <div className={styles.inputWrapper}>
            <textarea
              className={styles.textarea}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A surreal dreamscape with floating islands and golden hour light…"
              rows={3}
              maxLength={500}
            />
            <div className={styles.inputFooter}>
              <span className={styles.charCount}>{prompt.length}/500</span>
              <button
                type="submit"
                className={styles.generateBtn}
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} />
                    Generating…
                  </>
                ) : (
                  <>
                    <span>✦</span> Generate
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className={styles.examples}>
          <span className={styles.examplesLabel}>Try:</span>
          <div className={styles.exampleTags}>
            {EXAMPLE_PROMPTS.map((p) => (
              <button
                key={p}
                className={styles.tag}
                onClick={() => handleExampleClick(p)}
                type="button"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className={styles.error}>
            <span>⚠</span> {error}
          </div>
        )}

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.loadingOrb} />
            <p>Rendering your vision…</p>
          </div>
        )}

        {image && !loading && (
          <div className={styles.result}>
            <div className={styles.imageWrapper}>
              <img src={image} alt={prompt} className={styles.generatedImage} />
              <div className={styles.imageOverlay}>
                <button className={styles.downloadBtn} onClick={downloadImage}>
                  ↓ Download
                </button>
              </div>
            </div>
            <p className={styles.promptCaption}>"{prompt}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
