"use client"

import { motion } from "framer-motion"
import { SplitText } from "./split-text"
import { TextureOverlay } from "./texture-overlay"
import type { ProcessStep } from "@/sanity/lib/types"

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-[22px] md:left-[30px] top-0 bottom-0 w-[3px] opacity-70"
        style={{
          backgroundImage: "linear-gradient(180deg, #c2542d 0%, #b8963f 50%, #8b6914 100%)",
          backgroundSize: "100% 100%",
        }}
      />
      <div className="space-y-14 md:space-y-16 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={step._id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative overflow-hidden rounded-sm border border-[#1A1815]/10 bg-[#FAF7F2]/70 backdrop-blur-sm pl-14 md:pl-20 py-10 shadow-[0_12px_40px_rgba(26,24,21,0.08)]"
          >
            <TextureOverlay texture="stone" opacity={0.08} blendMode="multiply" />
            <TextureOverlay texture="canvas" opacity={0.06} blendMode="soft-light" />

            <div className="absolute left-4 md:left-6 top-8 flex items-center justify-center h-10 w-10 rounded-full bg-[#1A1815] shadow-[0_10px_30px_rgba(26,24,21,0.25)]">
              <span className="h-2 w-2 rounded-full bg-[#C2542D]" />
            </div>

            <div className="absolute left-4 md:left-6 top-20 h-[calc(100%-80px)] w-[1px] bg-[#1A1815]/10" />

            <div className="flex flex-col md:flex-row md:items-start md:gap-6">
              <div className="md:w-[140px]">
                <motion.span
                  className="block text-6xl md:text-7xl font-serif leading-none gradient-gold"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 0.75, y: 16 }}
                  transition={{ duration: 0.6 }}
                  style={{ WebkitTextFillColor: "black" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <SplitText
                    text={step.title}
                    as="h2"
                    mode="gradient-sweep"
                    className="oh-headline text-2xl md:text-3xl"
                    stagger={0.02}
                  />
                  {step.duration && <span className="oh-label text-[#C2542D]">( {step.duration} )</span>}
                </div>

                {step.description && (
                  <p className="oh-body text-base md:text-lg">
                    {typeof step.description === "string" ? step.description : "Description from CMS"}
                  </p>
                )}

                {step.deliverables && step.deliverables.length > 0 && (
                  <div className="space-y-3">
                    <span className="oh-label block">Key Deliverables</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="oh-body text-sm flex items-center gap-2 px-3 py-2 rounded-sm bg-white/70 border border-[#1A1815]/10"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#B8963F]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


