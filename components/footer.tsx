"use client"

import { MagneticButton } from "./magnetic-button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react"
import type { SiteSettings, ContactInfo } from "@/sanity/lib/types"

interface FooterProps {
  settings?: SiteSettings | null
  contactInfo?: ContactInfo | null
}

export function Footer({ settings, contactInfo }: FooterProps) {
  const prefersReducedMotion = useReducedMotion()
  // Extract data from CMS or use defaults
  const siteTitle = settings?.siteTitle || "Badhuche"
  const contactSummary = settings?.contactSummary || "Reimagining spaces as lasting cultural landmarks through monumental art and sculptural excellence."
  const email = contactInfo?.email?.[0] || "design@perfectpixel.co.in"
  const phones = contactInfo?.phones?.[0] || "+91 7972823811"
  const address = contactInfo?.address || "Mumbai, Maharashtra\nIndia"
  const addresses = [
    {
      title: "Head Office",
      lines: [
        "National Plaza",
         "S5 3rd Floor, Alkapuri",
        "Vadodara, Gujarat",
      ],
    },
    {
      title: "Second Office",
      lines: [
        "Nashik Road,",
        " Maharashtra",
        "India",
      ],
    },
  ]

  const addressLines = address.split('\n')

  // Social links from CMS or default
  const socialLinks = settings?.social && settings.social.length > 0
    ? settings.social
    : [
      { platform: "Instagram", url: "https://www.instagram.com/badhuche/" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/company/badhuche/" },
      { platform: "YouTube", url: "https://www.youtube.com/" },
      { platform: "Facebook", url: "https://www.facebook.com/" },
    ]

  return (
    <footer className="relative overflow-hidden text-[#FAF7F2]">
      {/* Background video */}
      {!prefersReducedMotion && (
        <video
          className="absolute inset-0 w-full h-full object-cover scale-[1.03] blur-[0.5px]"
          poster="/footer.png"
          autoPlay
          muted
          loop
          playsInline
        />

      )}
      {prefersReducedMotion && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/footer.png)" }}
        />
      )}
      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t" />

       <div className="relative px-5 md:px-6 pb-4 pt-7">
        <div className="max-w-[1400px] mx-auto">
          {/* The only divider on the entire site */}
          <div className="w-full h-px bg-[rgba(250,247,242,0.16)] mb-3" />
        </div>

        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            {/* Left side - branding */}
            <div className="space-y-2">
              <MagneticButton href="/">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-[#FAF7F2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:tracking-[0.09em]">
                  {siteTitle}
                  <sup className="text-xs align-super ml-0.5">TM</sup>
                </span>
              </MagneticButton>
              <p className="text-[#E8E2D9] text-xl max-w-[360px] leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
                {contactSummary}
              </p>
              <p className="text-[#D9D4CC] text-xs drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">© {new Date().getFullYear()} {siteTitle} Art Studios</p>
            </div>

            {/* Right side - contact & social */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-20">
              {/* Contact */}
              <div className="space-y-5">
                <span className="text-xs uppercase tracking-[0.12em] text-[#F5F0E8] font-semibold drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">(Contact)</span>
                <div className="space-y-3">
                  <a
                    href={`mailto:${email}`}
                    className="block text-[#FAF7F2] text-sm font-semibold hover:text-[#b8963f] transition-colors duration-300 drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]"
                  >
                    {email}
                  </a>
                  <a
                    href={`tel:${phones.replace(/\s/g, '')}`}
                    className="block text-[#FAF7F2] text-sm font-semibold hover:text-[#b8963f] transition-colors duration-300 drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]"
                  >
                    {phones}
                  </a>
                </div>
              </div>

              {/* Social - minimal */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.12em] text-[#F5F0E8] font-semibold drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">(Social)</span>
                <div className="flex items-center gap-4 drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
                  {socialLinks.map((social) => {
                    const icon =
                      social.platform.toLowerCase() === "instagram" ? <Instagram className="h-5 w-5" /> :
                        social.platform.toLowerCase() === "linkedin" ? <Linkedin className="h-5 w-5" /> :
                          social.platform.toLowerCase() === "youtube" ? <Youtube className="h-5 w-5" /> :
                            <Facebook className="h-5 w-5" />

                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="text-[#FAF7F2] hover:text-[#b8963f] transition-colors duration-300"
                      >
                        {icon}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.12em] text-[#F5F0E8] font-semibold drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">(Location)</span>
                <div className="space-y-1">
                  {addressLines.map((line, i) => (
                    <p key={i} className="text-[#FAF7F2] text-sm font-semibold drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">{line}</p>
                  ))}
                </div>
              </div>
              {/* Location */}
              <div className="space-y-6">
                {addresses.map((address, index) => (
                  <div key={index} className="space-y-3">
                    {/* Address Title */}
                    <span className="text-xs uppercase tracking-[0.12em] text-[#F5F0E8] font-semibold">
                      {address.title}
                    </span>

                    {/* Address Lines */}
                    <div className="space-y-1">
                      {address.lines.map((line, i) => (
                        <p
                          key={i}
                          className="text-[#FAF7F2] text-sm font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
