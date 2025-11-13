import { useEffect, useMemo, useState } from 'react'

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('ar_admin_token') || '')
  const [email, setEmail] = useState('')

  const login = async (email, password) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const body = new URLSearchParams({ username: email, password })
    const res = await fetch(`${baseUrl}/api/admin/login`, { method: 'POST', body })
    const json = await res.json()
    if (!res.ok) throw new Error(json.detail || 'Login failed')
    localStorage.setItem('ar_admin_token', json.access_token)
    setToken(json.access_token)
    setEmail(email)
  }

  const logout = () => {
    localStorage.removeItem('ar_admin_token')
    setToken('')
  }

  return { token, email, login, logout }
}

export default function Dashboard() {
  const { token, login, logout } = useAuth()
  const [view, setView] = useState('list')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [selected, setSelected] = useState(null)

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const fetchItems = async () => {
    const url = new URL(`${baseUrl}/api/admin/submissions`)
    url.searchParams.set('page', page)
    url.searchParams.set('page_size', 8)
    if (q) url.searchParams.set('q', q)
    if (status) url.searchParams.set('status', status)
    const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } })
    const json = await res.json()
    if (!res.ok) throw new Error(json.detail || 'Failed to fetch')
    setItems(json.items)
    setTotal(json.total)
  }

  const viewItem = async (id) => {
    const res = await fetch(`${baseUrl}/api/admin/submissions/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    const json = await res.json()
    if (!res.ok) throw new Error(json.detail || 'Failed')
    setSelected(json)
    setView('detail')
  }

  const markStatus = async (id, newStatus) => {
    await fetch(`${baseUrl}/api/admin/submissions/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status: newStatus }) })
    fetchItems()
    if (selected && selected.id === id) setSelected({ ...selected, status: newStatus })
  }

  const addNote = async (id, note) => {
    if (!note) return
    await fetch(`${baseUrl}/api/admin/submissions/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ add_note: note }) })
    setSelected({ ...selected, notes: [...(selected.notes||[]), note] })
  }

  const remove = async (id) => {
    if (!confirm('Delete this submission?')) return
    await fetch(`${baseUrl}/api/admin/submissions/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setView('list')
    fetchItems()
  }

  useEffect(() => { if (token) fetchItems() }, [token, page, q, status])

  if (!token) {
    return <Login onLogin={login} />
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b1020] to-[#0f1630] text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-serif">AR Studios – Project Dashboard</h1>
          <button onClick={logout} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20">Logout</button>
        </div>

        {view === 'list' && (
          <div className="mt-8">
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div className="flex gap-2">
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by author, email, title" className="px-3 py-2 rounded bg-black/30 border border-white/10" />
                <select value={status} onChange={e=>setStatus(e.target.value)} className="px-3 py-2 rounded bg-black/30 border border-white/10">
                  <option value="">All Status</option>
                  <option>Pending</option>
                  <option>In Review</option>
                  <option>Approved</option>
                  <option>Completed</option>
                </select>
                <button onClick={()=>{setPage(1); fetchItems()}} className="px-4 py-2 rounded bg-amber-300 text-black">Filter</button>
              </div>
              <div className="text-white/70">Total: {total}</div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-3">Author</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Submitted</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-t border-white/10 hover:bg-white/5">
                      <td className="p-3">{it.name}</td>
                      <td className="p-3">{it.email}</td>
                      <td className="p-3">{it.novel_title}</td>
                      <td className="p-3">{it.status}</td>
                      <td className="p-3">{new Date(it.submitted_at).toLocaleString()}</td>
                      <td className="p-3 flex gap-2">
                        <button onClick={()=>viewItem(it.id)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">View</button>
                        {it.file_url && <a href={`${baseUrl}/api/admin/submissions/${it.id}/download`} target="_blank" className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Download PDF</a>}
                        <button onClick={()=>markStatus(it.id, 'In Review')} className="px-3 py-1 rounded bg-amber-300 text-black">Mark In Review</button>
                        <button onClick={()=>remove(it.id)} className="px-3 py-1 rounded bg-red-500/80">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 rounded bg-white/10 disabled:opacity-50">Prev</button>
              <span className="text-white/70">Page {page}</span>
              <button disabled={(page*8)>=total} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 rounded bg-white/10 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}

        {view === 'detail' && selected && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-serif">{selected.novel_title}</h3>
              <div className="mt-2 text-white/80 whitespace-pre-wrap">{selected.synopsis}</div>
              {selected.message && <div className="mt-4 text-white/70">Message: {selected.message}</div>}
              {selected.file_url && <a className="mt-4 inline-block px-4 py-2 rounded bg-white/10" href={`${baseUrl}/api/admin/submissions/${selected.id}/download`} target="_blank">Download PDF</a>}
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div>Author: <span className="text-white/80">{selected.name}</span></div>
              <div>Email: <span className="text-white/80">{selected.email}</span></div>
              <div>Status: <span className="text-amber-300">{selected.status}</span></div>
              <div className="mt-4 flex gap-2">
                {['Pending','In Review','Approved','Completed'].map(s=> (
                  <button key={s} onClick={()=>markStatus(selected.id, s)} className={`px-3 py-1 rounded ${selected.status===s?'bg-amber-300 text-black':'bg-white/10'}`}>{s}</button>
                ))}
              </div>
              <Notes onAdd={(note)=>addNote(selected.id, note)} notes={selected.notes||[]} />
              <button onClick={()=>setView('list')} className="mt-4 px-3 py-2 rounded bg-white/10">Back</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@arstudios.com')
  const [password, setPassword] = useState('admin1234')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try { await onLogin(email, password) } catch (e) { setErr(e.message) }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b1020] to-[#0f1630] text-white flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-serif">Admin Login</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="mt-4 w-full px-3 py-2 rounded bg-black/30 border border-white/10" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="mt-2 w-full px-3 py-2 rounded bg-black/30 border border-white/10" />
        {err && <div className="mt-2 text-red-400 text-sm">{err}</div>}
        <button className="mt-4 w-full px-4 py-2 rounded bg-amber-300 text-black font-semibold">Login</button>
      </form>
    </section>
  )
}

function Notes({ notes, onAdd }) {
  const [text, setText] = useState('')
  return (
    <div className="mt-6">
      <h4 className="font-semibold">Internal Notes</h4>
      <div className="space-y-2 mt-2 max-h-48 overflow-auto">
        {notes.length===0 && <div className="text-white/60">No notes yet.</div>}
        {notes.map((n,i)=> (
          <div key={i} className="text-sm bg-black/30 border border-white/10 p-2 rounded">{n}</div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add a note" className="flex-1 px-3 py-2 rounded bg-black/30 border border-white/10" />
        <button onClick={()=>{onAdd(text); setText('')}} className="px-3 py-2 rounded bg-white/10">Add</button>
      </div>
    </div>
  )
}
