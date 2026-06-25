import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy | Skitbit International Group",
  description: "Privacy policy for Skitbit International Group.",
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.065em] sm:text-5xl">Privacy Policy</h1>
        <p className="mt-6 text-muted-foreground">Last updated: June 17, 2026</p>
        
        <div className="mt-12 space-y-8 text-base leading-8 text-foreground/80">
          <p>
            At Skitbit International Group, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share information when you use our website or engage with our services, including our marketing campaigns on Meta and Google.
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">1. Information We Collect</h2>
          <p>
            When you interact with our site, we may collect personal information such as your name, email address, company details, and website URL when you voluntarily provide it through our contact forms or WhatsApp integration. We also collect technical data through cookies and tracking pixels (Google Ads & Meta Pixel) to improve our advertising relevance.
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">2. How We Use Your Data</h2>
          <p>We use the data collected to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide you with visual audits and 3D creative services.</li>
            <li>Communicate with you regarding your inquiries via email or WhatsApp.</li>
            <li>Improve our website performance and user experience.</li>
            <li>Measure the effectiveness of our advertising campaigns on platforms like Meta and Google.</li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">3. Advertising & Analytics</h2>
          <p>
            We use third-party tools such as Google Ads and Meta Pixel to better understand how visitors interact with our content. These tools may use cookies to serve ads based on your past visits to our website. You can opt out of personalized advertising by visiting the Google Ads or Meta Ad Settings.
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground pt-4">4. Contact Us</h2>
          <p>
            If you have questions regarding this policy or wish to have your data removed, please contact us at <strong>hello@theskitbit.com</strong>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}