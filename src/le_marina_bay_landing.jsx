import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Video URLs — paste Higgsfield URLs here when ready ───────────────────────
const ROOM_TOUR_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_3Aj4Jh3qCab9pV2kCQn8UPSl5e8/hf_20260602_003108_64ab905b-a1ab-421b-ba5d-49b9a033bad2.mp4"
const PROMO_REEL_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_3Aj4Jh3qCab9pV2kCQn8UPSl5e8/hf_20260602_003052_d4602b0f-b063-4743-8cb6-8b8a07c8d13c.mp4"

// ─── Photo imports ─────────────────────────────────────────────────────────────
import img1  from './assets/1780355563989_image.png'  // balcony hero — intracoastal view
import img2  from './assets/1780355628654_image.png'  // master bedroom — king bed + canal view
import img3  from './assets/1780355580057_image.png'  // living room full length
import img4  from './assets/1780355618250_image.png'  // dining room + pendant light
import img5  from './assets/1780355636137_image.png'  // living room with canal view through glass
import img6  from './assets/1780355657594_image.png'  // balcony wide with loungers + dining table
import img7  from './assets/1780355677017_image.png'  // intracoastal panoramic view
import img8  from './assets/1780355707985_image.png'  // pool aerial view
import img9  from './assets/1780355898792_image.png'  // pool close-up
import img10 from './assets/1780355911726_image.png'  // building exterior front
import imgSecondBed from './assets/1780355_second_bedroom.png' // second bedroom — queen + single beds

const PHOTOS = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]

const WORDS = ["stunning", "unforgettable", "breathtaking", "your escape", "paradise"]

const AIRBNB_URL = "https://www.airbnb.es/rooms/51705710"

// ─── Styles ────────────────────────────────────────────────────────────────────
const NAVY   = '#0B2F4E'
const NAVY2  = '#0D3860'
const GOLD   = '#C9A84C'
const LIGHT  = '#F0F7FC'
const WHITE  = '#FFFFFF'
const TEXT   = '#1A1A2E'
const GRAY   = '#6B7280'
const BORDER = '#E5E7EB'

const globalStyle = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; color: ${TEXT}; background: ${WHITE}; }
  h1, h2, h3 { font-family: 'Playfair Display', serif; }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
  html { scroll-behavior: smooth; }
  @media (max-width: 768px) {
    .hero-title { font-size: 2.6rem !important; }
    .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .rooms-grid { grid-template-columns: 1fr !important; }
    .video-grid { flex-direction: column !important; align-items: center !important; }
    .reviews-grid { grid-template-columns: 1fr !important; }
    .section-inner { padding: 60px 20px !important; }
    .hero-inner { padding: 0 20px !important; }
    .header-cta { display: none !important; }
  }
`

// ─── Sub-components ────────────────────────────────────────────────────────────

function AnimatedWord() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % WORDS.length), 2800)
    return () => clearTimeout(t)
  }, [idx])

  return (
    <span style={{ display: 'inline-block', position: 'relative', minWidth: 260 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[idx]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            display: 'inline-block',
            color: GOLD,
            fontStyle: 'italic',
          }}
        >
          {WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function PhotoSlider() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  const next = useCallback(() => setCurrent(i => (i + 1) % PHOTOS.length), [])
  const prev = useCallback(() => setCurrent(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(next, 4200)
    }
    return () => clearInterval(timerRef.current)
  }, [isHovered, next])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={PHOTOS[current]}
          alt={`Le Marina Bay 409 — photo ${current + 1}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(11,47,78,0.15) 0%, rgba(11,47,78,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Arrows */}
      {[{ dir: 'prev', action: prev, left: 16 }, { dir: 'next', action: next, right: 16 }].map(({ dir, action, left, right }) => (
        <button
          key={dir}
          onClick={action}
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            left, right,
            background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(6px)', borderRadius: '50%',
            width: 40, height: 40, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: WHITE, fontSize: 18, transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        >
          {dir === 'prev' ? '‹' : '›'}
        </button>
      ))}

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 6,
      }}>
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 20 : 7, height: 7,
              borderRadius: 4, border: 'none', cursor: 'pointer',
              background: i === current ? WHITE : 'rgba(255,255,255,0.45)',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const WaveIcon = () => (
  <svg width="28" height="18" viewBox="0 0 28 18" fill="none" aria-hidden="true">
    <path d="M1 13C5 8 9 17 13 12C17 7 21 17 25 12C27.5 9 28 14 29 11"
          stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 6C5 1 9 10 13 5C17 0 21 10 25 5C27.5 2 28 7 29 4"
          stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/>
  </svg>
)

