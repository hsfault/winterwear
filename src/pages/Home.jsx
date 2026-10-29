import { useCallback, useState } from 'react'
import Hero from '../components/home/Hero'
import Statement from '../components/home/Statement'
import ShawlRoom from '../components/home/ShawlRoom'
import CompleteLooks from '../components/home/CompleteLooks'
import GearIndex from '../components/home/GearIndex'
import CoatEdit from '../components/home/CoatEdit'
import Closing from '../components/home/Closing'
import ProductSheet from '../components/ProductSheet'

export default function Home() {
  const [product, setProduct] = useState(null)
  const close = useCallback(() => setProduct(null), [])

  return (
    <main>
      <Hero />
      <Statement />
      <ShawlRoom onOpen={setProduct} />
      <CompleteLooks />
      <GearIndex />
      <CoatEdit onOpen={setProduct} />
      <Closing />
      <ProductSheet product={product} onClose={close} />
    </main>
  )
}