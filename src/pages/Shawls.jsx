import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { banners, shawlsMen, shawlsWomen } from '../data/products'
import useIsDesktop from '../hooks/useIsDesktop'
import PageHero from '../components/PageHero'
import GoldThread from '../components/GoldThread'
import Reveal from '../components/Reveal'
import Pic from '../components/Pic'
import ProductSheet from '../components/ProductSheet'
import PageCTA from '../components/PageCTA'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'women', label: 'For her' },
  { key: 'men', label: 'For him' },
]

const SHAPES = [
  'rounded-t-full rounded-b-2xl aspect-[3/4]',
  'rounded-[2rem] aspect-[4/5]',
  'rounded-b-full rounded-t-2xl aspect-[3/4]',
  'rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-2xl rounded-bl-2xl aspect-[4/5]',
]

const OFFSETS = ['', 'mt-12 md:mt-24', 'mt-6 md:mt-10']

export default function Shawls() {
  const [filter, setFilter] = useState('all')
  const [product, setProduct] = useState(null)
  const close = useCallback(() => setProduct(null), [])
  const isDesktop = useIsDesktop()
  const n = isDesktop ? 3 : 2

  const list = useMemo(() => {
    if (filter === 'women') return shawlsWomen
    if (filter === 'men') return shawlsMen
    const out = []
    const max = Math.max(shawlsWomen.length, shawlsMen.length)
    for (let i = 0; i < max; i++) {
      if (shawlsWomen[i]) out.push(shawlsWomen[i])
      if (shawlsMen[i]) out.push(shawlsMen[i])
    }
    return out
  }, [filter])

  const cols = useMemo(() => {
    const c = Array.from({ length: n }, () => [])
    list.forEach((item, i) => c[i % n].push({ item, i }))
    return c
  }, [list, n])

  return (
    <main>
      <PageHero
        eyebrow="The Shawl Room"
        title="Shawls, woven"
        accent="in gold."
        blurb="Pashmina, wool and hand-embroidered pieces for him and for her. Each one is warm enough for January and fine enough for a wedding."
        banner={banners[4]}
        count={shawlsWomen.length + shawlsMen.length}
      />

      <section className="bg-maroon py-16 md:py-24">
        <div className="container-x">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">Browse</p>
              <h2 className="font-display text-4xl leading-none text-cream sm:text-5xl md:text-6xl">
                {list.length} shawls, <span className="italic text-gold">hand-picked.</span>
              </h2>
            </div>
            <div className="flex gap-2" role="tablist" aria-label="Filter shawls">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={`tap rounded-full px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                    filter === f.key
                      ? 'bg-gold text-ink'
                      : 'border border-gold/60 text-gold hover:bg-gold/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={`${filter}-${n}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`grid items-start gap-5 md:gap-10 ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'}`}
          >
            {cols.map((col, ci) => (
              <div key={ci} className={`flex flex-col gap-10 md:gap-16 ${OFFSETS[ci] ?? ''}`}>
                {col.map(({ item, i }) => (
                  <Reveal key={item.id}>
                    <button
                      type="button"
                      onClick={() => setProduct(item)}
                      className="group block w-full text-left"
                    >
                      <Pic
                        src={item.image}
                        alt={item.name}
                        className={`w-full ${SHAPES[i % SHAPES.length]}`}
                        imgClassName="group-hover:scale-105"
                      />
                      <div className="mt-4">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-gold/80">
                          {item.gender === 'women' ? 'For her' : 'For him'}
                        </p>
                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <span className="font-display text-xl leading-tight text-cream sm:text-2xl">
                            {item.name}
                          </span>
                          <span className="shrink-0 text-sm text-gold-soft">{item.price}</span>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <PageCTA
        links={[
          { label: 'Her looks', to: '/women' },
          { label: 'His looks', to: '/men' },
          { label: 'Winter gear', to: '/gear' },
        ]}
      />
      <ProductSheet product={product} onClose={close} />
    </main>
  )
}