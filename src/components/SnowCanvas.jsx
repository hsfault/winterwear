import { useEffect, useRef } from 'react'

export default function SnowCanvas({ density = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let w = 0
    let h = 0
    let flakes = []
    let raf = 0
    let running = false
    let inView = true

    const make = (spread) => ({
      x: Math.random() * w,
      y: spread ? Math.random() * h : -6,
      r: 0.7 + Math.random() * 2,
      vy: 0.25 + Math.random() * 0.7,
      drift: Math.random() * Math.PI * 2,
      sway: 0.2 + Math.random() * 0.5,
      a: 0.25 + Math.random() * 0.5,
    })

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.round(((w * h) / 16000) * density))
      flakes = Array.from({ length: count }, () => make(true))
    }

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#F4EDE0'
      for (const f of flakes) {
        f.y += f.vy
        f.drift += 0.01
        f.x += Math.sin(f.drift) * f.sway
        if (f.y > h + 6) {
          f.y = -6
          f.x = Math.random() * w
        }
        ctx.globalAlpha = f.a
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, 6.2832)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const update = () => {
      const shouldRun = inView && !document.hidden
      if (shouldRun && !running) {
        running = true
        raf = requestAnimationFrame(tick)
      } else if (!shouldRun && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    io.observe(parent)
    document.addEventListener('visibilitychange', update)
    update()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}