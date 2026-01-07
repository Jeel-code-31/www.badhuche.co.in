"use client"

import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`flex flex-col items-start gap-3 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      <span className="oh-lavbel text-[#F8F8F8] hover:text-[#DA951E] transition-colors">
        (SCROLL TO EXPLORE)
      </span>
      <div className="relative w-px h-20 bg-[#8B8680]/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2/3 bg-[#B8963F] animate-scroll-line" />
      </div>
    </div>
  )
}
