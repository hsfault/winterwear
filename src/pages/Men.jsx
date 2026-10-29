import { useCallback, useEffect, useRef, useState } from 'react'
import { categoryBanners, jacketsMen, outfitsMen } from '../data/products'
import { getLenis } from '../hooks/lenis'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Pic from '../components/Pic'
import Strip from '../components/Strip'
import ProductSheet from '../components/ProductSheet'
import PageCTA from '../components/PageCTA'

const SHAPES = [
  'rounded-tr-[7rem] rounded-bl-[7rem] rounded-tl-2xl rounded-br-2xl',
  'rounded-tl-[7rem] rounded-br-[7rem] rounded-tr-2xl rounded-bl-2xl',
]

export default function Men() {
  const [active, setActive] = useState(0)
  const [product, setProduct] = useState(null)
  const close = useCallback(() => setProduct(null), [])
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const goTo = (i) => {
    const el = refs.current[i]
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -100 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <main>
      <PageHero
        eyebrow="For him"
        title="Layered,"
        accent="never loud."
        blurb="Overcoats, waistcoats, kameez and shawls: the warm layers that make a cold day look deliberate."
        banner={categoryBanners.men}
        count={outfitsMen.length + jacketsMen.length}
      />

      <section className="bg-night-deep py-20 md:py-32">
        <div className="container-x">
          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="eyebrow mb-3">The index</p>
            <h2 className="font-display text-4xl leading-none text-cream sm:text-5xl md:text-6xl">
              {outfitsMen.length} looks, <span className="italic text-gold">top to toe.</span>
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* sticky index (desktop) */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 max-h-[calc(100svh-9rem)] overflow-y-auto pr-2" data-lenis-prevent>
                <ol className="border-l border-gold/25">
                  {outfitsMen.map((item, i) => {
                    const on = i === active
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          className="flex h-8 w-full items-center gap-3 pl-4 text-left"
                        >
                          <span className={`w-6 text-xs font-semibold ${on ? 'text-gold' : 'text-gold/50'}`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`font-display text-lg leading-none transition-all duration-300 ${
                              on ? 'translate-x-1 italic text-gold' : 'text-cream/70'
                            }`}
                          >
                            {item.name}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </aside>

            {/* looks */}
            <div className="space-y-20 md:space-y-32 lg:col-span-8">
              {outfitsMen.map((item, i) => (
                <article
                  key={item.id}
                  ref={(el) => (refs.current[i] = el)}
                  data-index={i}
                  className={`mx-auto w-full max-w-[38rem] transition-opacity duration-500 ${
                    i === active ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  <Reveal>
                    <button
                      type="button"
                      onClick={() => setProduct(item)}
                      className="group block w-full text-left"
                    >
                      <Pic
                        src={item.image}
                        alt={item.name}
                        className={`aspect-[4/5] w-full ${SHAPES[i % SHAPES.length]}`}
                        imgClassName="group-hover:scale-105"
                      />
                      <div className="mt-5 flex items-baseline justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold tracking-[0.25em] text-gold/80">
                            LOOK {String(i + 1).padStart(2, '0')}
                          </p>
                          <h3 className="mt-1 font-display text-3xl leading-tight text-cream sm:text-4xl">
                            {item.name}
                          </h3>
                        </div>
                        <span className="shrink-0 font-display text-2xl italic text-gold">
                          {item.price}
                        </span>
                      </div>
                    </button>
                  </Reveal>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Strip eyebrow="Outerwear" title="Coats for" accent="him." items={jacketsMen} onOpen={setProduct} />

      <PageCTA
        links={[
          { label: 'Shawls', to: '/shawls' },
          { label: 'Her looks', to: '/women' },
          { label: 'Winter gear', to: '/gear' },
        ]}
      />
      <ProductSheet product={product} onClose={close} />
    </main>
  )
}