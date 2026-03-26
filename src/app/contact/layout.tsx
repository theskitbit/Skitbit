export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}