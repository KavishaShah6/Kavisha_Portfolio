"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Stars, Text, Sphere } from "@react-three/drei"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Award,
  ChevronDown,
  Menu,
  X,
  Star,
  Zap,
  Users,
  Trophy,
  Code,
  CheckCircle,
  Phone,
} from "lucide-react"
import type * as THREE from "three"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const { scrollYProgress } = useScroll()

  const sections = ["home", "about", "projects", "experience", "certifications", "publications" , "social-impact"]

  useEffect(() => {
    // Loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowContent(true), 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-gold/20"
        initial={{ y: -100 }}
        animate={{ y: showContent ? 0 : -100 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div className="text-2xl font-bold text-gold" whileHover={{ scale: 1.05 }}>
              Kavisha Shah
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 ${
                    activeSection === section ? "text-gold" : "text-white hover:text-gold"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
             <a
        href="/Kavisha_Resume.pdf" 
  download
>
  <Button className="bg-gold text-black hover:bg-gold/90 border-0">
    <Download className="w-4 h-4 mr-2" />
    Resume
  </Button>
</a>

            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-4 space-y-4">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left capitalize text-white hover:text-gold transition-colors"
                  >
                    {section}
                  </button>
                ))}
                <Button className="w-full bg-gold text-black hover:bg-gold/90 border-0">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Section - Enhanced 3D Background */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            style={{ background: "transparent" }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <ImpressiveHomeScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            

           <motion.h1
  className="text-6xl md:text-8xl font-bold mb-6 flex flex-wrap gap-x-4"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 1 }}
>
  <span className="text-white">Kavisha</span>
  <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
    Shah
  </span>
</motion.h1>


            <motion.div
              className="text-2xl md:text-3xl mb-8 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <ContinuousTypewriter />
            </motion.div>

            <motion.p
              className="text-xl mb-12 max-w-3xl mx-auto text-gray-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
             Computer Engineering student turning ideas into intelligent systems. 
             From crafting seamless full-stack apps to exploring the frontier of AI and ML, I build solutions that bridge code and creativity. Whether it’s training models, designing responsive UIs,
             or Cloud Computing, I thrive at the edge of innovation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <Button
                size="lg"
                className="bg-gold text-black hover:bg-gold/90 font-semibold text-lg px-8 py-4"
                onClick={() => scrollToSection("projects")}
              >
                <Code className="w-5 h-5 mr-2" />
                View My Work
              </Button>
         <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=kavishashah653@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    size="lg"
    className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black text-lg px-8 py-4"
  >
    <Mail className="w-5 h-5 mr-2" />
    Let's Connect
  </Button>
</a>

            </motion.div>

            <motion.div
              className="flex justify-center space-x-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
            >
             <a
  href="https://github.com/KavishaShah6"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="ghost" size="lg" className="text-gold hover:text-black hover:bg-gold">
    <Github className="w-6 h-6" />
  </Button>
</a>

<a
  href="https://www.linkedin.com/in/kavisha-shah-97572a245/"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="ghost" size="lg" className="text-gold hover:text-black hover:bg-gold">
    <Linkedin className="w-6 h-6" />
  </Button>
</a>

<a
  href="mailto:kavishashah653@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="ghost" size="lg" className="text-gold hover:text-black hover:bg-gold">
    <Mail className="w-6 h-6" />
  </Button>
</a>

              
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-8 h-8 text-gold" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <Canvas camera={{ position: [0, 0, 8] }} style={{ background: "transparent" }}>
            <Suspense fallback={null}>
              <SkillSpheres />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Computer Engineering student with expertise in Full Stack Development, Machine Learning, and AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-black/40 backdrop-blur-md border-gold/20 hover:border-gold/40 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gold">Education & Background</h3>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Bachelor of Technology in Computer Engineering
                  </h4>
                  <p className="text-gold mb-1">Pandit Deendayal Energy University, Gandhinagar</p>
                  <p className="text-gray-400 mb-2">August 2021 - June 2025 | GPA: 8.85/10</p>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Passionate about creating innovative solutions through technology. My journey spans Full Stack
                  Development, Machine Learning, and AI, with hands-on experience in multiple internships and research
                  publications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-gold/20 text-gold border-gold">
                    <Zap className="w-4 h-4 mr-1" />
                    Detail Oriented
                  </Badge>
                  <Badge className="bg-gold/20 text-gold border-gold">
                    <Users className="w-4 h-4 mr-1" />
                    Team Collaboration
                  </Badge>
                  <Badge className="bg-gold/20 text-gold border-gold">
                    <Trophy className="w-4 h-4 mr-1" />
                    Problem Solver
                  </Badge>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <SkillsSection />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Featured Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing innovative solutions in Machine Learning, Full Stack Development, and AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Simple Timeline */}
      <section id="experience" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Experience</h2>
            <p className="text-xl text-gray-300">Professional internships and key achievements</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold to-transparent"></div>

            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.company} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Certifications</h2>
            <p className="text-xl text-gray-300">Professional credentials and course completions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <CertificationCardComponent key={cert.title} certification={cert} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Research Publications</h2>
            <p className="text-xl text-gray-300">Academic contributions and research achievements</p>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {publications.map((publication, index) => (
              <PublicationCardComponent key={publication.title} publication={publication} index={index} />
            ))}
          </div>
        </div>
      </section>
          
      {/* Social Impact Section */}
      <section id="social-impact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Social Impact</h2>
            <p className="text-xl text-gray-300">Community service and volunteer work making a difference</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-transparent"></div>

            {socialImpactExperiences.map((exp, index) => (
              <SocialImpactCardComponent key={exp.organization} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 border-t border-gold/20 bg-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gold">Let's Create Something Amazing</h3>
            <p className="text-gray-300 mb-8">
              Ready to bring your ideas to life? Let's connect and discuss your next project.
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <div className="flex justify-center flex-wrap gap-4 mb-8">
  {/* Email Button */}
 <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=kavishashah653@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="bg-gold text-black hover:bg-gold/90 border-0">
    <Mail className="w-5 h-5 mr-2" />
    kavishashah653@gmail.com
  </Button>
</a>


  {/* GitHub Button */}
  <a
    href="https://github.com/KavishaShah6"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black">
      <Github className="w-5 h-5 mr-2" />
      GitHub
    </Button>
  </a>

  {/* LinkedIn Button */}
  <a
    href="https://www.linkedin.com/in/kavisha-shah-97572a245/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black">
      <Linkedin className="w-5 h-5 mr-2" />
      LinkedIn
    </Button>
  </a>
</div>

            </div>
            <p className="text-gray-500">©Kavisha Shah. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

// Replace the LoadingScreen function with this new SystemCheckLoader
function LoadingScreen() {
  const [matrix, setMatrix] = useState<string[][]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const systemChecks = [
    { id: 0, name: "FIREWALL", status: "SCANNING", duration: 2000 },
    { id: 1, name: "DATABASE", status: "CONNECTING", duration: 1500 },
    { id: 2, name: "API GATEWAY", status: "AUTHENTICATING", duration: 2500 },
    { id: 3, name: "NEURAL NETWORK", status: "INITIALIZING", duration: 3000 },
    { id: 4, name: "QUANTUM CORE", status: "CALIBRATING", duration: 2000 },
    { id: 5, name: "SECURITY MATRIX", status: "VALIDATING", duration: 1800 },
  ]

  useEffect(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const columns = 20
    const rows = 15

    const generateMatrix = () => {
      return Array(rows)
        .fill(null)
        .map(() =>
          Array(columns)
            .fill(null)
            .map(() => chars[Math.floor(Math.random() * chars.length)]),
        )
    }

    setMatrix(generateMatrix())
    const matrixInterval = setInterval(() => {
      setMatrix(generateMatrix())
    }, 100)

    return () => clearInterval(matrixInterval)
  }, [])

  useEffect(() => {
    if (currentStep < systemChecks.length) {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentStep])
        setCurrentStep((prev) => prev + 1)
      }, systemChecks[currentStep].duration)
      return () => clearTimeout(timer)
    }
  }, [currentStep, systemChecks])

  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return "COMPLETE"
    if (stepId === currentStep) return "PROCESSING"
    return "PENDING"
  }

  const getStepColor = (stepId: number) => {
    const status = getStepStatus(stepId)
    if (status === "COMPLETE") return "text-gold"
    if (status === "PROCESSING") return "text-yellow-400"
    return "text-gray-500"
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden relative">
      {/* Matrix rain background */}
      <div className="absolute inset-0 opacity-20">
        {matrix.map((row, i) => (
          <div key={i} className="flex">
            {row.map((char, j) => (
              <motion.span
                key={`${i}-${j}`}
                className="text-gold font-mono text-xs w-4 h-4"
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 0.3,
                  delay: (i + j) * 0.02,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </div>

      {/* Main system check interface */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-mono text-gold mb-2">PORTFOLIO SYSTEM</h1>
          <div className="text-yellow-400 font-mono text-sm">INITIALIZING DEVELOPER PROTOCOLS...</div>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
            <span>LOADING PROGRESS</span>
            <span>{Math.round((completedSteps.length / systemChecks.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-yellow-400"
              animate={{ width: `${(completedSteps.length / systemChecks.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* System check items */}
        <div className="space-y-3">
          {systemChecks.map((check, index) => {
            const status = getStepStatus(check.id)
            const isActive = check.id === currentStep
            return (
              <motion.div
                key={check.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  status === "COMPLETE"
                    ? "border-gold bg-gold/10"
                    : isActive
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-gray-700 bg-gray-900/50"
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: isActive ? 1.02 : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  scale: { duration: 0.3 },
                }}
              >
                <div className="flex items-center space-x-4">
                  {/* Status indicator */}
                  <div className="relative">
                    {status === "COMPLETE" ? (
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gold flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-black text-xs">✓</span>
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        className="w-6 h-6 rounded-full border-2 border-yellow-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full m-1" />
                      </motion.div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-600" />
                    )}
                  </div>
                  {/* Check name and status */}
                  <div>
                    <div className={`font-mono text-sm ${getStepColor(check.id)}`}>{check.name}</div>
                    <div className="text-xs text-gray-400 font-mono">
                      {status === "COMPLETE" ? "VERIFIED" : isActive ? check.status : "STANDBY"}
                    </div>
                  </div>
                </div>
                {/* Action button */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="px-3 py-1 bg-yellow-400/20 border border-yellow-400 rounded text-yellow-400 font-mono text-xs"
                        animate={{
                          boxShadow: [
                            "0 0 5px rgba(250, 204, 21, 0.3)",
                            "0 0 15px rgba(250, 204, 21, 0.6)",
                            "0 0 5px rgba(250, 204, 21, 0.3)",
                          ],
                        }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        PROCESSING
                      </motion.div>
                      {/* Moving dots */}
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 bg-yellow-400 rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 0.8,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {status === "COMPLETE" && (
                    <motion.div
                      className="px-3 py-1 bg-gold/20 border border-gold rounded text-gold font-mono text-xs"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      SECURED
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Final status */}
        <AnimatePresence>
          {completedSteps.length === systemChecks.length && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-2xl font-mono text-gold mb-2"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255, 215, 0, 0.5)",
                    "0 0 20px rgba(255, 215, 0, 0.8)",
                    "0 0 10px rgba(255, 215, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                CURATING KAVISHA SHAH'S PORTFOLIO...
              </motion.div>
              <div className="text-yellow-400 font-mono text-sm">ALL SYSTEMS VERIFIED • ACCESS GRANTED</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scanning lines */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"
        animate={{ y: [0, typeof window !== "undefined" ? window.innerHeight : 800, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}


function ImpressiveHomeScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#FFD700" />

      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/*  3D Elements */}
      <SimpleGeometricShapes />
      <SimpleGoldenOrbs />
      <SimpleFloatingElements />

      {/* Environment */}
      <Environment preset="night" />
    </>
  )
}

//  Geometric Shapes
function SimpleGeometricShapes() {
  return (
    <group>
      <Float floatIntensity={2} speed={1}>
        <SimpleShape position={[-5, 2, -3]} type="octahedron" />
      </Float>
      <Float floatIntensity={1.5} speed={1.5}>
        <SimpleShape position={[5, -1, -4]} type="icosahedron" />
      </Float>
      <Float floatIntensity={3} speed={0.8}>
        <SimpleShape position={[0, 3, -5]} type="dodecahedron" />
      </Float>
      <Float floatIntensity={2.5} speed={1.2}>
        <SimpleShape position={[-3, -2, 2]} type="tetrahedron" />
      </Float>
    </group>
  )
}

function SimpleShape({ position, type }: { position: [number, number, number]; type: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[1.5]} />
      <meshStandardMaterial
        color="#FFD700"
        transparent
        opacity={0.8}
        emissive="#FFD700"
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  )
}

//  Golden Orbs
function SimpleGoldenOrbs() {
  return (
    <group>
      {Array.from({ length: 8 }).map((_, i) => (
        <SimpleOrb key={i} index={i} />
      ))}
    </group>
  )
}

function SimpleOrb({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const radius = 6 + index * 1
  const speed = 0.2 + index * 0.1

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed
      meshRef.current.position.x = Math.cos(time + index) * radius
      meshRef.current.position.z = Math.sin(time + index) * radius
      meshRef.current.position.y = Math.sin(time * 2) * 2
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.3, 16, 16]}>
      <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
    </Sphere>
  )
}

//  Floating Elements
function SimpleFloatingElements() {
  const codeElements = ["{ }", "[ ]", "< />", "=>", "&&", "||", "++", "==="]

  return (
    <group>
      {codeElements.map((element, index) => (
        <SimpleFloatingText key={index} text={element} index={index} />
      ))}
    </group>
  )
}

function SimpleFloatingText({ text, index }: { text: string; index: number }) {
  const meshRef = useRef<any>(null)
  const radius = 10 + index * 2
  const speed = 0.1 + index * 0.05

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed
      meshRef.current.position.x = Math.cos(time + index * 2) * radius
      meshRef.current.position.z = Math.sin(time + index * 2) * radius
      meshRef.current.position.y = Math.sin(time) * 3
    }
  })

  return (
    <Text
      ref={meshRef}
      fontSize={0.8}
      color="#FFD700"
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.6}
    >
      {text}
    </Text>
  )
}

function SkillSpheres() {
  const skills = ["Python", "React", "Machine Learning", "JavaScript", "Node.js", "MongoDB"]

  return (
    <group>
      {skills.map((skill, index) => (
        <SkillSphere key={skill} skill={skill} index={index} />
      ))}
    </group>
  )
}

function SkillSphere({ skill, index }: { skill: string; index: number }) {
  const meshRef = useRef<THREE.Group>(null)
  const radius = 6 + index * 1.8
  const speed = 0.2 + index * 0.08

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed
      meshRef.current.position.x = Math.cos(time + index * 2) * radius
      meshRef.current.position.z = Math.sin(time + index * 2) * radius
      meshRef.current.position.y = Math.sin(time * 0.5) * 2
    }
  })

  return (
    <Float floatIntensity={2} speed={2}>
      <group ref={meshRef}>
        <Sphere args={[0.6, 32, 32]}>
          <meshStandardMaterial color="#FFD700" transparent opacity={0.2} emissive="#FFD700" emissiveIntensity={0.1} />
        </Sphere>
        <Text position={[0, 0, 0.7]} fontSize={0.25} color="#FFD700" anchorX="center" anchorY="middle">
          {skill}
        </Text>
      </group>
    </Float>
  )
}

// UI Components
function TypewriterText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      },
      delay + currentIndex * 80,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <div className={className}>
      {displayText}
      <span className="animate-pulse text-gold">|</span>
    </div>
  )
}

function ContinuousTypewriter() {
  const phrases = [
    "Computer Engineering Student",
    "Full Stack Developer",
    "Machine Learning Enthusiast",
    "AI Research Scholar",
    "Problem Solver & Innovator",
  ]

  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const currentText = phrases[currentPhrase]

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText(currentText.slice(0, currentIndex + 1))
            setCurrentIndex(currentIndex + 1)
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentIndex > 0) {
            setDisplayText(currentText.slice(0, currentIndex - 1))
            setCurrentIndex(currentIndex - 1)
          } else {
            setIsDeleting(false)
            setCurrentPhrase((prev) => (prev + 1) % phrases.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, isDeleting, currentPhrase, phrases])

  return (
    <div className="h-12 flex items-center justify-center">
      {displayText}
      <span className="animate-pulse text-gold ml-1">|</span>
    </div>
  )
}

//  Skills Section 
function SkillsSection() {
  const skills = [
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "Machine Learning",
    "TensorFlow",
    "MongoDB",
    "Express.js",
    "HTML/CSS",
    "Git",
    "Docker",
    "AWS",
    "C++",
    
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold mb-6 text-gold">Technical Skills</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
          >
            <Badge className="bg-gold/20 text-gold border-gold hover:bg-gold hover:text-black transition-all duration-300 text-sm px-4 py-2">
              {skill}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="p-6 bg-black/40 backdrop-blur-md border-gold/20 hover:border-gold/50 transition-all duration-300 h-full hover:shadow-2xl hover:shadow-gold/20">
        <motion.div
          animate={{
            rotateX: isHovered ? 5 : 0,
            rotateY: isHovered ? 5 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gold">{project.title}</h3>
            {project.featured && (
              <Badge className="bg-gold/20 text-gold border-gold">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <p className="text-gray-300 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string) => (
              <Badge key={tech} variant="outline" className="border-gold/50 text-gold">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex space-x-4">
  {project.github && (
    <a href={project.github} target="_blank" rel="noopener noreferrer">
      <Button className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black">
        <Github className="w-4 h-4 mr-2" />
        Code
      </Button>
    </a>
  )}

  {project.liveDemo && (
    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
      <Button className="bg-gold text-black hover:bg-gold/90">
        <ExternalLink className="w-4 h-4 mr-2" />
        Live Demo
      </Button>
    </a>
  )}
</div>

        </motion.div>
      </Card>
    </motion.div>
  )
}


function ExperienceCard({ experience, index }: { experience: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative pl-16 pb-12"
    >
      <motion.div
        className="absolute left-6 w-4 h-4 bg-gold rounded-full border-4 border-black"
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.3 }}
      />

      <Card className="p-6 bg-black/40 backdrop-blur-md border-gold/20 hover:border-gold/40 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gold">{experience.role}</h3>
            <p className="text-lg text-white">{experience.company}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">{experience.period}</p>
            {experience.current && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Current
              </Badge>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-4">{experience.description}</p>

        <div className="space-y-2 mb-4">
          {experience.achievements.map((achievement: string, i: number) => (
            <div key={i} className="flex items-start">
              <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
              <p className="text-gray-300">{achievement}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.skills.map((skill: string) => (
            <Badge key={skill} variant="outline" className="border-gold/50 text-gold">
              {skill}
            </Badge>
            
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

function CertificationCardComponent({ certification, index }: { certification: any; index: number })  {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        rotateY: 5,
        rotateX: 5,
        scale: 1.05,
      }}
      style={{ transformStyle: "preserve-3d" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`p-6 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-md border-2 border-gold/50 hover:border-gold transition-all duration-300 h-full relative overflow-hidden ${
          isHovered ? "shadow-2xl shadow-gold/40" : ""
        }`}
      >
        {/* Certificate Border Decoration */}
        <div
          className={`absolute inset-1 border border-gold/30 rounded-lg transition-all duration-300 ${
            isHovered ? "shadow-inner shadow-gold/20" : ""
          }`}
        ></div>
        <div className="absolute inset-3 border border-gold/20 rounded-md"></div>

        {/* Certificate Ribbon */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
          <div
            className={`w-12 h-6 bg-gradient-to-b from-gold to-yellow-600 rounded-b-lg flex items-center justify-center transition-all duration-300 ${
              isHovered ? "shadow-lg shadow-gold/50" : ""
            }`}
          >
            <Award className="w-3 h-3 text-black" />
          </div>
        </div>

        
        {/* Certificate Content */}
        <div className="relative z-10 text-center pt-2">
          {/* Certificate Header */}
          <div className="mb-4">
            <div
              className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 ${
                isHovered ? "shadow-lg shadow-gold/50 animate-pulse" : ""
              }`}
            >
              <Award className="w-8 h-8 text-black" />
            </div>
            <div className="text-xs text-gold font-semibold tracking-widest mb-1"></div>
            <div className="text-sm font-bold text-gold">{certification.type.toUpperCase()}</div>
          </div>

          {/* Certificate Title */}
          <h3 className="text-base font-bold text-white mb-3 leading-tight line-clamp-2">{certification.title}</h3>

          {/* Issuer */}
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1">Issued by</div>
            <div className="text-sm text-white font-semibold">{certification.issuer}</div>
          </div>

          {/* Date */}
          <div className="mb-4">
            <div className="text-xs text-gray-400 mb-1">Date of Completion</div>
            <div className="text-sm text-gold font-semibold">{certification.date}</div>
          </div>

          {/* Credential ID */}
          {certification.credentialId && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Credential ID</div>
              <div className="text-xs text-gold font-mono bg-black/30 px-2 py-1 rounded border border-gold/20">
                {certification.credentialId}
              </div>
            </div>
          )}

          {/* Certificate Seal */}
          <div className="flex justify-center mb-4">
            <div
              className={`w-10 h-10 border-2 border-gold rounded-full flex items-center justify-center bg-gold/10 transition-all duration-300 ${
                isHovered ? "shadow-lg shadow-gold/30 animate-pulse" : ""
              }`}
            >
              <CheckCircle className="w-5 h-5 text-gold" />
            </div>
          </div>

          {/* Verify Button */}
           <Button
            className={`bg-gold text-black hover:bg-gold/90 border-0 w-full text-sm py-2 transition-all duration-300 ${
              isHovered ? "shadow-lg shadow-gold/30" : ""
            }`}
            onClick={() => certification.certificateUrl && window.open(certification.certificateUrl, "_blank")}
            disabled={!certification.certificateUrl}
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            {certification.certificateUrl ? "View Certificate" : "Certificate Pending"}
          </Button>
        </div>

        {/* Certificate Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FFD700 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, #FFD700 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        {/* Glow Effect Overlay - Only on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold/5 via-transparent to-gold/5 pointer-events-none"></div>
        )}
      </Card>
    </motion.div>
  )
}


function PublicationCardComponent({ publication, index }: { publication: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
      }}
      style={{ transformStyle: "preserve-3d" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`p-6 bg-black/60 backdrop-blur-md border-2 border-gold/30 hover:border-gold/60 transition-all duration-300 h-full relative overflow-hidden ${
          isHovered ? "shadow-2xl shadow-gold/40" : ""
        }`}
      >
        {/* Academic Paper Header */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-400 to-gold transition-all duration-300 ${
            isHovered ? "shadow-lg shadow-gold/50" : ""
          }`}
        ></div>

        {/* Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <Badge
            className={`${
              publication.status === "Published"
                ? `bg-green-500/20 text-green-400 border-green-500 transition-all duration-300 ${
                    isHovered ? "shadow-lg shadow-green-500/30" : ""
                  }`
                : `bg-blue-500/20 text-blue-400 border-blue-500 transition-all duration-300 ${
                    isHovered ? "shadow-lg shadow-blue-500/30" : ""
                  }`
            }`}
          >
            {publication.status}
          </Badge>
          <div className="text-xs text-gray-500 font-mono">{publication.date}</div>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold text-gold mb-4 leading-tight line-clamp-3 transition-all duration-300 ${
            isHovered ? "text-shadow-gold" : ""
          }`}
        >
          {publication.title}
        </h3>

        {/* Journal Info */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-white">
            <div
              className={`w-2 h-2 bg-gold rounded-full mr-3 transition-all duration-300 ${
                isHovered ? "animate-pulse" : ""
              }`}
            ></div>
            <span className="font-semibold">{publication.journal}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
            <span>{publication.publisher}</span>
          </div>
          {publication.doi && (
            <div className="flex items-center text-gray-400 text-xs">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="font-mono">DOI: {publication.doi}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-4">{publication.description}</p>

        {/* Keywords */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {publication.keywords.map((keyword: string) => (
              <Badge
                key={keyword}
                variant="outline"
                className={`border-gold/30 text-gold/80 text-xs hover:border-gold/60 hover:text-gold transition-all duration-300 ${
                  isHovered ? "hover:shadow-sm hover:shadow-gold/30" : ""
                }`}
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
       <Button
  className={`bg-gold text-black hover:bg-gold/90 border-0 flex-1 transition-all duration-300 ${
    isHovered ? "shadow-lg shadow-gold/30" : ""
  }`}
  onClick={() => window.open(publication.publicationUrl, "_blank")}
>
  <ExternalLink className="w-4 h-4 mr-2" />
  View Paper
</Button>



        {/* Academic Decoration */}
        <div className="absolute bottom-0 right-0 opacity-10">
          <div
            className={`w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered ? "animate-pulse" : ""
            }`}
          >
            <Award className="w-10 h-10 text-gold" />
          </div>
        </div>

        {/* Glow Effect Overlay - Only on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold/3 via-transparent to-gold/3 pointer-events-none"></div>
        )}
      </Card>
    </motion.div>
  )
}


function SocialImpactCardComponent({ experience, index }: { experience: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative pl-16 pb-12"
    >
      <motion.div
        className="absolute left-6 w-4 h-4 bg-green-400 rounded-full border-4 border-black"
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.3 }}
      />

      <Card className="p-6 bg-black/40 backdrop-blur-md border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-green-400">{experience.role}</h3>
            <p className="text-lg text-white">{experience.organization}</p>
            <p className="text-gray-400">{experience.location}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">{experience.period}</p>
            <Badge className="bg-green-500/20 text-green-400 border-green-500">
              <Users className="w-3 h-3 mr-1" />
              Volunteer
            </Badge>
          </div>
        </div>

        <p className="text-gray-300 mb-4">{experience.description}</p>

        <div className="space-y-2 mb-4">
          {experience.achievements.map((achievement: string, i: number) => (
            <div key={i} className="flex items-start">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0" />
              <p className="text-gray-300">{achievement}</p>
            </div>
          ))}
        </div>

         <div className="flex flex-wrap gap-2 mb-4">
          {experience.skills.map((skill: string) => (
            <Badge key={skill} variant="outline" className="border-green-400/50 text-green-400">
              {skill}
            </Badge>
          ))}
        </div>

        {experience.certificate && (
           <div className="flex items-center justify-between">
            <div className="flex items-center text-green-400">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm">Certificate Available</span>
              </div>
              {experience.certificateUrl && (
                <Button
                  className="bg-green-400 text-black hover:bg-green-400/90 border-0 text-sm px-4 py-2"
                  onClick={() => window.open(experience.certificateUrl, "_blank")}
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View Certificate
                </Button>
              )}
            </div>
          
        )}
      </Card>
    </motion.div>
  )
}


const projects = [
  {
    title: "Bone Fracture Classification",
    description:
      "Deep Learning model that classifies X-ray images of bone fractures with 99.57% accuracy using transfer learning and VGG16 architecture.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Deep Learning"],
    featured: false,
    
  },
  {
    title: "Shortest Aerial Path Finding Simulation",
    description: "An optimization system for fully connected graphs where edges exceeding a threshold 'x' are discarded. It computes the most efficient path between user-defined Departure and Arrival points, balancing distance, connectivity, and cost using combinatorial optimization.",
    technologies: ["Flask", "Bootstrap", "HTML", "CSS", "MongoDB"],
    featured: false,
    github: "https://github.com/KavishaShah6/Aerial-Path-Finding-Simulation",
     
  },
  {
    title: " Blood Cell Classification",
    description:
      "Developed a machine learning model to classify blood cell images into categories (e.g., red blood cells, white blood cells,platelets) with 99.6% accuracy.",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Matplotlib", "Pandas" ,"NumPy" , "OpenCV"],
    featured: false,
    
     
  },
  {
    title: " OS Task Management Simulation",
    description:
      "This website helps you to simulate a few OS task management algorithms like Round Robin,Banker's Algorithm ,Scan C-SCan Alogrithm,MRU Page Replacement.",
    technologies: ["NodeJS", "MongoDB", "XML"],
    featured: false,
    github: "https://github.com/KavishaShah6/OS_Project_Team7",
    liveDemo: "https://team-7.onrender.com/",
     
  },
  {
    title: "Socio Social Media App",
    description:
      "Full-stack social media platform enabling users to create posts, interact through likes and comments, and follow other users.",
    technologies: ["React", "Node.js", "MySQL", "Express.js", "REST APIs"],
    featured: false,
     github: "https://github.com/KushalPanchal29/socio-app",
  },
  
  {
    title: "Smart Home Automation",
    description:
      "IoT-based Smart Home System using MediaPipe and Arduino, integrated with Bluetooth for wireless control. Enables seamless operation of lights and fans through real-time hand gesture recognition.",
    technologies: ["Python", "MediaPipe", "Arduino", "IoT", "Bluetooth"],
    featured: false,
  },
]

const experiences = [ 
  
    {
  role: "Machine Learning Intern",
  company: "Span Inspection Systems Pvt. Ltd.",
  period: "January 2025 - April 2025",
  current: false,
  description:
    "Developing machine learning models for industrial inspection systems, focusing on defect detection, NLP-based query handling, and quality assurance.",
  achievements: [
    "Built ML models to detect broken tablets, missing pills, and packaging anomalies",
    "Implemented algorithms for real-time product inspection and anomaly detection",
    "Created an NLP-based search query system for fetching machinery-related information",
    "Contributed to the development of the company’s official website",
    "Analyzed complex datasets to improve model accuracy and reliability",
    "Collaborated with cross-functional teams to design and deploy intelligent solutions"
  ],
  skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "NLP", "Data Processing", "Collaboration"],
},

  {
    role: "Full Stack Developer Intern",
    company: "Octopus Technologies Pvt. Ltd.",
    period: "May 2024 - July 2024",
    current: false,
    description:
      "Worked on React-based e-commerce website development with full-stack integration and user authentication systems.",
    achievements: [
      "Built responsive e-commerce website using React",
      "Integrated front-end and back-end components seamlessly",
      "Implemented secure user authentication and registration",
      "Developed RESTful APIs for data management",
    ],
    skills: ["React", "Node.js", "MongoDB", "REST APIs", "Full Stack Development"],
  },
    {
    role: "React Developer Intern",
    company: "TechVantage",
    period: "December 2023 - January 2024",
    current: false,
    description: "Developed React applications and created Python scripts for web scraping and data extraction.",
    achievements: [
      "Built responsive web portals using React",
      "Created Python scripts for automated data extraction",
      "Implemented efficient web scraping solutions",
      "Enhanced user interface and user experience",
    ],
    skills: ["React", "Node.js", "MongoDB", "Python", "Web Scraping"],
  },
  {
    role: "Backend Developer Intern",
    company: "WealthAffinity Softech Pvt. Ltd.",
    period: "May 2023 - November 2023",
    current: false,
    description:
      "Developed backend components for stock market prediction models with real-time data processing and API integration.",
    achievements: [
      "Built backend systems for stock price prediction models",
      "Implemented real-time stock price analysis algorithms",
      "Integrated financial APIs and databases for data collection",
      "Optimized data preprocessing pipelines for better performance",
    ],
    skills: ["Python", "Django", "Flask", "MySQL", "Docker", "API Integration"],
  },

]

const certifications = [
  {
    title: "Understanding Incubation and Entrepreneurship",
    issuer: "IIT",
    date: "2024",
    type: "NPTEL Certificate",
    certificateUrl:"https://drive.google.com/file/d/1kz34Cmmz9YIDxPKWlkGIVLFWK6ucAl2T/view",
  },
  {
    title: "The Complete 2023 Web Development Bootcamp",
    issuer: "Udemy",
    date: "2023",
    type: "Coursera Certificate",
    certificateUrl: "https://drive.google.com/file/d/131jcvXM9aWIUrwGRrQJH0zPLdIEJ0MdR/view",
  },
  {
    title: "IBM Data Science Course",
    issuer: "IBM",
    date: "2024",
    type: "Coursera Certificate",
    certificateUrl: "https://drive.google.com/drive/folders/1qO8fkgkKTgfz_ekmmu5GpzaGZnX9-gx3",
  },
  {
    title: "Cybersecurity for Everyone",
    issuer: "University of Maryland",
    date: "2023",
    type: "Coursera Certificate",
    certificateUrl: "https://drive.google.com/file/d/1ShQgbw3DazLDvc5AFUV8SVoCyHa1cToD/view",
  },
  {
    title: "Computer Networking Fundamentals",
    issuer: "Google ",
    date: "2023",
    type: "Coursera Certificate",
    certificateUrl: "https://drive.google.com/file/d/1TYtxRalsuAIcE6DSWjRSKX3KutR3FMOf/view",
  },
]

const publications = [
  {
    title:
      "Leveraging Transfer Learning in Computer Vision for AI-Powered Orthopedic Assistance: A Sustainable Approach for Healthcare 4.0",
    journal: "International Journal of Internet Manufacturing and Services",
    publisher: "Inderscience Publishers",
    date: "August 2024",
    status: "Accepted for Publication",
    doi : "10.1504/IJIMS.2026.10066883" ,
    doiUrl: "https://doi.org/10.1504/IJIMS.2026.10066883",
    publicationUrl:"https://www.inderscience.com/info/ingeneral/forthcoming.php?jcode=ijims#124290",
    
    description:
      "Deep learning-based system using transfer learning to classify bone fractures using X-ray images. The proposed VGG16 model achieved a validation accuracy of 96.62%.",
    keywords: ["Transfer Learning", "Computer Vision", "Healthcare AI", "Bone Fracture Detection"],
  },
  {
    title: "Advancements in Elliptic Curve Cryptography: A Review of Theory and Applications",
    journal: "IEEE Xplore",
    publisher: "IEEE",
    date: "October 2024",
    status: "Published",
    doi :"10.1109/PICET60765.2024.10716041",
    doiUrl: "https://doi.org/10.1504/10.1109/PICET60765.2024.10716041",
    publicationUrl: "https://ieeexplore.ieee.org/document/10716041/",
    description:"Comprehensive examination of the latest developments, applications, and theoretical foundations in elliptic curve cryptography, offering insights into its growing significance in modern cryptographic protocols.",
    keywords: ["Elliptic Curve Cryptography", "Security", "Cryptographic Protocols", "Theory"],
  },
  {
    title: "A Pioneering and Reliable Technique for Optimizing Aerial Route Planning",
    journal: "Inderscience Journals",
    publisher: "Inderscience Publishers",
    date: "August 2024",
    status: "Accepted for Publication",
    doi : "10.1504/IJIMS.2026.10070708",
    doiUrl: "https://doi.org/10.1504/10.1109/10.1504/IJIMS.2026.10070708",
    publicationUrl:"https://www.inderscience.com/info/ingeneral/forthcoming.php?jcode=ijims#128233",
    description:
      "Addresses the challenge of identifying the most optimal path in a fully connected graph, focusing on balancing distance, efficiency, and connectivity while minimizing overall cost.",
    keywords: ["Route Optimization", "Graph Theory", "Aerial Navigation", "Algorithm Design"],
  },
]

const socialImpactExperiences = [
  {
    role: "Educator & Community Support Worker",
    organization: "Go Dharmic NGO",
    location: "Ahmedabad, India",
    period: " June 2022 - July 2022",
    description:
      "Volunteered in community service initiatives focusing on food security and education for underprivileged communities.",
    achievements: [
      "Conducted food distribution drives, ensuring nutritious meals reached underprivileged communities",
      "Organized and led educational sessions, teaching essential academic skills to underprivileged students",
      "Created a supportive learning environment for students from disadvantaged backgrounds",
      "Collaborated with local community leaders to identify and address pressing social needs",
    ],
    skills: ["Community Outreach", "Educational Leadership", "Social Work", "Team Coordination"],
    certificate: true,
    certificateUrl : "https://drive.google.com/file/d/1pWiwXZgsaSqXTl-5FC09U1xtR1Zc0wBu/view?usp=sharing",
  },
  {
    role: "Educator",
    organization: "Tresna Foundation",
    location: "Ahmedabad, India",
    period: "July 2023",
    description:
      "Participated in project PAHEL (Digital Literacy and Youth Employability Program) to enhance digital skills and educational support for underprivileged children.",
    achievements: [
      "Supported students in enhancing their digital literacy skills, focusing on MS Office and web development basics",
      "Taught HTML and CSS fundamentals as part of the digital literacy curriculum",
      "Provided instruction in both scholastic and co-scholastic subjects to garden class children",
      "Conducted English speaking sessions, counseling, and team-building activities for students",
      "Contributed to youth employability initiatives through skill development programs",
      
    ],
    skills: ["Digital Literacy", "Web Development Teaching", "MS Office Training", "Child Education", "Counseling"],
    certificate: true,
    certificateUrl: "https://drive.google.com/file/d/1GnwIy9kSUBkoEiaCGZOlWu3F1G8J9qto/view?usp=sharing",
    
  },
   {
    role: "Volunteer",
    organization: "Leo Club International",
    location: "Ahmedabad, India",
    period: "May 2017 - June 2019",
    description:"Contributed to community service initiatives focused on education, health, and youth empowerment through active participation in outreach, awareness, and fundraising programs. Developed strong teamwork and event coordination skills while creating positive social impact." ,
    achievements: [
  "Participated in community outreach programs promoting education and health awareness",
  "Assisted in organizing fundraising events to support local social causes",
  "Collaborated with peers to plan and execute youth empowerment workshops",
  "Engaged in volunteer-driven campaigns and on-ground activities",
  "Promoted inclusivity and social responsibility through coordinated initiatives"
],
    skills: ["Community Engagement", "Event Coordination", "Teamwork", "Fundraising", "Social Impact", "Youth Empowerment", "Awareness Campaigns"],
    certificate: false,
  },
]