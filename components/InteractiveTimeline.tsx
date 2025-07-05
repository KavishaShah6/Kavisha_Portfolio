"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, MapPin, Calendar, Award, Users, Zap } from "lucide-react"

interface Experience {
  id: number
  role: string
  company: string
  period: string
  location: string
  current: boolean
  description: string
  achievements: string[]
  skills: string[]
  highlights: string[]
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    location: "San Francisco, CA",
    current: true,
    description: "Leading development of cutting-edge web applications with focus on 3D graphics and user experience.",
    achievements: [
      "Increased application performance by 40% through optimization",
      "Led a team of 5 developers on major product launches",
      "Implemented 3D visualization features increasing user engagement by 60%",
      "Architected microservices infrastructure serving 1M+ users",
    ],
    skills: ["React", "Three.js", "Node.js", "AWS", "Team Leadership"],
    highlights: ["Team Lead", "Performance Expert", "3D Specialist"],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    period: "2020 - 2022",
    location: "New York, NY",
    current: false,
    description: "Developed responsive web applications and interactive user interfaces for various clients.",
    achievements: [
      "Built 15+ responsive websites with 99% client satisfaction",
      "Reduced load times by 50% through code optimization",
      "Mentored junior developers and conducted code reviews",
      "Implemented modern CI/CD pipelines",
    ],
    skills: ["React", "Vue.js", "JavaScript", "CSS", "Mentoring"],
    highlights: ["Mentor", "Optimization Expert", "Client Focused"],
  },
  {
    id: 3,
    role: "Junior Developer",
    company: "StartUp Ventures",
    period: "2019 - 2020",
    location: "Austin, TX",
    current: false,
    description: "Contributed to various web development projects and learned modern development practices.",
    achievements: [
      "Developed 5+ web applications from concept to deployment",
      "Collaborated with design team to implement pixel-perfect UIs",
      "Participated in agile development processes",
      "Contributed to open-source projects",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Git", "Agile"],
    highlights: ["Fast Learner", "Team Player", "Detail Oriented"],
  },
]

export default function InteractiveTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<number>(1)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent"></div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-20"
          >
            {/* Timeline Node */}
            <motion.div
              className={`absolute left-6 w-6 h-6 rounded-full border-4 border-black cursor-pointer ${
                selectedExperience === exp.id ? "bg-gold scale-125" : "bg-gold/60 hover:bg-gold"
              }`}
              whileHover={{ scale: 1.3, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedExperience(exp.id)}
              transition={{ duration: 0.3 }}
            >
              {exp.current && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gold"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.div>

            {/* Experience Card */}
            <motion.div
              layout
              className={`transition-all duration-500 ${selectedExperience === exp.id ? "scale-105" : "scale-100"}`}
            >
              <Card
                className={`p-6 bg-black/60 backdrop-blur-lg border-2 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-gold/20 ${
                  selectedExperience === exp.id
                    ? "border-gold shadow-xl shadow-gold/30"
                    : "border-gold/20 hover:border-gold/50"
                }`}
                onClick={() => setSelectedExperience(exp.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gold mb-1">{exp.role}</h3>
                    <p className="text-xl text-white mb-2">{exp.company}</p>
                    <div className="flex items-center text-gray-400 text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2 mt-4 lg:mt-0">
                    {exp.current && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500 animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        Current
                      </Badge>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {exp.highlights.map((highlight) => (
                        <Badge key={highlight} className="bg-gold/20 text-gold border-gold text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                {/* Expandable Content */}
                <AnimatePresence>
                  {selectedExperience === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      {/* Achievements */}
                      <div>
                        <h4 className="text-lg font-semibold text-gold mb-3 flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          Key Achievements
                        </h4>
                        <div className="grid gap-2">
                          {exp.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start group"
                            >
                              <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                              <p className="text-gray-300 group-hover:text-white transition-colors">{achievement}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-lg font-semibold text-gold mb-3 flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Badge
                                variant="outline"
                                className="border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-300 cursor-default"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-gold hover:text-black hover:bg-gold transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedCard(expandedCard === exp.id ? null : exp.id)
                  }}
                >
                  {selectedExperience === exp.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show More
                    </>
                  )}
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Card className="p-6 bg-black/40 backdrop-blur-lg border-gold/20 inline-block">
          <p className="text-gray-400 mb-2">Click on timeline nodes to explore each role</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gold rounded-full mr-2"></div>
              <span className="text-gray-300">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gold/60 rounded-full mr-2"></div>
              <span className="text-gray-300">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-300">Current Role</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
