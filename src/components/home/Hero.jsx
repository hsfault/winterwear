import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { heroBanners } from '../../data/products'
import { SITE, waLink } from '../../config/site'
import SnowCanvas from '../SnowCanvas'
import Pic from '../Pic'

const DURATION = 6500
const LINES = [['Winter,'], ['wrapped', 'in'], ['gold.']]

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setI((v) => (v + 1) % heroBanners.length), DURATION)
    return () => clearTimeout(t)
  }, [i])

  let w = 0

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-night-deep">
      {/* slides */}
      {heroBanners.map((b, idx) => (
        <div
          key={b.id}
          aria-hidden={idx !== i}
          className={`absolute inset-0 z-0 transition-opacity duration-[1400ms] ease-in-out ${
            idx === i ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`h-full w-full transition-transform duration-[7000ms] ease-out ${
              idx === i ? 'scale-100' : 'scale-110'
            }`}
          >
            <Pic
              src={b.image}
              alt={b.label}
              eager={idx === 0}
              className="h-full w-full"
              style={{ objectPosition: b.position }}
            />
          </div>
        </div>
      ))}

      {/* scrims keep text readable on every banner */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-night-deep/90 via-night-deep/35 to-night-deep/10" />
      <div className="absolute inset-0 z-10 hidden bg-linear-to-r from-night-deep/80 via-night-deep/25 to-transparent lg:block" />

      <SnowCanvas />

      {/* content */}
      <div className="relative z-30 flex h-full flex-col justify-end pb-28 pt-28 lg:justify-center lg:pb-16">
        <div className="container-x">
          <div className="max-w-2xl">
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              The winter collection · Men and women
            </motion.p>

            <h1 className="font-display text-[3.4rem] leading-[0.95] text-cream [text-shadow:0_2px_24px_rgba(7,32,27,0.55)] sm:text-7xl lg:text-8xl xl:text-[8rem]">
              {LINES.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word) => {
                    const n = w++
                    return (
                      <span
                        key={word}
                        className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom"
                      >
                        <motion.span
                          className={`inline-block ${word === 'gold.' ? 'italic text-gold' : ''}`}
                          initial={{ y: '110%' }}
                          animate={{ y: '0%' }}
                          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.9 + n * 0.12 }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    )
                  })}
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-cream/90 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              Pashmina, wool and hand-embroidered shawls, with every layer to match, for him and for
              her.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <Link
                to="/shawls"
                className="tap inline-flex h-12 items-center rounded-full bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
              >
                Explore shawls
              </Link>
              <a
                href={waLink(`Hi ${SITE.name}, I'd like to enquire about your winter collection.`)}
                target="_blank"
                rel="noreferrer"
                className="tap inline-flex h-12 items-center rounded-full border border-cream/60 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:border-gold hover:text-gold"
              >
                Enquire
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* slide indicators */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="container-x flex items-end justify-between gap-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex max-w-md flex-1 gap-2" role="tablist" aria-label="Banner slides">
            {heroBanners.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                role="tab"
                aria-selected={idx === i}
                aria-label={`Show slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className="tap flex flex-1 items-end"
              >
                <span className="relative block h-[2px] w-full overflow-hidden bg-cream/35">
                  {idx < i && <span className="absolute inset-0 bg-gold/70" />}
                  {idx === i && (
                    <motion.span
                      key={i}
                      className="absolute inset-0 origin-left bg-gold"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: DURATION / 1000, ease: 'linear' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <p className="hidden pb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream/85 sm:block">
            {String(i + 1).padStart(2, '0')} / {String(heroBanners.length).padStart(2, '0')} ·{' '}
            {heroBanners[i].label}
          </p>
        </div>
      </div>
    </section>
  )
}