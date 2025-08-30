'use client'
import Link from 'next/link'
import Video from 'next-video'
import Background from '../videos/background.mp4'
import SentimentDashboardHero from '../components/Icons/SentimentDashboardHero'

export default function Page() {
  return (
    <main className="relative min-h-[100vh] overflow-hidden bg-[#0b0d12] text-white grid items-center px-[2%]">
      <div className="absolute inset-0" aria-hidden="true">
        <Video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          src={Background}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-black/85 via-black/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(1200px_600px_at_left,_rgba(0,0,0,0.65),_transparent_60%)]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left: Text + CTAs */}
          <div className="text-center lg:col-span-6 lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70 shadow-sm backdrop-blur-sm">
                AI Sentiment Analysis
              </span>
            </div>

            <h1 className="mt-4 font-extrabold tracking-tight leading-[1.1] text-4xl sm:text-5xl lg:text-6xl">
              Make Every
            </h1>
            <h1 className="mt-4 font-extrabold tracking-tight leading-[1.1] text-4xl sm:text-5xl lg:text-6xl">
              Comment Count
            </h1>

            <p className="mt-5 max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-white/80">
              Run real‑time sentiment on comments to classify them as positive, negative, or neutral.
              Improve moderation, protect your brand, and understand community mood.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-medium text-white/90 shadow-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Check with AI
              </Link>
            </div>
          </div>

          {/* Right: Illustration */}
          <div data-aos ="fade-up" data-aos-delay="150" className="lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[640px]">
              <SentimentDashboardHero
                className="w-full h-auto rounded-3xl ring-1 ring-white/10 bg-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-[30px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(249,115,22,0.08),transparent_60%)]"
              />
            </div>
          </div>
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