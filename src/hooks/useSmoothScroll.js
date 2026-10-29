import { useEffect } from 'react'
import { startLenis, stopLenis } from './lenis'

export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    startLenis()
    return () => stopLenis()
  }, [])
}