import { Link } from 'react-router-dom'
import SnowCanvas from '../components/SnowCanvas'

export default function NotFound() {
  return (
    <main>
      <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-night-deep px-6 pb-20 pt-28 text-center">
        <SnowCanvas />
        <div className="relative z-10 w-full max-w-xl">
          <p className="eyebrow mb-5">Error 404</p>
          <h1 className="font-display text-6xl leading-[0.95] text-cream sm:text-8xl">
            This thread <span className="italic text-gold">leads nowhere.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-frost/90">
            The page you are looking for has slipped off the loom. Let us take you back to the
            collection.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="tap inline-flex h-12 items-center rounded-full bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
            >
              Back to home
            </Link>
            <Link
              to="/shawls"
              className="tap inline-flex h-12 items-center rounded-full border border-cream/60 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              See shawls
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}