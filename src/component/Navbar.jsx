import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <a href="#home" className="brand">
        SuϻɪƬ Yᴀᴅᴀꪜ<span>.</span>
      </a>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}

        <a
          href="#contact"
          className="nav-cta"
          onClick={() => setOpen(false)}
        >
          Let's Talk ↗
        </a>
      </nav>
    </header>
  )
}