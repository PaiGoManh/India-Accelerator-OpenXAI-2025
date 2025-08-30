import { Card, CardContent, CardHeader } from './Card/card'
import {
  Settings2,
  Sparkles,
  Zap,
  ShieldCheck,
  Bell,
  Lock,
} from 'lucide-react'
import { ReactNode } from 'react'

type Feature = {
  title: string
  desc: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const FEATURES: Feature[] = [
  {
    title: 'Real‑time classification',
    desc: 'Instant positive, negative, or neutral labels with confidence scores.',
    icon: Zap,
  },
  {
    title: 'You have full control',
    desc: 'Configure thresholds, run locally with Ollama, and integrate via API or webhooks.',
    icon: Settings2,
  },
  {
    title: 'Powered by AI',
    desc: 'LLM‑backed accuracy with consistent outputs for moderation and insights.',
    icon: Sparkles,
  },
  {
    title: 'Brand safety & moderation',
    desc: 'Detect toxicity and safeguard your community and brand reputation.',
    icon: ShieldCheck,
  },
  {
    title: 'Automated alerts',
    desc: 'Get notified on negative spikes or thresholds you define.',
    icon: Bell,
  },
  {
    title: 'Privacy‑first',
    desc: 'Run locally or on your VPC to keep data under your control.',
    icon: Lock,
  }
]

export default function Features() {
  return (
    <section className="pt-[8%] bg-black text-white">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Why VibeCheck AI
          </p>
          <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">
            Smarter moderation, faster insights
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Real‑time sentiment with confidence scores, alerts, and dashboards—powered by local or cloud LLMs.
            Moderate faster and understand your community at a glance.
          </p>
        </div>

        <div className="mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-w-4xl">
          {FEATURES.map(({ title, desc, icon: Icon }, i) => {
            const delay = i * 100
            return (
              <div
                key={title}
                data-aos="fade-right"
                data-aos-anchor-placement="top-center"
                data-aos-delay={delay}
              >
                <Card className="group h-full border border-white/10 bg-zinc-800/60 shadow-black/30 p-3">
                  <CardHeader className="pb-1">
                    <CardDecorator>
                      <Icon className="size-4 text-white" aria-hidden />
                    </CardDecorator>
                    <h3 className="text-center mt-2 text-sm font-medium text-white">
                      {title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <p className="text-xs w-[250px] text-white/70">{desc}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-9 flex items-center justify-center rounded-md border border-white/10 bg-zinc-800/80">
    {children}
  </div>
)