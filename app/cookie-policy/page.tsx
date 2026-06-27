import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Cookie Policy | Skitbit International Group",
  description: "Cookie policy explaining how Skitbit uses cookies, pixels, and tracking technologies.",
}

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.065em] sm:text-5xl">Cookie Policy</h1>
        <p className="mt-6 text-muted-foreground">Last updated: June 27, 2026</p>

        <div className="mt-12 space-y-8 text-base leading-8 text-foreground/80">

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device that help us recognize you and improve your experience on theskitbit.com. We also use pixels (small images) and tags that perform similar functions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">Our Cookie Categories</h2>
            
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Essential Cookies (Always Active)</h3>
            <p className="mb-4">
              These cookies are necessary for the website to function and are automatically enabled. They cannot be disabled:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Session ID:</strong> Keeps you logged in during your visit</li>
              <li><strong>Security Tokens:</strong> Prevents fraud and unauthorized access</li>
              <li><strong>Form Data:</strong> Remembers your form inputs</li>
            </ul>
            <p className="text-sm text-muted-foreground">Duration: Session-based (cleared when you close your browser)</p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Marketing Cookies (Requires Consent)</h3>
            <p className="mb-4">
              These cookies track your behavior for advertising and performance measurement. They require your explicit consent:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Meta Pixel:</strong> Tracks conversions, page views, and user behavior for Meta ads retargeting. Meta Platforms, Inc. manages this data per their privacy policy. Duration: 180+ days
              </li>
              <li>
                <strong>Google Ads Tracking:</strong> Measures Google Ads campaign performance and tracks conversions. Google LLC manages this data per their privacy policy. Duration: 90+ days
              </li>
              <li>
                <strong>Google Tag Manager:</strong> Container for managing and deploying tags. Duration: Session-based
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">What These Cookies Do</h2>
            <p className="mb-4">
              <strong>Meta Pixel:</strong> Tracks when you visit our website, measures conversion events (form submissions, contact requests), allows us to retarget you with ads on Meta platforms (Instagram, Facebook), and helps us understand which ads are effective.
            </p>
            <p>
              <strong>Google Ads:</strong> Tracks your clicks on our Google Ads, measures conversions and ROI of advertising campaigns, allows us to retarget you on Google search and display network, and helps us optimize ad spending.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">Your Cookie Choices</h2>
            <p className="mb-4">
              When you first visit theskitbit.com, a cookie banner appears asking you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Accept:</strong> Enables both Essential and Marketing cookies</li>
              <li><strong>Reject:</strong> Enables Essential cookies only; disables Meta Pixel and Google Ads tracking</li>
            </ul>
            <p>
              You can change your preferences at any time by clearing your browser's local storage and revisiting the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">Opting Out of Marketing Cookies</h2>
            <p className="mb-4">
              Even if you've accepted cookies, you can opt out of personalized advertising:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://www.facebook.com/ads/preferences" className="underline hover:opacity-70">Meta Ad Settings</a> — Control personalized ads on Meta platforms</li>
              <li><a href="https://myactivity.google.com/activitycontrols" className="underline hover:opacity-70">Google Ad Settings</a> — Control personalized ads on Google</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">Third-Party Privacy Policies</h2>
            <p className="mb-4">
              Our marketing partners collect data according to their own privacy policies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://www.meta.com/privacy/" className="underline hover:opacity-70">Meta Privacy Policy</a></li>
              <li><a href="https://policies.google.com/privacy" className="underline hover:opacity-70">Google Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">Contact Us</h2>
            <p>
              Questions about our cookies? Email <strong>hello@theskitbit.com</strong>
            </p>
          </section>

        </div>
      </section>

      <Footer />
    </main>
  )
}