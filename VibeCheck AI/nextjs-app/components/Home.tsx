'use client'
import Link from 'next/link'
import Video from 'next-video'
import Background from '../videos/background.mp4'

export default function Page() {
  return (
    <main className="relative grid min-h-[100vh] place-items-center overflow-hidden bg-[#0b0d12] text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <Video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          src={Background}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05]">
          Make Every Comment Count
        </h1>

        <p className="mt-5 text-base sm:text-lg text-white/80">
          Run real‑time sentiment on comments to classify them as positive, negative, or neutral.
          Improve moderation, protect your brand, and understand community mood.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/60"
          >
            Get started
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 shadow-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Talk to a human
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          video {
            animation: none !important;
            opacity: 0.25;
          }
        }
      `}</style>
    </main>
  )
}