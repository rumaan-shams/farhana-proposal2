import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Music2, VolumeX, Sparkles, MailOpen, Camera } from 'lucide-react'

const photos = [
  { src: 'photo1.jpg', caption: 'A little moment to remember' },
  { src: 'photo2.jpg', caption: 'A memory worth keeping' },
  { src: 'photo3.jpg', caption: 'Not Having Enough Sleep Because of you' },
]

export default function App() {
  const [opened, setOpened] = useState(false)
  const [answer, setAnswer] = useState('')
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef(null)
  useEffect(() => {
  const audio = audioRef.current
  if (!audio) return

  audio.volume = 0.5

  const startMusic = async () => {
    try {
      await audio.play()
      setMusicOn(true)
    } catch {
      setMusicOn(false)
    }
  }

  startMusic()

  const startOnFirstInteraction = () => {
    if (audio.paused) {
      startMusic()
    }

    window.removeEventListener('click', startOnFirstInteraction)
    window.removeEventListener('touchstart', startOnFirstInteraction)
    window.removeEventListener('keydown', startOnFirstInteraction)
  }

  window.addEventListener('click', startOnFirstInteraction)
  window.addEventListener('touchstart', startOnFirstInteraction)
  window.addEventListener('keydown', startOnFirstInteraction)

  return () => {
    window.removeEventListener('click', startOnFirstInteraction)
    window.removeEventListener('touchstart', startOnFirstInteraction)
    window.removeEventListener('keydown', startOnFirstInteraction)
  }
}, [])

  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (musicOn) {
      audioRef.current.pause()
      setMusicOn(false)
    } else {
      try {
        await audioRef.current.play()
        setMusicOn(true)
      } catch {
        alert('Add your music file at public/music.mp3, then tap the music button again.')
      }
    }
  }

  const sayYes = () => setAnswer('yes')

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <audio ref={audioRef} src="/music.mp3" loop />

      <button className="music-button" onClick={toggleMusic} aria-label="Toggle background music">
        {musicOn ? <Music2 size={17} /> : <VolumeX size={17} />}
        <span>{musicOn ? 'Music on' : 'Music off'}</span>
      </button>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section className="intro-card" key="intro"
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: .96, y: -12 }} transition={{ duration: .65 }}>
            <motion.div className="tiny-heart" animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 2.6 }}>
              <Heart fill="currentColor" size={26} />
            </motion.div>
            <p className="eyebrow">A LITTLE SURPRISE FOR</p>
            <h1>Farhana<span className="pink-dot">.</span></h1>
            <p className="intro-copy">There is something I have been wanting to tell you...</p>
            <motion.button className="primary-button" onClick={() => setOpened(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }}>
              <MailOpen size={18} /> Open your letter
            </motion.button>
            <p className="hint">Made with a little extra love <Heart size={12} fill="currentColor" /></p>
          </motion.section>
        ) : (
          <motion.div className="content" key="content"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <section className="hero">
              <span className="eyebrow"><Sparkles size={14} /> JUST FOR YOU</span>
              <h1>Dear Farhana,</h1>
              <p className="hero-subtitle">Some people make ordinary days feel a little more special.</p>
              <div className="divider-heart"><span /><Heart size={17} fill="currentColor" /><span /></div>
            </section>

            <section className="letter-card">
              <p className="letter-greeting">A little note from my heart,</p>
              <p>
                I may not always find the perfect words, but I want you to know
                that you are someone truly special. Your presence brings a
                little more happiness, warmth, and colour to life.
              </p>
              <p>
                I made this small corner of the internet just to ask you
                something that means a lot to me. No pressure—just an honest
                question, from the heart.
              </p>
              <p className="signature">With care, <span>Someone who thinks you're special</span></p>
            </section>

            <section className="memories">
              <div className="section-heading">
                <span className="eyebrow"><Camera size={14} /> LITTLE MOMENTS</span>
                <h2>A gallery of smiles</h2>
                <p>Replace these pictures with your own favourite memories.</p>
              </div>
              <div className="photo-grid">
                {photos.map((photo, index) => (
                  <motion.figure key={photo.src} whileHover={{ y: -6, rotate: index === 1 ? 1 : -1 }}>
                    <img src={photo.src} alt={photo.caption} />
                    <figcaption>{photo.caption}</figcaption>
                  </motion.figure>
                ))}
              </div>
            </section>

            <section className="question-card">
              <motion.div className="question-heart" animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                <Heart fill="currentColor" size={34} />
              </motion.div>
              <p className="eyebrow">ONE LITTLE QUESTION</p>
              <h2>Farhana, would you like to make more beautiful memories together?</h2>
              {!answer ? (
                <div className="answer-buttons">
                  <motion.button className="yes-button" onClick={sayYes} whileHover={{ scale: 1.06 }} whileTap={{ scale: .96 }}>
                    Yes, I'd love to <Heart size={17} fill="currentColor" />
                  </motion.button>
                  <button className="no-button" onClick={() => setAnswer('no')}>Not right now</button>
                </div>
              ) : answer === 'yes' ? (
                <motion.div className="response" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}>
                  <h3>That means so much! 💗</h3>
                  <p>Here's to kindness, laughter, and many lovely memories ahead.</p>
                  <div className="confetti-hearts">♡　♥　♡　♥　♡</div>
                </motion.div>
              ) : (
                <motion.div className="response" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3>That's completely okay. 💕</h3>
                  <p>Thank you for reading my little letter. Your feelings and your choice matter.</p>
                  <button className="no-button" onClick={() => setAnswer('')}>Back</button>
                </motion.div>
              )}
            </section>
            <footer>Created with <Heart size={12} fill="currentColor" /> for Farhana</footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
