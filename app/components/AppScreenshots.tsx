'use client'
import { motion, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const APP_SCREENSHOTS = [
  { src: '/images/image1.webp', alt: 'Samadhan GS app showing all supported exams — SSC, Railway, Bihar and other central government exams' },
  { src: '/images/image2.webp', alt: 'Samadhan GS Study tab with the complete GS syllabus — Current Affairs, History, Geography, Polity and Economics' },
  { src: '/images/image3.webp', alt: 'Samadhan GS bilingual notes in Hindi and English with illustrated study material' },
  { src: '/images/image4.webp', alt: 'Samadhan GS leaderboard ranking top learners by all-time, daily, weekly and monthly scores' },
  { src: '/images/image5.webp', alt: 'Samadhan GS daily practice quiz with a timed SSC CHSL question and instant answer explanation' },
]

const COUNT = APP_SCREENSHOTS.length

/** Shortest signed distance from `index` to `i` around the carousel. */
function offsetFrom(i: number, index: number) {
  let d = i - index
  if (d > COUNT / 2) d -= COUNT
  if (d < -COUNT / 2) d += COUNT
  return d
}

/** Where a card sits, given how far it is from the active one. */
function slotFor(d: number, fanned: boolean) {
  if (d === 0) return { x: '0%', scale: 1, rotate: 0, opacity: 1, zIndex: 30 }

  if (fanned && Math.abs(d) === 1) {
    const side = d < 0 ? -1 : 1
    return { x: `${side * 58}%`, scale: 0.84, rotate: side * 8, opacity: 0.55, zIndex: 20 }
  }

  // Off-stage: parked to one side and faded out.
  return { x: `${d < 0 ? -85 : 85}%`, scale: 0.7, rotate: 0, opacity: 0, zIndex: 10 }
}

type GalleryProps = {
  /** Show the neighbouring screenshots angled behind the active one. */
  fanned?: boolean
  /** Auto-advance delay in ms. Pass 0 to disable. */
  autoPlay?: number
  priority?: boolean
  className?: string
}

/**
 * Swipeable showcase of the real app graphics. The source images already
 * include their own device frame and background, so they are shown as-is
 * rather than wrapped in another phone mockup.
 */
export function ScreenshotGallery({
  fanned = false,
  autoPlay = 0,
  priority = false,
  className = '',
}: GalleryProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isWide, setIsWide] = useState(false)

  // Phones are too narrow for the angled neighbours — they would be cropped
  // by the section's overflow, so fan out only once there is room.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsWide(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const showFan = fanned && isWide

  const go = useCallback((step: number) => {
    setIndex((i) => (i + step + COUNT) % COUNT)
  }, [])

  useEffect(() => {
    if (!autoPlay || isPaused) return
    const id = setInterval(() => go(1), autoPlay)
    return () => clearInterval(id)
  }, [autoPlay, isPaused, go])

  // A flick counts even when it is short, as long as it is fast.
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsPaused(false)
    const power = info.offset.x + info.velocity.x * 0.2
    if (power < -60) go(1)
    else if (power > 60) go(-1)
  }

  return (
    <div
      className={`flex flex-col items-center gap-5 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Samadhan GS app screenshots"
    >
      <div className="relative flex items-center">
        {/* Ambient glow behind the artwork */}
        <div
          className={`absolute -inset-8 blur-3xl rounded-full pointer-events-none ${
            fanned
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20'
              : 'bg-gradient-to-tr from-orange-500/25 via-rose-500/20 to-purple-500/25'
          }`}
        />

        <button
          onClick={() => go(-1)}
          aria-label="Previous screenshot"
          className="hidden sm:flex absolute -left-12 z-40 w-10 h-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Drag surface */}
        <motion.div
          className="relative w-[260px] sm:w-[300px] aspect-[9/16] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {APP_SCREENSHOTS.map((shot, i) => {
            const d = offsetFrom(i, index)
            const isActive = d === 0
            return (
              <motion.div
                key={shot.src}
                className="absolute inset-0 rounded-[2rem] overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/50"
                initial={false}
                animate={slotFor(d, showFan)}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                aria-hidden={!isActive}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 640px) 260px, 300px"
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                  priority={priority && i === 0}
                />
              </motion.div>
            )
          })}
        </motion.div>

        <button
          onClick={() => go(1)}
          aria-label="Next screenshot"
          className="hidden sm:flex absolute -right-12 z-40 w-10 h-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex items-center gap-2">
        {APP_SCREENSHOTS.map((shot, i) => (
          <button
            key={shot.src}
            onClick={() => setIndex(i)}
            aria-label={`Show screenshot ${i + 1} of ${COUNT}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-gray-500 sm:hidden">Swipe to see more</p>
    </div>
  )
}
