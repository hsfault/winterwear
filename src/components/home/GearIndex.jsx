import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { gearCategories } from '../../data/products'
import GoldThread from '../GoldThread'
import Pic from '../Pic'

export default function GearIndex() {
  const [active, setActive] = useState(gearCategories[0].key)
  const navigate = useNavigate()
  const current = gearCategories.find((c) => c.key === active)

  const handle = (key) => {
    if (window.matchMedia('(min-width: 1024px)').matches) navigate(`/gear?cat=${key}`)
    else setActive(key)
  }

  return (
    <section className="bg-night-deep py-24 md:py-36">
      <div className="container-x">
        <GoldThread />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Winter gear</p>
            <h2 className="font-display text-4xl leading-none text-cream sm:text-5xl md:text-6xl">
              Every layer, <span className="italic text-gold">covered.</span>
            </h2>

            <ol className="mt-10 border-t border-gold/25">
              {gearCategories.map((c, idx) => {
                const isActive = c.key === active
                return (
                  <li key={c.key} className="border-b border-gold/25">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => handle(c.key)}
                      onPointerEnter={(e) => {
                        if (e.pointerType === 'mouse') setActive(c.key)
                      }}
                      className="tap flex w-full items-baseline justify-between gap-4 py-5 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-xs font-semibold text-gold/80">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-display text-4xl leading-none transition-colors duration-300 sm:text-5xl lg:text-6xl ${
                            isActive ? 'italic text-gold' : 'text-cream'
                          }`}
                        >
                          {c.label}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-frost/70">{c.items.length} pieces</span>
                    </button>

                    <div className="lg:hidden">
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6">
                              <p className="text-sm text-frost/90">{c.blurb}</p>
                              <div className="mt-4 flex gap-3">
                                {c.items.slice(0, 3).map((it) => (
                                  <Pic
                                    key={it.id}
                                    src={it.image}
                                    alt={it.name}
                                    className="aspect-[3/4] w-[28%] rounded-t-full rounded-b-xl"
                                  />
                                ))}
                              </div>
                              <Link
                                to={`/gear?cat=${c.key}`}
                                className="tap mt-3 inline-flex items-center text-sm text-gold underline underline-offset-4"
                              >
                                See all {c.label.toLowerCase()}
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] w-full">
                {gearCategories.map((c) =>
                  c.items[0] ? (
                    <Pic
                      key={c.key}
                      src={c.items[0].image}
                      alt={c.label}
                      className={`absolute inset-0 rounded-b-3xl rounded-t-full transition-opacity duration-500 ${
                        c.key === active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ) : null,
                )}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-display text-3xl italic text-gold">{current.label}</p>
                  <p className="mt-1 text-sm text-frost/80">{current.blurb}</p>
                </div>
                <Link
                  to={`/gear?cat=${current.key}`}
                  className="tap inline-flex shrink-0 items-center text-sm text-gold underline underline-offset-4"
                >
                  See all
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}