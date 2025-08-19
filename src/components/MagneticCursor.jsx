import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MagneticCursor = () => {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorVariant, setCursorVariant] = useState('default')
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      
      // Check for interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.skill-card') ||
        target.closest('.card') ||
        target.closest('.hover-lift')
      ) {
        setIsHovering(true)
        setCursorVariant('button')
        
        // Magnetic effect
        const rect = target.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        cursorX.set(centerX - 16)
        cursorY.set(centerY - 16)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorVariant('default')
    }

    const handleMouseDown = () => {
      setCursorVariant('clicked')
    }

    const handleMouseUp = () => {
      setCursorVariant(isHovering ? 'button' : 'default')
    }

    // Add event listeners
    window.addEventListener('mousemove', moveCursor)
    
    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, .cursor-pointer, .skill-card, .card, .hover-lift'
    )
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY, isHovering])

  const variants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      border: '2px solid rgba(59, 130, 246, 0.3)',
      mixBlendMode: 'difference'
    },
    button: {
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.9)',
      border: '2px solid rgba(139, 92, 246, 0.5)',
      mixBlendMode: 'difference'
    },
    clicked: {
      scale: 0.8,
      backgroundColor: 'rgba(245, 158, 11, 0.9)',
      border: '2px solid rgba(245, 158, 11, 0.6)',
      mixBlendMode: 'difference'
    }
  }

  // Hide on mobile devices
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
        
        button, a, .cursor-pointer, .skill-card, .card, .hover-lift {
          cursor: none !important;
        }
      `}</style>
      
      {/* Custom cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
      
      {/* Cursor trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998] opacity-60"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: 12,
          translateY: 12
        }}
        animate={{
          backgroundColor: isHovering 
            ? 'rgba(139, 92, 246, 0.6)' 
            : 'rgba(59, 130, 246, 0.6)'
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.05
        }}
      />
      
      {/* Secondary trail */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9997] opacity-40"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: 14,
          translateY: 14
        }}
        animate={{
          backgroundColor: isHovering 
            ? 'rgba(245, 158, 11, 0.4)' 
            : 'rgba(59, 130, 246, 0.4)'
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 35,
          delay: 0.1
        }}
      />
    </>
  )
}

export default MagneticCursor