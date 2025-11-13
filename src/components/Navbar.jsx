import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const items = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Collaborate', href: '#collaborate' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="text-xl md:text-2xl font-serif tracking-wide text-white drop-shadow">AR Studios</a>
          <nav className="hidden md:flex items-center gap-8">
            {items.map((it) => (
              <a key={it.href} href={it.href} className="text-white/80 hover:text-white transition">
                {it.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Open menu">
            <Menu />
          </button>
        </div>
        {open && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            {items.map((it) => (
              <a key={it.href} href={it.href} onClick={() => setOpen(false)} className="block text-white/90 py-2">
                {it.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
