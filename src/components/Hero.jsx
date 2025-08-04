import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import { Parallax } from 'react-scroll-parallax'

const Hero = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  const skills = [
    { text: 'AI/ML', color: 'text-blue-400' },
    { text: 'Data Science', color: 'text-emerald-400' },
    { text: 'Web Development', color: 'text-purple-400' }
  ]

  useEffect(() => {
    const currentSkill = skills[currentSkillIndex]
    const fullText = currentSkill.text
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentSkillIndex, skills])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3
      }
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center pt-safe-top relative overflow-hidden">
      {/* Enhanced responsive padding */}
      <div className="container-custom section-padding relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
        >
          {/* Content Section - Enhanced responsive layout */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            <Parallax translateY={[15, -15]} speed={-2}>
              <motion.span 
                variants={itemVariants}
                className="text-primary-400 font-semibold block mb-2"
                style={{ fontSize: 'clamp(1.125rem, 3.5vw, 1.5rem)' }}
              >
                Hello, I'm
              </motion.span>
              
              <motion.h1 
                variants={itemVariants}
                className="font-bold mb-4 lg:mb-6"
                style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
              >
                <span className="text-gradient block">
                  Raj Srivastava
                </span>
              </motion.h1>
              
              <motion.div 
                variants={itemVariants}
                className="text-gray-200 mb-6 lg:mb-8 leading-relaxed font-medium"
                style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)' }}
              >
                <span className="block mb-2">A passionate technologist with expertise in </span>
                <motion.span 
                  className={`font-bold ${skills[currentSkillIndex].color} block`}
                  key={currentSkillIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {currentText}
                  <motion.span 
                    className="inline-block w-0.5 bg-current ml-1"
                    style={{ height: 'clamp(1.25rem, 4vw, 1.75rem)' }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.span>
                <span className="block mt-2">and more.</span>
              </motion.div>
              
              {/* Enhanced responsive buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.a 
                  href="#skills" 
                  className="btn-primary group relative overflow-hidden text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10 font-semibold">Explore My Skills</span>
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="btn-professional text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10">Get In Touch</span>
                </motion.a>
              </motion.div>
            </Parallax>
          </div>
          
          {/* Image Section - Enhanced responsive layout */}
          <Parallax 
            translateY={[-10, 10]} 
            speed={-1} 
            className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2"
          >
            <motion.div 
              variants={imageVariants}
              className="relative w-full max-w-sm lg:max-w-md"
            >
              {/* Subtle glow effect with reduced intensity */}
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full blur-xl opacity-15"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.div 
                className="relative bg-gray-800/90 backdrop-blur-lg rounded-full overflow-hidden p-2 shadow-xl subtle-border"
                whileHover={{ 
                  scale: 1.03,
                  rotate: 1
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
              >
                <motion.img 
                  src="/images/raj_profile.jpg" 
                  alt="Raj Srivastava" 
                  className="w-full h-auto rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </motion.div>
          </Parallax>
        </motion.div>
        
        {/* Enhanced responsive scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <motion.span 
            className="text-sm text-gray-300 mb-3 font-semibold hidden sm:block"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.span>
          
          <motion.div
            className="border-2 border-primary-400 rounded-full flex justify-center relative overflow-hidden"
            style={{ 
              width: 'clamp(1.5rem, 4vw, 2rem)', 
              height: 'clamp(2.5rem, 6vw, 3rem)' 
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="bg-primary-400 rounded-full mt-2"
              style={{ 
                width: 'clamp(0.25rem, 1vw, 0.5rem)', 
                height: 'clamp(0.75rem, 2vw, 1rem)' 
              }}
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero