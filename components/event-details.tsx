export function EventDetails() {
  return (
    <section id="event" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-5xl sm:text-5xl font-semibold tracking-tight mb-20 text-foreground">Cyclix event</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold text-foreground">Ultimate cycling adventure</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Date</p>
                <p className="text-2xl font-semibold text-foreground">March 19, 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Location</p>
                <p className="text-lg font-semibold text-foreground">123 Cycling Lane, Adventure City, State, 39580</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition rounded-full text-sm">
              Register now
            </button>
          </div>

          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground font-medium">
              This exciting day promises breathtaking routes, invigorating challenges, and a vibrant community atmosphere. Participants will traverse stunning landscapes, enjoying the beauty of nature while pushing their limits. Whether you&apos;re seeking personal achievement or the joy of riding with fellow enthusiasts, Cyclix delivers an experience that transcends ordinary cycling events.
            </p>
            <div className="bg-card border border-border rounded-2xl p-8 space-y-5">
              <h4 className="font-semibold text-foreground text-lg">Why join Cyclix?</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground font-medium">Expertly curated routes for all skill levels</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground font-medium">Professional support and safety measures</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground font-medium">Vibrant community of passionate riders</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground font-medium">Memorable experiences and lasting connections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
