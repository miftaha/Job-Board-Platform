import Link from 'next/link'

export default function Footer() {
  const links = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ]
  const socials = [
    { label: 'Twitter', href: '#', icon: '🐦' },
    { label: 'LinkedIn', href: '#', icon: '💼' },
    { label: 'GitHub', href: '#', icon: '🐙' },
  ]

  return (
    <footer className="py-12 bg-gray-900 text-white text-center border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center gap-8 mb-6">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="text-2xl text-white hover:text-secondary transition-colors"
              title={social.label}
            >
              {social.icon}
            </Link>
          ))}
        </div>
        <nav className="flex justify-center gap-6 mb-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-white">
          © 2025 Job Board Platform. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
