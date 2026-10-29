import { motion } from 'framer-motion'
import Pic from './Pic'
import SnowCanvas from './SnowCanvas'

const EASE = [0.22, 1, 0.36, 1]

export default function PageHero({ eyebrow, title, accent, blurb, banner, count, snow = true }) {
  return (
    <section className="relative isolate flex h-[78svh] min-h-[520px] items-end overflow-hidden bg-night-deep">
      <Pic
        src={banner.image}
        alt={banner.label}
        eager
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ objectPosition: banner.position }}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-night-deep/95 via-night-deep/45 to-night-deep/20" />
      <div className="absolute inset-0 -z-10 hidden bg-linear-to-r from-night-deep/80 via-night-deep/20 to-transparent lg:block" />
      {snow && <SnowCanvas density={0.8} />}

      <div className="container-x relative z-10 pb-14 pt-32 md:pb-20">
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {eyebrow}
          </motion.p>

          <h1 className="font-display text-[3.2rem] leading-[0.95] text-cream [text-shadow:0_2px_24px_rgba(7,32,27,0.55)] sm:text-7xl lg:text-8xl">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
              >
                {title}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block italic text-gold"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.97 }}
              >
                {accent}
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-cream/90 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35 }}
          >
            {blurb}
          </motion.p>

          {count != null && (
            <motion.p
              className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold-soft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {count} pieces
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}