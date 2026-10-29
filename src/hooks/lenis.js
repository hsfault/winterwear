import Lenis from 'lenis'

let instance = null

export const getLenis = () => instance

export function startLenis() {
  if (instance) return instance
  instance = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true })
  return instance
}

export function stopLenis() {
  if (instance) instance.destroy()
  instance = null
}