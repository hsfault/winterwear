import { useCallback, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categoryBanners, gearCategories } from '../data/products'
import { getLenis } from '../hooks/lenis'
import useIsDesktop from '../hooks/useIsDesktop'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Pic from '../components/Pic'
import ProductSheet from '../components/ProductSheet'
import PageCTA from '../components/PageCTA'

const ALL = gearCategories.flatMap((c) => c.items)
const CHIPS = [{ key: 'all', label: 'All gear' }, ...gearCategories.map((c) => ({ key: c.key, label: c.label }))]

const SHAPES = [
  'aspect-square rounded-full',
  'aspect-[3/4] rounded-t-full rounded-b-2xl',
  'aspect-[4/5] rounded-[2.5rem]',
  'aspect-[2/3] rounded-full',
  'aspect-[4/5] rounded-b-full rounded-t-2xl',
  'aspect-square rounded-[3rem]',
]

const OFFSETS_DESKTOP = ['', 'mt-14', 'mt-6', 'mt-20']
const OFFSETS_MOBILE = ['', 'mt-10']

export default function Gear() {
  const [params, setParams] = useSearchParams()
  const [product, setProduct] = useState(null)
  const close = useCallback(() => setProduct(null), [])
  const isDesktop = useIsDesktop()
  const listRef = useRef(null)

  const key = CHIPS.some((c) => c.key === params.get('cat')) ? params.get('cat') : 'all'
  const category = gearCategories.find((c) => c.key === key)
  const items = key === 'all' ? ALL : category.items
  const blurb = key === 'all' ? 'Gloves, socks, caps, scarves, boots, knitwear and jackets.' : category.blurb

  const n = isDesktop ? 4 : 2
  const offsets = isDesktop ? OFFSETS_DESKTOP : OFFSETS_MOBILE

  const cols = useMemo(() => {
    const c = Array.from({ length: n }, () => [])
    items.forEach((item, i) => c[i % n].push({ item, i }))
    return c
  }, [items, n])

  const choose = (k) => {
    setParams(k === 'all' ? {} : { cat: k }, { replace: true })
    const lenis = getLenis()
    if (lenis && listRef.current) lenis.scrollTo(listRef.current, { offset: -90 })
  }

  return (
    <main>
      <PageHero
        eyebrow="Winter gear"
        title="Every layer,"
        accent="covered."
        blurb="The small things that make winter bearable: gloves, scarves, caps, socks, boots, knitwear and jackets."
        banner={categoryBanners.gear}
        count={ALL.length}
      />

      <section ref={listRef} className="bg-night py-16 md:py-24">
        <div className="container-x">
          <div className="mb-12 md:mb-16">
            <p className="eyebrow mb-3">Browse</p>
            <h2 className="font-display text-4xl leading-none text-cream sm:text-5xl md:text-6xl">
              {key === 'all' ? 'All gear' : category.label},{' '}
              <span className="italic text-gold">{items.length} pieces.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-frost/90">{blurb}</p>

            <div
              className="-mx-[clamp(1.25rem,5vw,4rem)] mt-8 flex gap-2 overflow-x-auto px-[clamp(1.25rem,5vw,4rem)] pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Gear categories"
            >
              {CHIPS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={key === c.key}
                  onClick={() => choose(c.key)}
                  className={`tap shrink-0 rounded-full px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                    key === c.key
                      ? 'bg-gold text-ink'
                      : 'border border-gold/60 text-gold hover:bg-gold/10'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={`${key}-${n}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`grid items-start gap-4 md:gap-8 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}
          >
            {cols.map((col, ci) => (
              <div key={ci} className={`flex flex-col gap-10 md:gap-14 ${offsets[ci] ?? ''}`}>
                {col.map(({ item, i }) => (
                  <Reveal key={item.id} y={28}>
                    <button
                      type="button"
                      onClick={() => setProduct(item)}
                      className="group block w-full text-left"
                    >
                      <Pic
                        src={item.image}
                        alt={item.name}
                        className={`w-full ${SHAPES[i % SHAPES.length]}`}
                        imgClassName="group-hover:scale-110"
                      />
                      <div className="mt-3">
                        <span className="block font-display text-lg leading-tight text-cream sm:text-xl">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-gold-soft">{item.price}</span>
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
          { label: 'Shawls', to: '/shawls' },
          { label: 'Her looks', to: '/women' },
          { label: 'His looks', to: '/men' },
        ]}
      />
      <ProductSheet product={product} onClose={close} />
    </main>
  )
}