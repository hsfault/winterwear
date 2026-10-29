import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { outfitsMen, outfitsWomen } from '../../data/products'
import Pic from '../Pic'

const pick = (list, idxs) => idxs.map((i) => list[i]).filter(Boolean)

const PANELS = [
  {
    id: 'women',
    title: 'For Her',
    blurb: 'Coats, velvet suits and shawls, styled head to toe.',
    to: '/women',
    items: pick(outfitsWomen, [0, 1, 6, 15, 19]),
    shape: 'lg:rounded-tl-[9rem]',
  },
  {
    id: 'men',
    title: 'For Him',
    blurb: 'Overcoats, waistcoats and warm layers, ready to wear.',
    to: '/men',
    items: pick(outfitsMen, [0, 1, 4, 8, 18]),
    shape: 'lg:rounded-br-[9rem]',
  },
]

function Crossfade({ items, run }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!run || items.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 3200)
    return () => clearInterval(t)
  }, [run, items.length])

  return items.map((it, idx) => (
    <Pic
      key={it.id}
      src={it.image}
      alt={it.name}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        idx === i ? 'opacity-100' : 'opacity-0'
      }`}
    />
  ))
}

export default function CompleteLooks() {
  const [active, setActive] = useState('women')

  return (
    <section className="bg-night py-24 md:py-32">
      <div className="container-x">
        <p className="eyebrow mb-4">Complete looks</p>
        <h2 className="mb-10 font-display text-4xl leading-none text-cream sm:text-5xl md:text-6xl lg:text-7xl">
          Head to toe, <span className="italic text-gold">sorted.</span>
        </h2>

        <div className="flex h-[92svh] max-h-[900px] min-h-[600px] flex-col gap-3 lg:flex-row lg:gap-4">
          {PANELS.map((p) => {
            const isActive = active === p.id
            return (
              <article
                key={p.id}
                style={{ flexGrow: isActive ? 3 : 1 }}
                className={`relative min-h-0 flex-1 basis-0 overflow-hidden rounded-3xl transition-[flex-grow] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${p.shape}`}
              >
                <Crossfade items={p.items} run={isActive} />

                <div className="absolute inset-0 z-10 bg-linear-to-t from-night-deep/90 via-night-deep/25 to-transparent" />
                <div
                  className={`absolute inset-0 z-10 bg-night-deep transition-opacity duration-700 ${
                    isActive ? 'opacity-0' : 'opacity-35'
                  }`}
                />

                <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-8">
                  <p className="eyebrow mb-2">{isActive ? 'Complete looks' : 'Tap to explore'}</p>
                  <h3 className="font-display text-4xl leading-none text-cream md:text-6xl">
                    {p.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/90">
                          {p.blurb}
                        </p>
                        <Link
                          to={p.to}
                          className="tap mt-4 inline-flex h-12 items-center rounded-full bg-gold px-7 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
                        >
                          View the collection
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!isActive && (
                  <button
                    type="button"
                    onClick={() => setActive(p.id)}
                    aria-label={`Open ${p.title} looks`}
                    className="absolute inset-0 z-30"
                  />
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}