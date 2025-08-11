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
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #0f172a, #1e293b, #374151)",
                      "linear-gradient(135deg, #1e293b, #0f172a, #374151)",
                      "linear-gradient(135deg, #374151, #1e293b, #0f172a)",
                      "linear-gradient(135deg, #0f172a, #1e293b, #374151)"
                    ]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Animated tech grid pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '50px 50px'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Floating geometric shapes */}
                <motion.div
                  className="absolute top-20 left-10 w-32 h-32 border border-primary-500/20 rounded-full"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div
                  className="absolute top-40 right-20 w-24 h-24 border border-secondary-500/20 rotate-45"
                  animate={{
                    rotate: [45, 405],
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-lg"
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Glowing orbs */}
                <motion.div
                  className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-secondary-500/5 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.5, 0.2],
                    x: [0, -40, 0],
                    y: [0, 20, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                
                {/* Circuit-like lines */}
                <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
                  <motion.path
                    d="M100,100 L300,100 L300,300 L500,300 L500,500 L700,500 L700,700 L900,700"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.path
                    d="M900,100 L700,100 L700,300 L500,300 L500,500 L300,500 L300,700 L100,700"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Particle effect */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
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