import { motion } from 'framer-motion'
import { SITE } from '../config/site'

const EASE = [0.76, 0, 0.24, 1]
const THREAD =
  'M2 8 C 22 -3, 40 19, 60 8 S 98 -3, 118 8 S 156 19, 176 8 S 214 -3, 234 8'

function Curtain() {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-night-deep"
      initial={{ y: '0%' }}
      animate={{ y: '-100%', transition: { duration: 0.7, ease: EASE, delay: 0.1 } }}
      exit={{ y: '0%', transition: { duration: 0.5, ease: EASE } }}
    >
      <motion.span
        className="font-display text-3xl tracking-[0.3em] text-gold"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: [0, 1], transition: { duration: 0.3, delay: 0.2 } }}
      >
        {SITE.name}
      </motion.span>
      <svg width="236" height="16" viewBox="0 0 236 16" fill="none">
        <motion.path
          d={THREAD}
          stroke="#C9A24B"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: 1 }}
          exit={{ pathLength: [0, 1], transition: { duration: 0.4, delay: 0.2, ease: 'easeOut' } }}
        />
      </svg>
    </motion.div>
  )
}

export default function PageShell({ children }) {
  return (
    <motion.div>
      <Curtain />
      {children}
    </motion.div>
  )
}