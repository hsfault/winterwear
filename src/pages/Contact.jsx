import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SITE, waLink } from '../config/site'
import SnowCanvas from '../components/SnowCanvas'

const BLANKS = [
  {
    key: 'what',
    question: 'What are you looking for?',
    hint: 'something',
    options: ['a shawl', 'a coat or jacket', 'a complete outfit', 'winter accessories'],
  },
  {
    key: 'whom',
    question: 'Who is it for?',
    hint: 'someone',
    options: ['her', 'him', 'the whole family'],
  },
  {
    key: 'when',
    question: 'What is the occasion?',
    hint: 'an occasion',
    options: ['everyday wear', 'a wedding or festive event', 'travelling to the mountains'],
  },
  {
    key: 'colour',
    question: 'Which colours feel right?',
    hint: 'colours',
    options: ['warm neutrals', 'deep jewel tones', 'classic black and grey', 'something surprising'],
  },
  {
    key: 'budget',
    question: 'What is your budget?',
    hint: 'a budget',
    options: ['Rs 5,000 or less', 'Rs 5,000 to 10,000', 'Rs 10,000 to 20,000', 'Rs 20,000 and above'],
  },
]

const THREAD =
  'M2 14 C 80 -2, 160 30, 240 14 S 400 -2, 480 14 S 640 30, 720 14 S 880 -2, 960 14 S 1120 30, 1198 14'

function Blank({ def, value, active, onClick }) {
  const border = active
    ? 'border-solid border-gold'
    : value
      ? 'border-solid border-gold/70'
      : 'border-dashed border-gold/50'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${def.question} ${value ?? 'not chosen yet'}`}
      className={`inline border-b-2 px-1 py-1 italic transition-colors duration-300 ${border} ${
        value ? 'text-gold' : 'text-gold/70'
      }`}
    >
      {value ?? def.hint}
    </button>
  )
}

export default function Contact() {
  const [vals, setVals] = useState({})
  const [name, setName] = useState('')
  const [activeKey, setActiveKey] = useState(BLANKS[0].key)

  const filled = BLANKS.filter((b) => vals[b.key]).length
  const done = filled === BLANKS.length
  const active = BLANKS.find((b) => b.key === activeKey)

  const choose = (key, option) => {
    const next = { ...vals, [key]: option }
    setVals(next)
    const nextBlank = BLANKS.find((b) => !next[b.key])
    if (nextBlank) setActiveKey(nextBlank.key)
  }

  const message = useMemo(() => {
    if (!done) return ''
    const who = name.trim() ? `, I'm ${name.trim()}` : ''
    return `Salaam ${SITE.name}${who}. I'm looking for ${vals.what} for ${vals.whom}, for ${vals.when}, in ${vals.colour}, with a budget of ${vals.budget}. Please send me photos and prices.`
  }, [done, name, vals])

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-night-deep pb-24 pt-28 md:pb-32 md:pt-36">
        <SnowCanvas density={0.5} />

        <div className="container-x relative z-10">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="eyebrow mb-8">Write us a line</h1>

              {/* the sentence */}
              <p className="font-display text-[1.9rem] leading-[1.5] text-cream sm:text-5xl sm:leading-[1.4] lg:text-6xl">
                Salaam {SITE.name}, I&rsquo;m{' '}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="your name"
                  maxLength={30}
                  aria-label="Your name (optional)"
                  style={{ width: `${Math.max(name.length, 9) + 1}ch` }}
                  className="inline-block max-w-full border-b-2 border-dashed border-gold/50 bg-transparent px-1 py-1 italic text-gold outline-none transition-colors placeholder:text-gold/50 focus:border-solid focus:border-gold"
                />
                . I&rsquo;m looking for{' '}
                <Blank def={BLANKS[0]} value={vals.what} active={activeKey === 'what'} onClick={() => setActiveKey('what')} />{' '}
                for{' '}
                <Blank def={BLANKS[1]} value={vals.whom} active={activeKey === 'whom'} onClick={() => setActiveKey('whom')} />
                , for{' '}
                <Blank def={BLANKS[2]} value={vals.when} active={activeKey === 'when'} onClick={() => setActiveKey('when')} />
                , in{' '}
                <Blank def={BLANKS[3]} value={vals.colour} active={activeKey === 'colour'} onClick={() => setActiveKey('colour')} />
                , with a budget of{' '}
                <Blank def={BLANKS[4]} value={vals.budget} active={activeKey === 'budget'} onClick={() => setActiveKey('budget')} />.
              </p>

              {/* options tray */}
              <div className="mt-10 min-h-[10rem]" aria-live="polite">
                <p className="eyebrow mb-4">{active.question}</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeKey}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap gap-3"
                  >
                    {active.options.map((opt) => {
                      const selected = vals[active.key] === opt
                      return (
                        <button
                          key={opt}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => choose(active.key, opt)}
                          className={`tap rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                            selected
                              ? 'bg-gold text-ink'
                              : 'border border-gold/60 text-cream hover:border-gold hover:text-gold'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* thread progress */}
              <div className="mt-6" aria-hidden="true">
                <svg viewBox="0 0 1200 28" preserveAspectRatio="none" className="block h-7 w-full text-gold">
                  <path
                    d={THREAD}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.path
                    d={THREAD}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: filled / BLANKS.length }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                {done ? (
                  <a
                    href={waLink(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="tap inline-flex h-12 items-center rounded-full bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
                  >
                    Send on WhatsApp
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="tap inline-flex h-12 cursor-not-allowed items-center rounded-full border border-gold/40 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold/60"
                  >
                    Send on WhatsApp
                  </button>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                  {filled} of {BLANKS.length} stitched
                </p>
              </div>

              {done && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 max-w-xl text-sm italic leading-relaxed text-frost/80"
                >
                  &ldquo;{message}&rdquo;
                </motion.p>
              )}
            </div>

            {/* quiet side column */}
            <aside className="lg:col-span-3 lg:col-start-10">
              <div className="border-t border-gold/30 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="eyebrow mb-4">Prefer your own words?</p>
                <a
                  href={waLink(`Hi ${SITE.name}, I'd like to know more about your winter collection.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="tap flex items-center text-gold underline underline-offset-4"
                >
                  Open WhatsApp directly
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="tap flex items-center text-frost/90 transition-colors hover:text-gold"
                >
                  {SITE.email}
                </a>

                <p className="eyebrow mb-3 mt-10">Hours</p>
                <p className="text-frost/90">{SITE.hours}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}