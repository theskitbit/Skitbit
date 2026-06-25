import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service | Skitbit International Group",
  description: "Terms and conditions for Skitbit International Group services.",
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.065em] sm:text-5xl">Terms of Service</h1>
        <p className="mt-6 text-muted-foreground">Last updated: June 17, 2026</p>
        
        <div className="mt-12 space-y-8 text-base leading-8 text-foreground/80">
          <p>
            By engaging Skitbit International Group for 3D production, animation, or performance growth services, you agree to the following terms.
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">1. Payment & Refunds</h2>
          <p>
            All services require 100% payment upfront. For projects exceeding <strong>₹1,00,000 (or $2,500 USD for international clients)</strong>, we may agree to a 50% upfront payment structure at our sole discretion. <strong>Once work has commenced, all payments are non-refundable.</strong>
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">2. Scope of Work</h2>
          <p>
            The project scope is established and locked in before work commences. Once the production phase begins, the scope is non-negotiable. Any additional requests outside the original scope will require a new estimate and separate invoice.
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">3. Communication Protocols</h2>
          <p>
            While we maintain active communication via WhatsApp for convenience, all formal milestone updates, official scope lock-ins, and invoices must be documented via email. Documentation via email serves as the binding agreement for project progress.
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">4. Liability & Subjectivity</h2>
          <p>
            Skitbit International Group does not guarantee specific aesthetic or performance outcomes. Visual appeal is inherently subjective, and ad performance is subject to variables outside of our control (including market conditions, platform algorithms, and consumer behavior). We do not guarantee that final visuals will be identical to reference materials. You acknowledge that our services are provided "as-is" regarding creative interpretation and performance metrics.
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">5. Intellectual Property</h2>
          <p>
            Final creative assets are transferred to the client upon full payment of all invoices. Until full payment is received, Skitbit International Group retains all intellectual property rights to the work.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}