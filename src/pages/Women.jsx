import { useCallback, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { categoryBanners, jacketsWomen, outfitsWomen } from '../data/products'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Pic from '../components/Pic'
import Strip from '../components/Strip'
import ProductSheet from '../components/ProductSheet'
import PageCTA from '../components/PageCTA'

const LINES = [
  'A complete look from the outer layer down to the boots, styled for the season.',
  'Warm where it counts and polished everywhere else.',
  'Layers that move well and photograph even better.',
  'Built for cold mornings, long evenings and everything in between.',
]

function Look({ item, index, onOpen }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  const flip = index % 2 === 1

  return (
    <article className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
      <Reveal className={`lg:col-span-6 lg:row-start-1 ${flip ? 'lg:col-start-7' : 'lg:col-start-1'}`}>
        <button type="button" onClick={() => onOpen(item)} className="group block w-full text-left">
          <div
            ref={ref}
            className={`relative aspect-[3/4] overflow-hidden ${
              flip ? 'rounded-t-[8rem] rounded-b-3xl' : 'rounded-t-3xl rounded-b-[8rem]'
            }`}
          >
            <motion.div style={{ y, scale: 1.16 }} className="h-full w-full">
              <Pic src={item.image} alt={item.name} className="h-full w-full" />
            </motion.div>
          </div>
        </button>
      </Reveal>

      <Reveal
        delay={0.1}
        className={`lg:col-span-5 lg:row-start-1 ${flip ? 'lg:col-start-1' : 'lg:col-start-8'}`}
      >
        <span className="block font-display text-8xl leading-none text-transparent [-webkit-text-stroke:1px_#C9A24B] lg:text-[9rem]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="eyebrow mb-3 mt-4">Look</p>
        <h3 className="font-display text-4xl leading-tight text-cream lg:text-6xl">{item.name}</h3>
        <p className="mt-3 font-display text-3xl italic text-gold">{item.price}</p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-frost/90">{LINES[index % LINES.length]}</p>
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="tap mt-7 inline-flex h-12 items-center rounded-full border border-gold/70 px-7 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          View and enquire
        </button>
      </Reveal>
    </article>
  )
}

export default function Women() {
  const [shown, setShown] = useState(8)
  const [product, setProduct] = useState(null)
  const close = useCallback(() => setProduct(null), [])
  const left = outfitsWomen.length - shown

  return (
    <main>
      <PageHero
        eyebrow="For her"
        title="Dressed for"
        accent="the cold."
        blurb="Coats, velvet suits, cardigans and shawls, each styled as a complete look from head to toe."
        banner={categoryBanners.women}
        count={outfitsWomen.length + jacketsWomen.length}
      />

      <section className="bg-maroon py-20 md:py-32">
        <div className="container-x">
          <div className="mb-16 max-w-2xl md:mb-24">
            <p className="eyebrow mb-3">The lookbook</p>
            <h2 className="font-display text-4xl leading-none text-cream sm:text-5xl md:text-6xl">
              {outfitsWomen.length} complete looks, <span className="italic text-gold">one for every cold day.</span>
            </h2>
          </div>

          <div className="space-y-24 md:space-y-36">
            {outfitsWomen.slice(0, shown).map((item, i) => (
              <Look key={item.id} item={item} index={i} onOpen={setProduct} />
            ))}
          </div>

          {left > 0 && (
            <div className="mt-20 flex justify-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + 6)}
                className="tap inline-flex h-12 items-center rounded-full bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
              >
                Show more looks ({left} left)
              </button>
            </div>
          )}
        </div>
      </section>

      <Strip
        eyebrow="Outerwear"
        title="Coats for"
        accent="her."
        items={jacketsWomen}
        onOpen={setProduct}
      />

      <PageCTA
        links={[
          { label: 'Shawls', to: '/shawls' },
          { label: 'His looks', to: '/men' },
          { label: 'Winter gear', to: '/gear' },
        ]}
      />
      <ProductSheet product={product} onClose={close} />
    </main>
  )
}