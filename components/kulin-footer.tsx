export function KulinFooter() {
  return (
    <footer className="bg-blue-100 border-t-4 border-yellow-400 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left - Logo and Links */}
          <div className="flex items-center gap-12">
            <h3 className="text-2xl font-black text-yellow-400">KULIN</h3>
            <div className="flex items-center gap-8">
              <a href="#about" className="text-sm font-bold text-black hover:opacity-70 transition">
                About
              </a>
              <a href="#connect" className="text-sm font-bold text-black hover:opacity-70 transition">
                Connect
              </a>
              <a href="#blog" className="text-sm font-bold text-black hover:opacity-70 transition">
                Blog
              </a>
              <a href="#kulin" className="text-sm font-bold text-black hover:opacity-70 transition">
                KULIN
              </a>
              <a href="#oddit" className="text-sm font-bold text-black hover:opacity-70 transition">
                Oddit
              </a>
              <a href="#twitter" className="text-sm font-bold text-black hover:opacity-70 transition">
                Twitter
              </a>
              <a href="#linkedin" className="text-sm font-bold text-black hover:opacity-70 transition">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right - Copyright */}
          <p className="text-xs text-black font-medium">
            © Kulin Co {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
