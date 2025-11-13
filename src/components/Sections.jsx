import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-[#0b1020] to-[#0f1630] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-3xl md:text-4xl font-serif">About</motion.h2>
        <p className="mt-6 text-white/80 leading-relaxed">
          Born from Novels Studio, AR Studios is a collective of editors, designers, and animators who translate prose into visual poetry. Our craft spans expert video editing, character design, and fluid 2D/3D animation—all anchored in faithful storytelling adaptation.
        </p>
      </div>
    </section>
  )
}

export function Process() {
  const steps = [
    { title: 'Novel Selection', desc: 'We review submissions to find stories with cinematic potential.' },
    { title: 'Script & Storyboarding', desc: 'From page to screenplay with boards that define pacing and mood.' },
    { title: 'Character & World Design', desc: 'Concept art, styleframes, and look-dev for immersive worlds.' },
    { title: 'Animation & Voice Production', desc: '2D/3D animation, VO casting, direction, and sound design.' },
    { title: 'Final Cut & Distribution', desc: 'Polish, color, and delivery to partners and platforms.' },
  ]
  return (
    <section id="process" className="py-24 bg-[#0f1630] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif">Our Process</h2>
        <div className="mt-10 relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/20" />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="relative md:grid md:grid-cols-2 items-start gap-8">
                <div className="md:text-right md:pr-10">
                  <span className="text-amber-300/90">Step {i+1}</span>
                  <h3 className="text-2xl font-serif">{s.title}</h3>
                </div>
                <p className="text-white/80 md:pl-10">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Portfolio() {
  const items = [
    { title: 'Moonlit Rivers', tag: 'Fantasy • 3D', thumb: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Echoes of Neon', tag: 'Sci-Fi • 2D/3D', thumb: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Garden of Glass', tag: 'Drama • 2D', thumb: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' },
  ]
  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-[#0f1630] to-[#0b1020] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif">Portfolio</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {items.map((it, i) => (
            <motion.a key={i} href="#" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <div className="aspect-video overflow-hidden">
                <img src={it.thumb} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="text-sm text-amber-300/90">{it.tag}</div>
                <div className="text-lg font-semibold">{it.title}</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
