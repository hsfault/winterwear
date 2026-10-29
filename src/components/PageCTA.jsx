import { Link } from 'react-router-dom'
import { SITE, waLink } from '../config/site'
import GoldThread from './GoldThread'
import Reveal from './Reveal'

export default function PageCTA({ title = 'Found something', accent = 'you love?', links = [] }) {
  return (
    <section className="bg-night-deep py-24 md:py-32">
      <div className="container-x">
        <GoldThread />
        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-4">Let us help</p>
            <h2 className="font-display text-5xl leading-none text-cream sm:text-6xl">
              {title} <span className="italic text-gold">{accent}</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-frost/90">
              Message us the name of the piece and we will reply with sizes, colours and prices.
            </p>
            <a
              href={waLink(`Hi ${SITE.name}, I'd like to enquire about your winter collection.`)}
              target="_blank"
              rel="noreferrer"
              className="tap mt-8 inline-flex h-12 items-center rounded-full bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
            >
              Enquire on WhatsApp
            </a>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="eyebrow mb-4">Keep exploring</p>
            <ul className="border-t border-gold/25">
              {links.map((l) => (
                <li key={l.to} className="border-b border-gold/25">
                  <Link
                    to={l.to}
                    className="tap group flex items-center justify-between py-4 font-display text-3xl text-cream transition-colors hover:text-gold sm:text-4xl"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:italic">
                      {l.label}
                    </span>
                    <span className="text-gold">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}