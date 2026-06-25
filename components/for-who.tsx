export function ForWho() {
  const audiences = [
    {
      title: 'Cyclists of all levels',
      description: 'Whether you\'re a seasoned cyclist, a weekend warrior, or just starting out, our event welcomes participants of all skill levels.'
    },
    {
      title: 'Families and recreational riders',
      description: 'Our cycling adventure offers suitable ride options for families and recreational riders, encouraging participation from all ages and skill levels.'
    },
    {
      title: 'Health and fitness enthusiasts',
      description: 'Challenge yourself and engage in a healthy lifestyle while enjoying the thrill of cycling in a supportive environment.'
    }
  ]

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-5xl sm:text-5xl font-semibold tracking-tight mb-6 text-foreground">For who</h2>
        <p className="text-lg text-muted-foreground mb-20 font-medium">Cyclix is designed for everyone who loves cycling and wants to be part of something special</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-8 space-y-5 hover:border-foreground/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
              <h3 className="text-2xl font-semibold text-foreground">{audience.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed font-medium">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
