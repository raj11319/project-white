import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillsSection from './components/skills/SkillsSection'
import SkillsProgress from './components/skills/SkillsProgress'
import ProjectsSection from './components/projects/ProjectsSection'
import About from './components/About'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import SkillDetailPage from './components/skills/SkillDetailPage'
import { AnimatePresence, motion } from 'framer-motion'

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

// Main content component
const MainContent = () => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Only show loader on initial page load (home page)
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2500)
      
      return () => clearTimeout(timer)
    } else {
      // For other pages, don't show loader
      setLoading(false)
    }
  }, [location.pathname])

  // Enhanced page transition variants
  const pageVariants = {
    initial: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  // Check if we're on the home page
  const isHomePage = location.pathname === '/'

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading && isHomePage ? (
          <Loader key="loader" />
        ) : (
          <motion.div 
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen relative"
          >
            {/* Scroll Progress Bar - Only on home page */}
            {isHomePage && <ScrollProgress />}
            
            {/* Dark Futuristic Background - Only on home page */}
            {isHomePage && (
              <div className="fixed inset-0 -z-20">
                {/* Base dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900" />
                
                {/* Animated tech grid pattern */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                  }}
                />
                
                {/* Floating geometric shapes */}
                <div className="absolute top-20 left-10 w-32 h-32 border border-primary-500/10 rounded-full opacity-20" />
                
                <div className="absolute top-40 right-20 w-24 h-24 border border-secondary-500/10 rotate-45 opacity-15" />
                
                <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-accent-500/5 to-primary-500/5 rounded-lg opacity-10" />
                
                {/* Glowing orbs */}
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary-500/3 rounded-full blur-3xl opacity-30" />
                
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-secondary-500/3 rounded-full blur-2xl opacity-20" />
              </div>
            )}
            
            <Header />
            
            <Routes>
              <Route path="/" element={
                <main>
                  <Hero />
                  <SkillsSection />
                  <SkillsProgress />
                  <ProjectsSection />
                  <About />
                  <Certificates />
                  <Contact />
                </main>
              } />
              <Route path="/skill/:skillId" element={<SkillDetailPage />} />
            </Routes>
            
            {isHomePage && <Footer />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  )
}

export default App