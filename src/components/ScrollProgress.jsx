import React, { useState, useEffect, useRef } from 'react'

const ScrollProgress = () => {
  const [scrolled, setScrolled] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
          
          if (scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100
            setScrolled(Math.min(Math.max(progress, 0), 100))
          }
          
          ticking.current = false
        })
        
        ticking.current = true
      }

    }

    // Initial call
    handleScroll()
    
    // Add event listener with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
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
          boxShadow: '0 0 4px rgba(59, 130, 246, 0.3)',
          transition: 'width 0.1s ease-out',
          willChange: 'width' // Optimize for width changes
        }}
      />
    </div>
  )
}

export default ScrollProgress