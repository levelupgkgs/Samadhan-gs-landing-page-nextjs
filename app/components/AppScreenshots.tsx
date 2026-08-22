'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export const APP_SCREENSHOTS = [
  { src: '/images/image1.webp', alt: 'Samadhan GS app showing all supported exams — SSC, Railway, Bihar and other central government exams' },
  { src: '/images/image2.webp', alt: 'Samadhan GS Study tab with the complete GS syllabus — Current Affairs, History, Geography, Polity and Economics' },
  { src: '/images/image3.webp', alt: 'Samadhan GS bilingual notes in Hindi and English with illustrated study material' },
  { src: '/images/image4.webp', alt: 'Samadhan GS leaderboard ranking top learners by all-time, daily, weekly and monthly scores' },
  { src: '/images/image5.webp', alt: 'Samadhan GS daily practice quiz with a timed SSC CHSL question and instant answer explanation' },
]

/**
 * Auto-advancing showcase of the real app graphics. The source images already
 * include their own device frame and background, so they are shown as-is
 * rather than wrapped in another phone mockup.
 */
export function ScreenshotCarousel({
  interval = 3500,
  priority = false,
}: {
  interval?: number
  priority?: boolean
}) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % APP_SCREENSHOTS.length)
    }, interval)
    return () => clearInterval(id)
  }, [interval, isPaused])

  return (
    <div
      className="flex flex-col items-center gap-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-[260px] sm:w-[300px] aspect-[9/16]">
        {/* Ambient glow behind the artwork */}
        <div className="absolute -inset-6 bg-gradient-to-tr from-orange-500/25 via-rose-500/20 to-purple-500/25 blur-3xl rounded-full" />

        <div className="relative w-full h-full rounded-[2rem] overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={APP_SCREENSHOTS[index].src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Image
                src={APP_SCREENSHOTS[index].src}
                alt={APP_SCREENSHOTS[index].alt}
                fill
                sizes="(max-width: 640px) 260px, 300px"
                className="object-cover"
                priority={priority && index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center gap-2">
        {APP_SCREENSHOTS.map((shot, i) => (
          <button
            key={shot.src}
            onClick={() => setIndex(i)}
            aria-label={`Show screenshot ${i + 1} of ${APP_SCREENSHOTS.length}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Static fanned stack of three graphics — used where a carousel would repeat
 * the hero's motion.
 */
export function ScreenshotStack() {
  const stack = [APP_SCREENSHOTS[1], APP_SCREENSHOTS[4], APP_SCREENSHOTS[3]]
  const layout = [
    { rotate: -8, x: -60, z: 10 },
    { rotate: 0, x: 0, z: 30 },
    { rotate: 8, x: 60, z: 10 },
  ]

  return (
    <div className="relative w-[280px] sm:w-[340px] aspect-[9/16]">
      <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full" />

      {stack.map((shot, i) => (
        <motion.div
          key={shot.src}
          className="absolute inset-0 rounded-[1.75rem] overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/50"
          style={{ zIndex: layout[i].z }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: layout[i].rotate,
            x: layout[i].x,
            scale: i === 1 ? 1 : 0.88,
          }}
          transition={{ duration: 0.7, delay: i * 0.12 }}
          viewport={{ once: true }}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 640px) 280px, 340px"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}
