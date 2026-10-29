import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { SITE, waLink } from '../config/site'
import { getLenis } from '../hooks/lenis'
import Pic from './Pic'

const KIND = {
  shawls: 'Shawl',
  outfits: 'Complete look',
  jackets: 'Jacket',
  gloves: 'Gloves',
  socks: 'Socks',
  caps: 'Cap',
  scarves: 'Scarf',
  boots: 'Footwear',
  knitwear: 'Knitwear',
}
const FOR = { women: 'For her', men: 'For him', unisex: 'For everyone' }
const EASE = [0.22, 1, 0.36, 1]

export default function ProductSheet({ product, onClose }) {
  const controls = useDragControls()
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!product) return
    const lenis = getLenis()
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [product])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="sheet-backdrop"
          className="fixed inset-0 z-[80] bg-ink/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />
      )}
      {product && (
        <motion.aside
          key="sheet"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 z-[85] max-h-[92svh] overflow-y-auto overscroll-contain rounded-t-[2rem] bg-night-deep text-cream shadow-2xl lg:bottom-1/2 lg:mx-auto lg:max-w-4xl lg:translate-y-1/2 lg:rounded-[2rem]"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5, ease: EASE }}
          drag="y"
          dragControls={controls}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.5 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 110 || info.velocity.y > 600) onClose()
          }}
        >
          <div
            onPointerDown={(e) => controls.start(e)}
            className="flex h-8 cursor-grab touch-none items-center justify-center lg:hidden"
          >
            <span className="h-1 w-12 rounded-full bg-gold/60" />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="tap absolute right-3 top-3 z-10 grid place-items-center rounded-full bg-night-deep/80 text-gold backdrop-blur"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 3l12 12M15 3L3 15" />
            </svg>
          </button>

          <div className="grid gap-6 p-5 pb-8 lg:grid-cols-2 lg:gap-10 lg:p-8">
            <Pic
              src={product.image}
              alt={product.name}
              className="h-[46svh] w-full rounded-3xl lg:h-[68svh]"
            />
            <div className="flex flex-col justify-center">
              <p className="eyebrow">
                {KIND[product.category]} · {FOR[product.gender]}
              </p>
              <h3 className="mt-3 font-display text-4xl leading-tight text-cream lg:text-5xl">
                {product.name}
              </h3>
              <p className="mt-3 font-display text-3xl italic text-gold">{product.price}</p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-frost/90">
                Chosen for warmth that still looks like an occasion. Message us for sizes, colours
                and availability.
              </p>
              <a
                href={waLink(`Hi ${SITE.name}, I'd like to enquire about "${product.name}" (${product.price}).`)}
                target="_blank"
                rel="noreferrer"
                className="tap mt-8 inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}