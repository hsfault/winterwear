import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { shawlsMen, shawlsWomen } from '../../data/products'
import Pic from '../Pic'

const TABS = [
  { key: 'women', label: 'For her' },
  { key: 'men', label: 'For him' },
]

export default function ShawlRoom({ onOpen }) {
  const [tab, setTab] = useState('women')
  const [dist, setDist] = useState(0)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const distMV = useMotionValue(0)
  const items = tab === 'women' ? shawlsWomen : shawlsMen

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth)
      setDist(d)
      distMV.set(d)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [tab, distMV])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform([scrollYProgress, distMV], ([p, d]) => -p * d)

  return (
    <section
      ref={sectionRef}
      className="relative bg-maroon"
      style={{ height: `calc(100svh + ${dist}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-7 overflow-hidden pb-6 pt-20 md:gap-10">
        <div className="container-x flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">The Shawl Room</p>
            <h2 className="font-display text-4xl leading-none text-cream sm:text-5xl md:text-6xl lg:text-7xl">
              Draped in <span className="italic text-gold">heritage.</span>
            </h2>
          </div>
          <div className="flex gap-2" role="tablist" aria-label="Shawls for">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`tap rounded-full px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                  tab === t.key
                    ? 'bg-gold text-ink'
                    : 'border border-gold/60 text-gold hover:bg-gold/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          key={tab}
          ref={trackRef}
          style={{ x }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex w-max items-start gap-6 pl-[clamp(1.25rem,5vw,4rem)] pr-[12vw] md:gap-10"
        >
          {items.map((item, idx) => (
            <li
              key={item.id}
              className={`w-[68vw] shrink-0 sm:w-[44vw] md:w-[30vw] lg:w-[21vw] ${
                idx % 2 ? 'mt-8 lg:mt-14' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="group block w-full text-left"
              >
                <Pic
                  src={item.image}
                  alt={item.name}
                  className="aspect-[3/4] w-full rounded-b-2xl rounded-t-full"
                  imgClassName="group-hover:scale-105"
                />
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-display text-xl leading-tight text-cream sm:text-2xl">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-sm text-gold-soft">{item.price}</span>
                </div>
                <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold/80">
                  No. {String(idx + 1).padStart(2, '0')}
                </span>
              </button>
            </li>
          ))}
        </motion.ul>

        <div className="container-x flex items-center gap-4">
          <div className="h-px flex-1 bg-gold/25">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-gold" />
          </div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-soft">
            Scroll to glide
          </p>
        </div>
      </div>
    </section>
  )
}