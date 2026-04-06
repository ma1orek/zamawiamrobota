import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TrustBar from '../components/TrustBar'
import ProductHero from '../components/ProductHero'
import ProductSpecs from '../components/ProductSpecs'
import ProductGallery from '../components/ProductGallery'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import FloatingAgentButton from '../components/FloatingAgentButton'
import { getRobotById } from '../data/robotSpecs'
import { trackPageView, trackProductClick } from '../utils/googleSheets'

export default function RobotDetail() {
  const { id } = useParams<{ id: string }>()
  const robot = id ? getRobotById(id) : undefined

  useEffect(() => {
    if (robot) {
      trackPageView(`robot-${robot.id}`)
      trackProductClick(robot.id, robot.name)
    }
  }, [robot])

  if (!robot) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Navbar />
      <TrustBar withTopMargin />
      <ProductHero robot={robot} />
      <ProductSpecs robot={robot} />
      <ProductGallery robot={robot} />
      <HowItWorks />
      <FAQ />
      <Footer />
      <FloatingAgentButton />
    </>
  )
}
