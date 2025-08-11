import React, { useState, useEffect, useRef } from 'react'

const ScrollProgress = () => {
  const [scrolled, setScrolled] = useState(0)
  const rafRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        
        if (scrollHeight > 0) {
          const progress = (scrollTop / scrollHeight) * 100
          setScrolled(Math.min(Math.max(progress, 0), 100))
        }
      })
    }

    // Initial call
    handleScroll()
    
    // Add event listener with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-gray-800/20 z-50"
      style={{ zIndex: 9999 }}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 shadow-lg"
        style={{ 
          width: `${scrolled}%`,
          transformOrigin: 'left center',
          boxShadow: '0 0 8px rgba(59, 130, 246, 0.4)',
          transition: 'none', // Remove CSS transition for smoother animation
          willChange: 'width' // Optimize for width changes
        }}
      />
    </div>
  )
}

export default ScrollProgress