import { Link } from 'react-router-dom'
import { categoryBanners } from '../../data/products'
import { SITE, waLink } from '../../config/site'
import SnowCanvas from '../SnowCanvas'
import Pic from '../Pic'

export default function Closing() {
  const b = categoryBanners.festive
  return (
    <section className="relative isolate overflow-hidden bg-night-deep">
      <Pic
        src={b.image}
        alt={b.label}
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ objectPosition: b.position }}
      />
      <div className="absolute inset-0 -z-10 bg-night-deep/65" />
      <SnowCanvas density={0.8} />

      <div className="container-x relative z-10 flex min-h-[80svh] flex-col items-center justify-center py-28 text-center">
        <p className="eyebrow mb-5">This season</p>
        <h2 className="max-w-4xl font-display text-5xl leading-[0.95] text-cream [text-shadow:0_2px_24px_rgba(7,32,27,0.6)] sm:text-7xl lg:text-8xl">
          Wrap yourself in <span className="italic text-gold">warmth.</span>
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-cream/90">
          Tell us what you are looking for and we will send photos, sizes and prices on WhatsApp.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(`Hi ${SITE.name}, I'd like to enquire about your winter collection.`)}
            target="_blank"
            rel="noreferrer"
            className="tap inline-flex h-12 items-center rounded-full bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
          >
            Enquire on WhatsApp
          </a>
          <Link
            to="/contact"
            className="tap inline-flex h-12 items-center rounded-full border border-cream/60 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  )
}