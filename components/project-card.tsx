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
    large: "aspect-square",
    medium: "aspect-square",
    small: "aspect-square",
  }

  /* ---------------- Tilt Effect (Desktop only) ---------------- */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches
    const hoverScale = canHover ? 1.05 : 1

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!canHover) return

    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function resetTilt() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className={`group relative block w-full ${sizeClasses[size]} overflow-visible`}
    >
      {/* ================= CARD ================= */}
      <motion.div
        style={
          canHover
            ? { rotateX, rotateY }
            : { rotateX: 0, rotateY: 0 }
        }
        whileHover={canHover ? { scale: hoverScale } : undefined}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
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
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <TextureOverlay
            texture="stone"
            opacity={0.12}
            blendMode="multiply"
          />
        </div>
      </motion.div>
      {/* ================= STABLE CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.3,
        }}
        className="absolute -bottom-23 left-0 right-0 rounded-2xl p-6"
      >
        <span className="text-2xl font-bold uppercase tracking-[0.1em] text-[#B8963F] block mb-2">
          ({number})
        </span>

        <SplitText
          as="h3"
          text={title}
          stagger={0.02}
          className="font-serif text-3xl text-[#000000]"
        />

        {description && (
          <p className="mt-3 text-2sm text-[#000000] leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
    </Link>
  )
}
