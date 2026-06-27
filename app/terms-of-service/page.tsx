import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service | Skitbit International Group",
  description: "Terms and conditions for Skitbit International Group 3D rendering and performance marketing services.",
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.065em] sm:text-5xl">Terms of Service</h1>
        <p className="mt-6 text-muted-foreground">Last updated: June 27, 2026</p>

        <div className="mt-12 space-y-8 text-base leading-8 text-foreground/80">

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">Engagement & Acceptance</h2>
            <p>
              By requesting a quote, accepting a quote via email, or engaging Skitbit International Group for 3D production, animation, or performance marketing services, you agree to these Terms of Service.
            </p>
            <p className="mt-4">
              <strong>Jurisdiction:</strong> These Terms are governed by Indian law. All disputes shall be resolved exclusively in courts located in India. You consent to Indian jurisdiction and waive the right to pursue claims in any other jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">1. Scope of Work & Project Lock-in</h2>
            <p className="mb-4">
              <strong>Quote & Binding Agreement:</strong> A formal written quote specifies the exact scope of deliverables. Scope lock-in occurs immediately upon email confirmation of the quote.
            </p>
            <p className="mb-4">
              <strong>Scope Changes:</strong> Any requests outside the original scope require a new estimate and separate invoice. We will not implement out-of-scope changes without a written amendment.
            </p>
            <p>
              <strong>Communication Channels:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Official (Binding):</strong> hello@theskitbit.com — all scope approvals and price agreements</li>
              <li><strong>Informal (Non-Binding):</strong> WhatsApp for daily feedback and revisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">2. Payment Terms</h2>
            <p className="mb-4">
              <strong>Payment Structure:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Standard Projects:</strong> 100% payment upfront before production begins</li>
              <li><strong>Large Projects</strong> (₹1,00,000 / $2,500+ USD): 100% upfront OR 70% upfront + 30% due upon final delivery (at our discretion)</li>
            </ul>
            <p className="mb-4">
              <strong>Non-Refundable Services:</strong> All payments are non-refundable once production has commenced. This applies regardless of project outcome, timeline delays, or client satisfaction.
            </p>
            <p>
              <strong>Partial Delivery & Payment:</strong> Projects must be completed in full per agreed scope. No partial delivery credits are accepted. If you paid 70% for a 2-video project and received 1 video, the remaining 30% is still due in full.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">3. Timeline & Delivery Estimates</h2>
            <p className="mb-4">
              <strong>Estimate ≠ Guarantee:</strong> All timeline estimates (e.g., "5-7 days," "2 weeks") are estimates only and do not constitute a guarantee. The nature of 3D production includes multiple revision rounds, client feedback loops, and quality assurance checks.
            </p>
            <p className="mb-4">
              <strong>Actual delivery may take longer than the estimate.</strong> We are not liable for delays and do not offer refunds, credits, or compensation for late delivery.
            </p>
            <p>
              <strong>Revision Impact:</strong> Each revision request adds time to the final delivery estimate. You acknowledge that revision rounds extend the project duration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">4. Deliverables & Quality</h2>
            <p className="mb-4">
              <strong>Subjective Nature:</strong> Visual appeal and design interpretation are inherently subjective. We do not guarantee that final deliverables will match reference materials, mood boards, or your exact vision.
            </p>
            <p className="mb-4">
              <strong>Performance Metrics:</strong> We do not guarantee specific advertising performance, engagement rates, conversion rates, or ROI. Ad performance is subject to variables outside our control: platform algorithms, market conditions, audience targeting, and consumer behavior.
            </p>
            <p>
              <strong>Acceptance & Rejection:</strong> If you reject deliverables for quality reasons, we reserve the right to revise once. If you reject revised deliverables, the project is considered delivered and complete. No refunds will be issued for rejection of deliverables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              <strong>Ownership Transfer:</strong> Before full payment, Skitbit retains all intellectual property rights. After full payment, IP rights transfer to you. You may not use deliverables until full payment is received.
            </p>
            <p className="mb-4">
              <strong>Usage Rights:</strong> Upon full payment, you receive a non-exclusive, perpetual license to use deliverables for your business purposes. You may not resell or redistribute deliverables to third parties.
            </p>
            <p>
              <strong>Portfolio Usage:</strong> We retain the right to showcase completed work in our portfolio and case studies unless explicitly restricted in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">6. Liability & Limitations</h2>
            <p className="mb-4">
              <strong>No Warranties:</strong> We provide services on an "as-is" basis. We make no warranties regarding creative quality, visual outcomes, or performance metrics.
            </p>
            <p className="mb-4">
              <strong>Limitation of Liability:</strong> Our total liability is limited to the amount paid for the specific project. We are not liable for indirect, incidental, consequential, or punitive damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">7. Dispute Resolution & Non-Payment</h2>
            <p className="mb-4">
              <strong>Collection Enforcement:</strong> If you fail to pay for services rendered, we may:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Withhold final deliverables</li>
              <li>Pursue legal action in Indian courts</li>
              <li>Recover all legal fees and court costs from you</li>
            </ul>
            <p>
              <strong>Jurisdiction:</strong> All disputes shall be resolved in courts located in India only. You waive the right to pursue claims in any other jurisdiction. Indian law governs all disputes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">8. Termination</h2>
            <p className="mb-4">
              <strong>Project Cancellation:</strong> If you request to cancel after work has commenced, you forfeit all payments made. If you request cancellation before work begins, a 50% cancellation fee applies.
            </p>
            <p>
              <strong>Service Suspension:</strong> We reserve the right to suspend services if communication becomes unresponsive or abusive, or to refuse future projects from clients with histories of non-payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">9. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued engagement with our services constitutes acceptance of updated terms.
            </p>
          </section>

        </div>
      </section>

      <Footer />
    </main>
  )
}