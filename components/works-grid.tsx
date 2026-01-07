"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ProjectCard, type ProjectCardProps } from "./project-card"
import { GradientButton } from "./gradient-button"

interface WorksGridProps {
  projects: ProjectCardProps[]
}

export function WorksGrid({ projects }: WorksGridProps) {
  const [visible, setVisible] = useState(9)
  const items = useMemo(() => projects.slice(0, visible), [projects, visible])
  const canLoadMore = visible < projects.length

  return (
    <div className="space-y-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
        {items.map((project, index) => (
          <motion.div
            key={project.href}
            className="pb-28 pt-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <ProjectCard {...project} revealDelay={index * 80} />
          </motion.div>
        ))}
      </div>

      {canLoadMore && (
        <div className="flex justify-center">
          <GradientButton
            onClick={() => setVisible((prev) => Math.min(prev + 6, projects.length))}
            texture="stone"
            className="min-w-[200px] border border-[#1A1815]/30"
            glowColor="rgba(184,150,63,0.4)"
          >
            <span className="tracking-[0.16em]">Load More</span>
            <span className="h-2 w-2 rounded-full bg-[#FAF7F2]" />
          </GradientButton>
        </div>
      )}
    </div>
  )
}


