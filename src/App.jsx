import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import useSmoothScroll from './hooks/useSmoothScroll'
import { getLenis } from './hooks/lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageShell from './components/PageShell'
import Home from './pages/Home'
import Shawls from './pages/Shawls'
import Women from './pages/Women'
import Men from './pages/Men'
import Gear from './pages/Gear'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function AnimatedRoutes() {
  const location = useLocation()

  const toTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={toTop}>
      <PageShell key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shawls" element={<Shawls />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageShell>
    </AnimatePresence>
  )
}

export default function App() {
  useSmoothScroll()

  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}