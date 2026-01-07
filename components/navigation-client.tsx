"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MagneticButton } from "./magnetic-button"
import { LogoWithTexture } from "./logo-with-texture"
import { GradientButton } from "./gradient-button"
import type { SiteSettings, ContactInfo } from "@/sanity/lib/types"

interface NavigationClientProps {
  settings?: SiteSettings | null
  contactInfo?: ContactInfo | null
}

export function NavigationClient({ settings, contactInfo }: NavigationClientProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Use CMS nav links if available, otherwise fallback to default
  const links = settings?.navLinks && settings.navLinks.length > 0
    ? settings.navLinks.map(link => ({ href: link.url, label: link.label }))
    : [
      { href: "/works", label: "Works" },
      { href: "/process", label: "Process" },
      { href: "/contact", label: "Contact" },
    ]

  // Contact info from CMS or fallback
  const email = contactInfo?.email?.[0] || "desgin@perfectpixel.co.in"
  const phones = contactInfo?.phones?.[0] || "+91 7972823811"
  const location = contactInfo?.address?.split('\n')[0] || "Mumbai,Vadodara,Nashik,Indore"

  const menuVariants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 60px) 60px)",
      transition: { duration: 0.5, ease: [0.25, 0, 0.10, 1] },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 60px) 60px)",
      transition: { duration: 0.7, ease: [0.25, 0, 0.10, 1] },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, y: 50 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as any },
    }),
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
          ? "py-2 bg-[#FAF7F2]/100 backdrop-blur-md"
          : "py-2 bg-white/80 backdrop-blur-sm"
          }`}
      >

        <nav className="flex items-left justify-between max-w-[1500px] mx-auto px-3">
          {/* Logo */}
          <LogoWithTexture title={settings?.siteTitle || "Badhuche"} />

          <div className="flex items-center">
            {/* Desktop links - visible only before scroll */}
            <div
              className={`hidden md:flex items-center gap-6 transition-all duration-100 ${isScrolled ? "opacity-0 pointer-events-none translate-x-4" : "opacity-100 translate-x-0"
                }`}
            >
              <GradientButton
                href="/works"
                texture="gold-leaf"
                gradient="linear-gradient(135deg, #1a1815 0%, #c2542d 50%, #b8963f 100%)"
                className="text-[0.25rem] sm:text-xs ml-0 hidden md:inline-flex"
              >
                <span className="tracking-[0.16rem]">Work's</span>
              </GradientButton>
              {links
                .filter((link) => link.href !== "/works") // remove duplicate Work link
                .map((link) => (
                  <MagneticButton key={link.href} href={link.href}>
                    <span
                      className={`text-xs uppercase tracking-[0.1em] transition-all duration-300 link-underline ${pathname === link.href
                          ? "text-[#2E2B28] opacity-100"
                          : "text-[#6B6560] hover:text-[#1A1815] hover:text-black opacity-100"
                        }`}
                    >
                      {link.label}
                    </span>
                  </MagneticButton>
                ))}

            </div>

            <button
              className={`relative w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-right rounded-full transition-all duration-100 touch-manipulation ${isScrolled || isMenuOpen
                ? "md:opacity-100 md:translate-x-0"
                : "md:opacity-0 md:pointer-events-none md:-translate-x-4"
                } ${isMenuOpen ? "bg-[#1A1815]" : "bg-transparent hover:bg-[#1A1815]/5"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-3 flex flex-col justify-between">
                <span
                  className={`block w-full h-[1.5px] transition-all duration-300 origin-center ${isMenuOpen ? "bg-[#FAF7F2] rotate-45 translate-y-[5.5px]" : "bg-[#1A1815]"
                    }`}
                />
                <span
                  className={`block w-full h-[1.5px] transition-all duration-300 ${isMenuOpen ? "bg-[#FAF7F2] opacity-0" : "bg-[#1A1815] opacity-100"
                    }`}
                />
                <span
                  className={`block w-full h-[1.5px] transition-all duration-300 origin-center ${isMenuOpen ? "bg-[#FAF7F2] -rotate-45 -translate-y-[5.5px]" : "bg-[#1A1815]"
                    }`}
                />
              </div>
            </button>


          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#1A1815]"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants as any}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {/* Menu links */}
              <nav className="flex flex-col items-center">
                {links.map((link, i) => (
                  <motion.div key={link.href} custom={i} variants={linkVariants} initial="closed" animate="open">
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-serif text-4xl md:text-6xl transition-all duration-300 hover:text-[#B8963F] group relative ${pathname === link.href ? "text-[#C2542D]" : "text-[#FAF7F2]"
                        }`}
                    >
                      <span className="relative inline-block overflow-hidden">
                        <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                          {link.label}
                        </span>
                        <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-[#B8963F]">
                          {link.label}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer info in menu */}
              <motion.div
                className="absolute bottom-10 left-0 right-0 px-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[#8B8680] text-xs uppercase tracking-[0.2em]">
                  <span>{location}</span>
                  <span>{email}</span>
                  <span>{phones}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

