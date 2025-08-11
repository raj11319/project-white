import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Parallax } from 'react-scroll-parallax'
import SkillCard from './SkillCard'
import { skillsData } from './skillsData'

const SkillsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Subtle Background Elements */}
      <Parallax translateY={[40, -40]} className="absolute top-20 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <Parallax translateY={[-40, 40]} className="absolute bottom-20 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      
      {/* Minimal futuristic elements */}
      <motion.div
        className="absolute top-40 right-10 border border-accent-500/10 rounded-lg rotate-45"
        style={{ 
          width: 'clamp(1.5rem, 4vw, 2rem)', 
          height: 'clamp(1.5rem, 4vw, 2rem)' 
        }}
        animate={{
          rotate: [45, 405],
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container-custom">
        <Parallax speed={-5}>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.h2 
              variants={titleVariants}
              className="font-bold text-white professional-highlight mb-4"
              style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
            >
              My Skills
            </motion.h2>
            
            <motion.div
              variants={titleVariants}
              className="w-24 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 mx-auto mb-8 rounded-full"
            />
            
            <motion.p 
              variants={titleVariants}
              className="text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}
            >
              Explore my diverse skill set spanning multiple technology domains. 
              Hover over each skill to see a unique animation that visually represents it.
            </motion.p>
          </motion.div>
        </Parallax>
        
        {/* Enhanced responsive grid */}
        <div className="skill-grid relative z-10">
          {skillsData.map((skill, index) => (
            <Parallax
              key={index}
              translateY={[8, -8]}
              scale={[0.99, 1.01]}
              easing="easeInQuad"
            >
              <SkillCard skill={skill} index={index} />
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection