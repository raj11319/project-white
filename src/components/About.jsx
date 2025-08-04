import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Parallax } from 'react-scroll-parallax'

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <section id="about" className="py-20 relative overflow-hidden scroll-optimized">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/3 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/3 rounded-full blur-3xl opacity-50" />

      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
          >
            About Me
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mb-12 rounded-full"
          />
          
          <div>
            <motion.div variants={itemVariants} className="card p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div>
                    <motion.div 
                      className="relative rounded-xl overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
                      <img 
                        src="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                        alt="Raj Srivastava working" 
                        className="relative z-10 w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Passionate Technologist & Problem Solver
                    </h3>
                    
                    <p className="text-gray-200 mb-4 leading-relaxed font-medium">
                      I'm Raj Srivastava, a multidisciplinary technologist with a passion for creating innovative solutions through code. With expertise spanning AI/ML, Data Science, Web Development, and more, I bring a unique blend of technical knowledge and creative problem-solving to every project.
                    </p>
                    
                    <p className="text-gray-200 mb-6 leading-relaxed font-medium">
                      My journey in technology has allowed me to work across various domains, from building intelligent systems with machine learning to creating intuitive user experiences with modern web technologies. I'm constantly exploring new technologies and approaches to expand my skill set and deliver exceptional results.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <motion.span 
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm font-semibold"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        Problem Solver
                      </motion.span>
                      <motion.span 
                        className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 rounded-full text-sm font-semibold"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        Fast Learner
                      </motion.span>
                      <motion.span 
                        className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300 rounded-full text-sm font-semibold"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        Team Player
                      </motion.span>
                      <motion.span 
                        className="px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-300 rounded-full text-sm font-semibold"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        Detail Oriented
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About