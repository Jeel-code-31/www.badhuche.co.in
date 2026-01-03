"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)

    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {/* Transition layers */}
      <div
        className="fixed inset-0 z-[9998] bg-[#C2542D] pointer-events-none"
        style={{
          transform: isAnimating ? "translateY(0)" : "translateY(100%)",
          transition: "transform 700ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />

      <div
        className="fixed inset-0 z-[9997] bg-[#B8963F] pointer-events-none"
        style={{
          transform: isAnimating ? "translateY(0)" : "translateY(100%)",
          transition: "transform 700ms cubic-bezier(0.76, 0, 0.24, 1)",
          transitionDelay: "100ms",
        }}
      />

      <div
        className="fixed inset-0 z-[9996] bg-[#1A1815] pointer-events-none"
        style={{
          transform: isAnimating ? "translateY(0)" : "translateY(100%)",
          transition: "transform 700ms cubic-bezier(0.76, 0, 0.24, 1)",
          transitionDelay: "200ms",
        }}
      />

      {/* Page content */}
      <div
        className={`transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        {children}
      </div>
    </>
  )
}
