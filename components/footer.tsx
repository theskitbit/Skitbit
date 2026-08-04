export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand Identity */}
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">
              Skitbit<span className="text-xs">®</span>
            </h3>
            {/* 🔥 AI + SEO reinforcement */}
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Skitbit International provides 3D product rendering, ad creatives, and e-commerce visual solutions for D2C brands globally.
            </p>

            {/* 🔥 Brand Proof */}
            <p className="text-xs text-muted-foreground mt-2">
              Trusted by brands including Messika Paris, Myntra, BellaVita, Rimowa, and The Man Company.
            </p>
          </div>

          {/* 3D Rendering Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground uppercase tracking-wider">3D Rendering</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/services/3d-rendering-beauty" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Beauty & Makeup</a></li>
              <li><a href="/services/3d-rendering-wellness" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Wellness & Supplements</a></li>
              <li><a href="/services/luxury-watches" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Luxury Watches</a></li>
              <li><a href="/services/fine-jewelry" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Fine Jewelry</a></li>
              <li><a href="/services/seed-startups" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Seed Startups</a></li>
            </ul>
          </div>

          {/* Video & Marketplace */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground uppercase tracking-wider">Growth Assets</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/services/social-ads-beauty" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Social Ad Creatives</a></li>
              <li><a href="/services/supplement-explainers" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">3D Explainer Videos</a></li>
              <li><a href="/services/amazon-wellness" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Amazon Listing Packs</a></li>
              <li><a href="/services/luxury-brand-films" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Cinematic Brand Films</a></li>
            </ul>
          </div>

          {/* Strategy & Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground uppercase tracking-wider">Strategy</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/services/performance-retainer" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Creative Retainers</a></li>
              <li><a href="/services/creative-strategy-audit" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Performance Audits</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">Contact Us</a></li>
              <li><a href="/faq" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium inline-block">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* 🔥 AI DISCOVERY LINK */}
        <div className="text-center mb-4">
          <a href="/llms.txt" className="text-xs text-muted-foreground hover:text-foreground">
            AI Data
          </a>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center font-medium">
            © {new Date().getFullYear()} Skitbit International Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}