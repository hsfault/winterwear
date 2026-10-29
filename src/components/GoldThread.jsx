import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'

const D =
  'M0 20 C 100 4, 200 36, 300 20 S 500 4, 600 20 S 800 36, 900 20 S 1100 4, 1200 20'

export default function GoldThread({ className = '', flip = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'start 45%'],
  })

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="block h-8 w-full text-gold md:h-10"
        style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      >
        <path
          d={D}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="3 7"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={D}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </div>
  )
}