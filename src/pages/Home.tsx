import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import AnimatedHero from '../components/AnimatedHero'
import TrustBar from '../components/TrustBar'
import RobotCatalog from '../components/RobotCatalog'
import HowItWorks from '../components/HowItWorks'
import TrustSection from '../components/TrustSection'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import FloatingAgentButton from '../components/FloatingAgentButton'
import { trackPageView } from '../utils/googleSheets'

export default function Home() {
  useEffect(() => { trackPageView('strona-glowna') }, [])

  return (
    <>
      <Navbar />
      <AnimatedHero />
      <TrustBar />
      <RobotCatalog />
      <HowItWorks />
      <TrustSection />
      <FAQ />
      <Footer />
      <FloatingAgentButton />
    </>
  )
}
