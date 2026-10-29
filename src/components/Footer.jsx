import { Link } from 'react-router-dom'
import { SITE, NAV, waLink } from '../config/site'
import GoldThread from './GoldThread'

const LINKS = [{ label: 'Home', to: '/' }, ...NAV]

export default function Footer() {
  return (
    <footer className="relative bg-night-deep text-cream">
      <div className="container-x pb-10 pt-16 md:pt-24">
        <GoldThread />

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl tracking-[0.2em] text-gold">{SITE.name}</p>
            <p className="mt-4 max-w-sm font-display text-xl italic text-gold-soft">
              {SITE.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-frost/80">
              Shawls, coats and winter essentials for him and her, chosen for warmth that still
              looks like an occasion.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-1">
              {LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="tap inline-flex items-center text-frost/90 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow mb-5">Visit and enquire</p>
            <p className="text-frost/90">{SITE.hours}</p>
            <a
              href={waLink(`Hi ${SITE.name}, I'd like to know more about your winter collection.`)}
              target="_blank"
              rel="noreferrer"
              className="tap mt-2 flex items-center text-gold underline underline-offset-4"
            >
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="tap flex items-center text-frost/90 transition-colors hover:text-gold"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-gold/20 pt-6 text-xs text-frost/60 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Winter, made with care.</p>
        </div>
      </div>
    </footer>
  )
}