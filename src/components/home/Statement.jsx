import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GoldThread from '../GoldThread'

const TEXT =
  'Some winters are simply survived. Ours are worn: in *pashmina* that remembers the mountains, in wool that holds every degree of warmth, and in *gold* thread that turns a cold morning into an occasion.'
const WORDS = TEXT.split(' ')

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  const gold = word.startsWith('*')
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.28em] inline-block ${gold ? 'italic text-gold' : ''}`}
    >
      {word.replace(/\*/g, '')}
    </motion.span>
  )
}

export default function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 55%'],
  })

  return (
    <section className="bg-night py-24 md:py-36">
      <div className="container-x">
        <GoldThread />
        <p className="eyebrow mb-8 mt-14">Why we do it</p>
        <p
          ref={ref}
          className="max-w-5xl font-display text-[2rem] leading-[1.15] text-cream sm:text-5xl lg:text-6xl"
        >
          {WORDS.map((word, i) => {
            const start = (i / WORDS.length) * 0.85
            return (
              <Word key={i} word={word} progress={scrollYProgress} range={[start, start + 0.15]} />
            )
          })}
        </p>
      </div>
    </section>
  )
}