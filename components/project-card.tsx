"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { TextureOverlay } from "./texture-overlay"
import { SplitText } from "./split-text"

export interface ProjectCardProps {
  title: string
  number: string
  image: string
  href: string
  size: "large" | "medium" | "small"
  description?: string
  revealDelay?: number
}

export function ProjectCard({
  title,
  number,
  image,
  href,
  size,
  description,
  revealDelay = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  /* ---------------- Reveal on Scroll ---------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  /* ---------------- Sizes ---------------- */
  const sizeClasses = {
    large: "aspect-[4/5]",
    medium: "aspect-square",
    small: "aspect-[3/4]",
  }

  /* ---------------- Glow Colors ---------------- */
  const palette = [
    "rgba(194,84,45,0.45)",
    "rgba(184,150,63,0.45)",
    "rgba(139,105,20,0.45)",
  ]
  const glowColor =
    palette[(Number.parseInt(number, 10) || 0) % palette.length]

  /* ---------------- Tilt Effect ---------------- */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      onMouseMove={handleMouseMove}
      className={`group relative block w-full ${sizeClasses[size]} overflow-visible`}
    >
      {/* ================= CARD ================= */}
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative h-full w-full overflow-hidden rounded-1xl bg-[#141210]"
      >
        {/* ---------- Image ---------- */}
        <div
          className="absolute inset-0 transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
          style={{
            clipPath: isVisible
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
            transitionDelay: `${revealDelay}ms`,
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-all duration-700 ${isHovered ? "scale-100 brightness-105" : "scale-100"
              }`}
          />

          <TextureOverlay
            texture="stone"
            opacity={isHovered ? 0.18 : 0.08}
            blendMode="multiply"
          />
        </div>

        {/* ---------- Big Number ---------- */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.4 + revealDelay / 1000 }}
          className="absolute top-6 left-6 font-mono text-7xl font-light select-none"
          style={{
            backgroundImage: "linear-gradient(135deg, #ffe02eff 0%, #c8a44fff 50%, #F6C1A1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {number}
        </motion.span>
      </motion.div>
      {/* Arrow Icon */}
      <div
        className={`absolute top-4 right-4 transition-all duration-500 ${isHovered
            ? "translate-x-0 translate-y-0 opacity-100"
            : "translate-x-2 -translate-y-2 opacity-0"
          }`}
      >
        <svg
          width="40"
          height="70"
          viewBox="0 0 20 20"
          fill="none"
          className="text-[#FAF7F2]"
        >
          <path
            d="M5 15L15 5M15 5H7M15 5V13"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>


      {/* ================= POPUP CONTENT ================= */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={
          isHovered
            ? { y: 0, opacity: 1 }
            : { y: 40, opacity: 0 }
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="pointer-events-none md:pointer-events-none absolute -bottom-20 left-2 right-2 rounded-2xl
                   bg-black/80 backdrop-blur-xl p-12 md:p-6"
      >
        <span className="text-xl uppercase tracking-[0.1em] text-[#B8963F] block mb-2">
          ({number})
        </span>

        <SplitText
          as="h3"
          text={title}
          mode="hover-wave"
          stagger={0.02}
          className="font-serif text-2xl text-[#FAF7F2]"
        />

        {description && (
          <p className="mt-3 text-2sm text-[#E5DED4] leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
    </Link>

  )
}