const BedIcon = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
    <path d="M2 21v-9H26v9" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M2 12V6a1 1 0 011-1h22a1 1 0 011 1v6" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="3" y="8" width="9" height="4" rx="1.5" stroke={GOLD} strokeWidth="1.5"/>
    <rect x="16" y="8" width="9" height="4" rx="1.5" stroke={GOLD} strokeWidth="1.5"/>
  </svg>
)

const PoolIcon = () => (
  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden="true">
    <circle cx="14" cy="5" r="3" stroke={GOLD} strokeWidth="1.8"/>
    <path d="M14 8v7M10 13l4 2 4-2" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 20C5.5 17 8.5 21 12 19C15.5 17 18.5 21 22 19C25.5 17 26.5 20 28 19"
          stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const SunIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="12" r="4.5" stroke={GOLD} strokeWidth="1.8"/>
    <path d="M14 3v2.5M14 18.5V21M4.5 12H2M26 12h-2.5M7.2 5.7l1.8 1.8M18.9 17.5l1.8 1.8M5.7 18.9l1.8-1.8M18.9 6.5l1.8-1.8"
          stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M6 25h16" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 2l3 9.2H26l-7.5 5.4 2.9 9-7.4-5.4-7.4 5.4 2.9-9L2 11.2h9z"
          stroke={GOLD} strokeWidth="1.8" strokeLinejoin="round" fill="rgba(201,168,76,0.12)"/>
  </svg>
)

function FeatureChip({ icon, label }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      padding: '18px 12px',
    }}>
      <div style={{ height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: GRAY, textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
    </div>
  )
}

function RoomCard({ photo, tag, title, beds, desc }) {
  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      background: WHITE, border: `1px solid ${BORDER}`,
      boxShadow: '0 2px 16px rgba(11,47,78,0.07)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={photo}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: NAVY, color: WHITE,
          fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
          padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase',
        }}>{tag}</span>
      </div>
      <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>{title}</h3>
        {beds && (
          <p style={{ fontSize: 13, color: GOLD, fontWeight: 600 }}>{beds}</p>
        )}
        <p style={{ fontSize: 13.5, color: GRAY, lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  )
}

function VideoPlaceholder({ label }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'rgba(255,255,255,0.04)',
      border: '1px dashed rgba(255,255,255,0.2)',
      borderRadius: 12,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 12, padding: 24,
      minHeight: 200,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 22, marginLeft: 4 }}>▶</span>
      </div>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textAlign: 'center' }}>
        {label} — generating…
      </span>
    </div>
  )
}

function ReviewCard({ name, flag, date, stars, text }) {
  return (
    <div style={{
      background: WHITE, borderRadius: 14, padding: '22px 24px',
      border: `1px solid ${BORDER}`,
      boxShadow: '0 2px 12px rgba(11,47,78,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: `linear-gradient(135deg, ${NAVY}, ${NAVY2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: WHITE, fontWeight: 700, fontSize: 16,
        }}>
          {name[0]}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{name} {flag}</div>
          <div style={{ fontSize: 12, color: GRAY }}>{date}</div>
        </div>
        <div style={{ marginLeft: 'auto', color: GOLD, fontSize: 14, letterSpacing: 1 }}>
          {'★'.repeat(stars)}
        </div>
      </div>
      <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.7 }}>"{text}"</p>
    </div>
  )
}

// ─── Cookie Banner ─────────────────────────────────────────────────────────────

function CookieBanner({ onDismiss, onOpenPrivacy }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 998,
      background: 'rgba(7,30,48,0.97)', backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '14px 32px',
      display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
    }}>
      <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13, lineHeight: 1.6, flex: 1, minWidth: 220 }}>
        This site embeds Google Maps, which may set cookies to render location data. See our{' '}
        <button
          onClick={onOpenPrivacy}
          style={{ color: GOLD, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, padding: 0, textDecoration: 'underline' }}
        >
          Privacy Policy
        </button>
        {' '}for details.
      </span>
      <button
        onClick={onDismiss}
        style={{
          background: GOLD, color: NAVY,
          border: 'none', borderRadius: 20,
          padding: '8px 24px', fontWeight: 700, fontSize: 13,
          cursor: 'pointer', flexShrink: 0, transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        Got it
      </button>
    </div>
  )
}

// ─── Privacy Policy Modal ───────────────────────────────────────────────────────

function PrivacyModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(7,30,48,0.75)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: WHITE, borderRadius: 16,
          maxWidth: 640, width: '100%', maxHeight: '80vh',
          overflowY: 'auto', padding: '40px 40px 32px',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 22, color: GRAY, lineHeight: 1,
          }}
          aria-label="Close privacy policy"
        >
          ×
        </button>

        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: GOLD, textTransform: 'uppercase' }}>
          Legal
        </span>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: NAVY, margin: '8px 0 24px' }}>
          Privacy Policy
        </h2>

        {[
          {
            title: 'Who we are',
            body: 'This website is a listing page for Le Marina Bay 409, a private vacation rental property located in Sunny Isles Beach, Florida. For privacy-related inquiries, contact: info@lemarinabay409.com',
          },
          {
            title: 'What data we collect',
            body: 'This website does not collect, store, or process any personal data directly. There are no registration forms, contact forms, or analytics trackers on this site.',
          },
          {
            title: 'Google Maps',
            body: 'This site embeds a Google Maps iframe to display the property location. When the map loads, Google may collect your IP address, browser information, and set cookies to provide the service. This is governed by Google\'s Privacy Policy at google.com/privacy. By continuing to use this site you acknowledge this use.',
          },
          {
            title: 'Video content',
            body: 'Videos are served from a content delivery network (Amazon CloudFront / AWS). Standard server logs (IP address, request time, bytes transferred) may be retained by the CDN provider for operational purposes. No personally identifiable information is shared with third parties.',
          },
          {
            title: 'Fonts',
            body: 'All fonts used on this site are self-hosted. No requests are made to Google Fonts or any external font service.',
          },
          {
            title: 'External links',
            body: 'This site links to Airbnb for booking. Once you navigate to Airbnb, their own privacy policy applies. We have no access to any data you provide to Airbnb.',
          },
          {
            title: 'Your rights (GDPR)',
            body: 'If you are located in the EU/EEA, you have the right to access, rectify, or erase any personal data we hold about you. Since we do not collect personal data directly, the only data to address would be what third-party services (Google Maps, AWS) may have collected. Please refer to their respective privacy policies.',
          },
          {
            title: 'Changes to this policy',
            body: 'This policy may be updated from time to time. The current version is effective as of June 2026.',
          },
        ].map(({ title, body }) => (
          <div key={title} style={{ marginBottom: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{title}</h3>
            <p style={{ fontSize: 13.5, color: GRAY, lineHeight: 1.75 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LeMarinaLanding() {
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [cookieDismissed, setCookieDismissed] = useState(() => localStorage.getItem('cookieDismissed') === '1')
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const dismissCookie = () => {
    localStorage.setItem('cookieDismissed', '1')
    setCookieDismissed(true)
  }

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{globalStyle}</style>

      {/* ── Header ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: headerScrolled ? 'rgba(11,47,78,0.96)' : 'transparent',
        backdropFilter: headerScrolled ? 'blur(10px)' : 'none',
        borderBottom: headerScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        transition: 'all 0.35s ease',
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="44" height="28" viewBox="0 0 44 28" fill="none" aria-hidden="true">
            <path d="M2 22C7 15 12 25 17 19C22 13 27 25 32 19C37 13 40 21 44 18"
                  stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12C7 5 12 15 17 9C22 3 27 15 32 9C37 3 40 11 44 8"
                  stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/>
          </svg>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            color: WHITE, fontSize: 17, fontWeight: 600, letterSpacing: '0.02em',
          }}>
            Le Marina Bay <span style={{ color: GOLD }}>409</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="header-cta">
          <nav style={{ display: 'flex', gap: 24 }}>
            {['Photos', 'Rooms', 'Location', 'Reviews'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500,
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = WHITE}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
              >{item}</a>
            ))}
          </nav>
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: GOLD, color: NAVY, padding: '8px 20px',
              borderRadius: 22, fontWeight: 700, fontSize: 14,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Book on Airbnb
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="photos" style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
        <PhotoSlider />

        <div
          className="hero-inner"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '0 60px 64px',
            display: 'flex', flexDirection: 'column', gap: 16,
            animation: 'fadeSlide 0.9s ease both',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(201,168,76,0.2)', borderRadius: 20,
            padding: '5px 14px', width: 'fit-content',
            border: '1px solid rgba(201,168,76,0.4)',
          }}>
            <span style={{ color: GOLD, fontSize: 13, fontWeight: 600 }}>★ Superhost · Sunny Isles Beach, FL</span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontSize: '4rem', fontWeight: 700, color: WHITE,
              lineHeight: 1.1, maxWidth: 700,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            A <AnimatedWord /><br />view of the Intracoastal
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.85)', fontSize: 17, maxWidth: 500,
            lineHeight: 1.6, textShadow: '0 1px 8px rgba(0,0,0,0.25)',
          }}>
            116 m² · 2 bedrooms · 2 bathrooms · Private balcony · Pool · 5 min to beach
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: GOLD, color: NAVY, padding: '14px 30px',
                borderRadius: 30, fontWeight: 700, fontSize: 16,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(201,168,76,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.4)'
              }}
            >
              Check availability ↗
            </a>
            <button
              onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255,255,255,0.15)', color: WHITE,
                padding: '14px 30px', borderRadius: 30,
                fontWeight: 600, fontSize: 16, border: '1px solid rgba(255,255,255,0.35)',
                cursor: 'pointer', backdropFilter: 'blur(6px)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              Explore the space
            </button>
          </div>
        </div>
      </section>

      {/* ── Features Strip ── */}
      <section style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '10px 0' }}>
        <div
          className="features-grid"
          style={{
            maxWidth: 960, margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          }}
        >
          {[
            { icon: <WaveIcon />, label: 'Intracoastal views' },
            { icon: <BedIcon />, label: '2 bedrooms · 6 guests' },
            { icon: <PoolIcon />, label: 'Pool + hot tub' },
            { icon: <SunIcon />, label: '5 min to beach' },
            { icon: <StarIcon />, label: 'Superhost · 4.9 ★' },
          ].map(f => <FeatureChip key={f.label} {...f} />)}
        </div>
      </section>

      {/* ── Rooms ── */}
      <section id="rooms" style={{ background: LIGHT, padding: '0' }}>
        <div className="section-inner" style={{ maxWidth: 1060, margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              color: GOLD, textTransform: 'uppercase',
            }}>The space</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 700, color: NAVY, marginTop: 8 }}>
              Every room, considered
            </h2>
          </div>

          <div
            className="rooms-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}
          >
            <RoomCard
              photo={img2}
              tag="Master Bedroom"
              title="King Bed · En-suite · Balcony"
              beds="1 King bed"
              desc="Private en-suite bathroom. Sliding glass doors open directly onto the balcony with unobstructed intracoastal views. Wood floors and dark wood furniture throughout."
            />
            <RoomCard
              photo={imgSecondBed}
              tag="Second Bedroom"
              title="Queen + Single · Flexible"
              beds="1 Queen bed + 1 Single bed"
              desc="Ceiling fan, wood floors. Shared hallway bathroom (not en-suite). Comfortable for couples or two guests sharing."
            />
            <RoomCard
              photo={img3}
              tag="Living Room & Kitchen"
              title="Open-plan · Smart TV · Full Kitchen"
              beds={null}
              desc="Large black leather sectional, Smart TV, and sliding glass doors to the balcony with intracoastal views. Fully equipped kitchen with stainless steel appliances and granite countertops."
            />
            <RoomCard
              photo={img9}
              tag="Pool & Common Areas"
              title="Outdoor Pool · Hot Tub · Waterfront"
              beds={null}
              desc="Outdoor pool and hot tub directly on the intracoastal waterfront. Sun loungers and landscaped grounds. Perfect for golden-hour swims."
            />
          </div>
        </div>
      </section>

      {/* ── Video Section ── */}
      <section style={{ background: NAVY, padding: '0' }}>
        <div className="section-inner" style={{ maxWidth: 1060, margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              color: GOLD, textTransform: 'uppercase',
            }}>Virtual tour</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 700, color: WHITE, marginTop: 8 }}>
              See it for yourself
            </h2>
          </div>

          <div
            className="video-grid"
            style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}
          >
            {/* Room Tour — 16:9 */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: 16, padding: '4px 12px', marginBottom: 10,
                }}>
                  <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Full Room Tour
                  </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.6 }}>
                  Cinematic walkthrough — master bedroom, living room, balcony, intracoastal views.
                </p>
              </div>
              <div style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: 12, overflow: 'hidden',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                {ROOM_TOUR_VIDEO_URL ? (
                  <video
                    src={ROOM_TOUR_VIDEO_URL}
                    controls loop playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <VideoPlaceholder label="Full Room Tour" />
                )}
              </div>
            </div>

            {/* Promo Reel — 9:16 */}
            <div style={{ width: 340, flexShrink: 0 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: 16, padding: '4px 12px', marginBottom: 10,
                }}>
                  <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Promo Reel
                  </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.6 }}>
                  Vertical highlight reel — ready for Instagram Reels and TikTok.
                </p>
              </div>
              <div style={{
                width: '100%',
                aspectRatio: '9/16',
                borderRadius: 12, overflow: 'hidden',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                {PROMO_REEL_VIDEO_URL ? (
                  <video
                    src={PROMO_REEL_VIDEO_URL}
                    controls loop playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <VideoPlaceholder label="Promo Reel" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section id="location" style={{ background: WHITE, padding: '0' }}>
        <div className="section-inner" style={{ maxWidth: 1060, margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              color: GOLD, textTransform: 'uppercase',
            }}>Where you'll be</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 700, color: NAVY, marginTop: 8 }}>
              Sunny Isles Beach, Florida
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.8, marginBottom: 24 }}>
                Le Marina Bay 409 sits on the Intracoastal Waterway in Sunny Isles Beach — a barrier island between Biscayne Bay and the Atlantic, midway between Miami and Fort Lauderdale.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Sunny Isles Beach', dist: '5 min walk' },
                  { label: 'Aventura Mall', dist: '10 min drive' },
                  { label: 'Fort Lauderdale Airport (FLL)', dist: '25 min drive' },
                  { label: 'Miami / Wynwood', dist: '30 min drive' },
                  { label: 'Hard Rock Casino', dist: '15 min drive' },
                ].map(({ label, dist }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: TEXT }}>
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: GOLD, flexShrink: 0, display: 'inline-block',
                      }} />
                      {label}
                    </span>
                    <span style={{ fontSize: 13, color: GOLD, fontWeight: 600 }}>{dist}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              flex: 1, minWidth: 280, borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(11,47,78,0.12)',
              minHeight: 320,
              background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <iframe
                title="Le Marina Bay 409 map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3589.8!2d-80.1224!3d25.9384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad3e7d5e1e1d%3A0x0!2sSunny%20Isles%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1"
                width="100%" height="100%"
                style={{ border: 0, position: 'absolute', inset: 0, borderRadius: 16 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" style={{ background: LIGHT, padding: '0' }}>
        <div className="section-inner" style={{ maxWidth: 1060, margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              color: GOLD, textTransform: 'uppercase',
            }}>Guest reviews</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 8, marginBottom: 36 }}>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 700, color: NAVY }}>
                ★ 4.9
              </h2>
              <span style={{ fontSize: 16, color: GRAY }}>· 48 reviews on Airbnb</span>
            </div>
          </div>

          <div
            className="reviews-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}
          >
            <ReviewCard
              name="Valentina R."
              flag="🇦🇷"
              date="March 2025"
              stars={5}
              text="The views from the balcony are absolutely stunning. Woke up every morning to the intracoastal and couldn't believe we were only 5 minutes from the beach. The king bed in the master is incredibly comfortable."
            />
            <ReviewCard
              name="Marcus T."
              flag="🇬🇧"
              date="February 2025"
              stars={5}
              text="Perfect base between Miami and Fort Lauderdale. The apartment is exactly as photographed — huge, spotless, and the balcony is a proper highlight. Pool area is beautiful and we had it mostly to ourselves."
            />
            <ReviewCard
              name="Camille D."
              flag="🇫🇷"
              date="January 2025"
              stars={5}
              text="Superb location, superb apartment. The kitchen is fully equipped — we cooked every night with groceries from Publix five minutes away. Host communication was fast and clear throughout."
            />
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`,
        padding: '70px 40px',
        textAlign: 'center',
      }}>
        <span style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
          color: GOLD, textTransform: 'uppercase',
        }}>Ready to escape?</span>
        <h2 style={{
          fontSize: '2.8rem', fontWeight: 700, color: WHITE,
          margin: '14px 0 16px', fontFamily: 'Playfair Display, serif',
        }}>
          Book your stay at Le Marina Bay 409
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          Sunny Isles Beach · 116 m² · 2BR/2BA · Intracoastal views · Pool · Superhost
        </p>
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', background: GOLD, color: NAVY,
            padding: '16px 40px', borderRadius: 32, fontWeight: 700, fontSize: 17,
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(201,168,76,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,76,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,168,76,0.4)'
          }}
        >
          Check availability on Airbnb ↗
        </a>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        background: '#071E30', padding: '28px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
          © 2026 Le Marina Bay 409 · Sunny Isles Beach, FL
        </span>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <button
            onClick={() => setPrivacyOpen(true)}
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            Privacy Policy
          </button>
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: GOLD, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}
          >
            View on Airbnb ↗
          </a>
        </div>
      </footer>

      {!cookieDismissed && (
        <CookieBanner onDismiss={dismissCookie} onOpenPrivacy={() => setPrivacyOpen(true)} />
      )}
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </>
  )
}
