import { useState } from 'react'

export default function Collaborate() {
  const [status, setStatus] = useState({ state: 'idle' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading' })
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/submit`, {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || 'Submission failed')
      setStatus({ state: 'success' })
      form.reset()
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  return (
    <section id="collaborate" className="py-24 bg-[#0b1020] text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif">Collaborate</h2>
        <p className="mt-3 text-white/80">Submit your novel to begin the adaptation journey.</p>
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <input required name="name" placeholder="Name" className="px-4 py-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300/60" />
          <input required type="email" name="email" placeholder="Email" className="px-4 py-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300/60" />
          <input required name="novel_title" placeholder="Novel Title" className="px-4 py-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300/60 md:col-span-2" />
          <textarea required name="synopsis" placeholder="Synopsis" rows={4} className="px-4 py-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300/60 md:col-span-2" />
          <textarea name="message" placeholder="Message (optional)" rows={3} className="px-4 py-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300/60 md:col-span-2" />
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm text-white/70">Upload PDF (max 10MB)</label>
            <input type="file" name="file" accept="application/pdf" className="block w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-300 file:text-black hover:file:bg-amber-200" />
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button disabled={status.state==='loading'} className="px-6 py-3 rounded bg-amber-300 text-black font-semibold hover:bg-amber-200 disabled:opacity-50">{status.state==='loading' ? 'Submitting...' : 'Submit Project'}</button>
            {status.state==='success' && <span className="text-green-400">Submitted! We\'ll be in touch.</span>}
            {status.state==='error' && <span className="text-red-400">{status.message}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
