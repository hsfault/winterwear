import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { SITE, NAV, waLink } from '../config/site'
import { getLenis } from '../hooks/lenis'

const EASE = [0.76, 0, 0.24, 1]
const MENU_LINKS = [{ label: 'Home', to: '/' }, ...NAV]
const ENQUIRY = `Hi ${SITE.name}, I'd like to enquire about your winter collection.`

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > prev && y > 160)
  })

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.documentElement.style.overflow = open ? 'hidden' : ''

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const showSolid = solid || open

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-[70]"
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-night-deep/75 to-transparent transition-opacity duration-300 ${
              showSolid ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-night-deep transition-opacity duration-300 ${
              showSolid ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="container-x relative flex h-16 items-center justify-between lg:h-20">
            <Link
              to="/"
              className="tap flex items-center font-display text-2xl tracking-[0.22em] text-gold lg:text-[1.7rem]"
            >
              {SITE.name}
            </Link>

            <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="tap group relative flex items-center text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-cream/90 transition-colors hover:text-gold"
                >
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? 'text-gold' : ''}>{item.label}</span>
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={waLink(ENQUIRY)}
                target="_blank"
                rel="noreferrer"
                className="tap hidden items-center rounded-full border border-gold/60 px-5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink lg:inline-flex"
              >
                Enquire
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="tap relative grid place-items-center lg:hidden"
              >
                <span className="relative block h-3 w-7">
                  <span
                    className={`absolute left-0 h-[1.5px] w-full bg-gold transition-all duration-300 ${
                      open ? 'top-1/2 rotate-45' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-[1.5px] w-full bg-gold transition-all duration-300 ${
                      open ? 'top-1/2 -rotate-45' : 'top-full'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <motion.span
            aria-hidden="true"
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold"
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            data-lenis-prevent
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-night-deep px-[clamp(1.25rem,5vw,4rem)] pb-8 pt-24"
          >
            <ul className="flex flex-1 flex-col justify-center gap-1 py-4">
              {MENU_LINKS.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.25 + i * 0.06, duration: 0.5, ease: 'easeOut' },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `tap flex items-baseline gap-4 py-2 font-display text-[2.6rem] leading-tight sm:text-6xl ${
                        isActive ? 'italic text-gold' : 'text-cream'
                      }`
                    }
                  >
                    <span className="font-body text-xs tracking-[0.2em] text-gold/80">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 border-t border-gold/30 pt-6 text-sm text-frost">
              <p>{SITE.hours}</p>
              <a
                href={waLink(ENQUIRY)}
                target="_blank"
                rel="noreferrer"
                className="tap mt-2 inline-flex items-center text-gold underline underline-offset-4"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}