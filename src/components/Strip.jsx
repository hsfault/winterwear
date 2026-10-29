import { useRef } from 'react'
import Pic from './Pic'

const SHAPES = [
  'rounded-t-full rounded-b-2xl aspect-[3/4]',
  'rounded-[2rem] aspect-[4/5]',
  'rounded-b-full rounded-t-2xl aspect-[3/4]',
  'rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl aspect-[4/5]',
]

export default function Strip({ eyebrow, title, accent, items, onOpen }) {
  const ref = useRef(null)
  const scroll = (dir) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="bg-night py-24 md:py-32">
      <div className="container-x mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="font-display text-4xl leading-none text-cream sm:text-5xl md:text-6xl">
            {title} <span className="italic text-gold">{accent}</span>
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              aria-label={dir < 0 ? 'Scroll left' : 'Scroll right'}
              className="tap grid h-12 w-12 place-items-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d={dir < 0 ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,4rem)] pb-6 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li
            key={item.id}
            className="w-[64vw] shrink-0 snap-start sm:w-[40vw] md:w-[28vw] lg:w-[20vw]"
          >
            <button type="button" onClick={() => onOpen(item)} className="group block w-full text-left">
              <Pic
                src={item.image}
                alt={item.name}
                className={`w-full ${SHAPES[i % SHAPES.length]}`}
                imgClassName="group-hover:scale-105"
              />
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <span className="font-display text-xl leading-tight text-cream sm:text-2xl">
                  {item.name}
                </span>
                <span className="shrink-0 text-sm text-gold-soft">{item.price}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}