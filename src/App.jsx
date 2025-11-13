import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Process, Portfolio } from './components/Sections'
import Collaborate from './components/Collaborate'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="font-sans bg-[#0b1020] text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        <Portfolio />
        <Collaborate />
        {/* Admin dashboard at /#/dashboard in router-less demo, expose anchor */}
        <div id="admin" className="hidden"></div>
      </main>
    </div>
  )
}

export default App
