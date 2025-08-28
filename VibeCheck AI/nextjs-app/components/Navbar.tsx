'use client';
import VibeCheckAIIcon  from './Icons/vibecheck'

type NavbarProps = {
  refs: {
    homeRef: React.RefObject<HTMLElement>;
    featuresRef: React.RefObject<HTMLElement>;
    checkRef: React.RefObject<HTMLElement>;
    contactRef: React.RefObject<HTMLElement>;
  }
};

export default function Navbar({ refs }: NavbarProps) {
  const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-white/5 bg-[#0b0d12] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center py-4">
          <button 
            className="flex items-center gap-2 justify-self-start bg-transparent border-none"
            onClick={() => scrollToRef(refs.homeRef)}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-400/30">
              <VibeCheckAIIcon className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold italic">VibeCheckAI</span>
          </button>

          <nav className="hidden md:flex items-center justify-center gap-10 text-sm">
            <button
              onClick={() => scrollToRef(refs.homeRef)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToRef(refs.featuresRef)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToRef(refs.checkRef)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sentiment Check
            </button>
          </nav>

          <div className="justify-self-end">
            <button
              onClick={() => scrollToRef(refs.contactRef)}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
