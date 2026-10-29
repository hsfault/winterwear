import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { jacketsMen, jacketsWomen } from '../../data/products'
import useIsDesktop from '../../hooks/useIsDesktop'
import Pic from '../Pic'

const PICKS = [
  jacketsWomen[1],
  jacketsMen[1],
  jacketsWomen[3],
  jacketsMen[2],
  jacketsWomen[9],
  jacketsMen[7],
]
  .map((item, i) => ({ item, i }))
  .filter((x) => x.item)

const SHAPES = [
  'rounded-t-full rounded-b-2xl aspect-[3/4]',
  'rounded-[2rem] aspect-[4/5]',
  'rounded-b-full rounded-t-2xl aspect-[3/4]',
  'rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-2xl rounded-bl-2xl aspect-[4/5]',
  'rounded-t-[50%] rounded-b-3xl aspect-[3/4]',
  'rounded-[2.5rem] aspect-[4/5]',
]

function Col({ progress, from, to, className = '', children }) {
  const y = useTransform(progress, [0, 1], [from, to])
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-6 md:gap-10 ${className}`}>
      {children}
    </motion.div>
  )
}

export default function CoatEdit({ onOpen }) {
  const ref = useRef(null)
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const cols = isDesktop
    ? [
        { idx: [0, 3], from: 50, to: -50, offset: '' },
        { idx: [1, 4], from: -40, to: 70, offset: 'mt-24' },
        { idx: [2, 5], from: 30, to: -80, offset: 'mt-8' },
      ]
    : [
        { idx: [0, 2, 4], from: 20, to: -20, offset: '' },
        { idx: [1, 3, 5], from: -10, to: 40, offset: 'mt-12' },
      ]

  return (
    <section ref={ref} className="overflow-hidden bg-cream py-24 text-ink md:py-36">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-maroon">
              The coat edit
            </p>
            <h2 className="font-display text-4xl leading-none sm:text-5xl md:text-6xl lg:text-7xl">
              Outer layers, <span className="italic text-maroon">elevated.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm leading-relaxed text-ink/80">
              Puffers, parkas, shearling and wool overcoats, picked for how they fall as much as how
              they warm.
            </p>
            <Link
              to="/gear?cat=jackets"
              className="tap mt-2 inline-flex items-center text-sm font-semibold text-maroon underline underline-offset-4"
            >
              Browse all jackets
            </Link>
          </div>
        </div>

        <div className={`grid gap-6 pb-16 md:gap-10 ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {cols.map((col, ci) => (
            <Col key={ci} progress={scrollYProgress} from={col.from} to={col.to} className={col.offset}>
              {col.idx.map((n) => {
                const entry = PICKS[n]
                if (!entry) return null
                const { item, i } = entry
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpen(item)}
                    className="group block w-full text-left"
                  >
                    <Pic
                      src={item.image}
                      alt={item.name}
                      className={`w-full ${SHAPES[i % SHAPES.length]}`}
                      imgClassName="group-hover:scale-105"
                    />
                    <div className="mt-3 flex items-baseline justify-between gap-2">
                      <span className="font-display text-lg leading-tight sm:text-xl">{item.name}</span>
                      <span className="shrink-0 text-xs font-semibold text-maroon">{item.price}</span>
                    </div>
                  </button>
                )
              })}
            </Col>
          ))}
        </div>
      </div>
    </section>
  )
}