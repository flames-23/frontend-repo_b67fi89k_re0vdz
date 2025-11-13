import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-[#0b1020]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#0b1020]/40 to-[#0b1020] pointer-events-none" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl">
          <h1 className="text-3xl md:text-6xl font-serif text-white drop-shadow leading-tight">
            Where Stories Breathe. Where Words Become Worlds.
          </h1>
          <p className="mt-6 text-white/80 max-w-2xl mx-auto">
            AR Studios transforms novels into cinematic animated experiences.
          </p>
          <a href="#collaborate" className="inline-block mt-8 px-8 py-4 rounded-full text-black font-semibold bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-200 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.6)]">
            Bring Your Novel to Life
          </a>
        </motion.div>
      </div>
    </section>
  )
}
