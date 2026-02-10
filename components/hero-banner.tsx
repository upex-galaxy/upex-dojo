import Image from "next/image"
import Link from "next/link"
import { auth } from "@/lib/auth"

async function HeroBannerAsync() {
  const session = await auth()
  const isAuthenticated = !!session?.user

  return (
    <div className="relative min-h-[650px] overflow-hidden" data-testid="hero-banner">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dojo_ninja-QHGSv5kXbupUH9njcNAm7UAYY39rof.webp"
        alt="Dojo Background"
        fill
        className="object-cover"
        priority
        data-testid="hero-background"
      />

      {/* Enhanced gradient overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-background z-10" />

      {/* Decorative blur elements */}
      <div className="absolute inset-0 overflow-hidden z-[5] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div
        className="relative z-20 container mx-auto px-4 py-20 md:py-28 text-center"
        data-testid="hero-content"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Title - Enhanced typography */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 leading-tight"
            data-testid="hero-title"
          >
            Welcome to UPEX DOJO
          </h1>

          {/* Subtitle - Better contrast and sizing */}
          <h2
            className="text-xl md:text-3xl font-medium mb-8 text-white/90 tracking-wide"
            data-testid="hero-subtitle"
          >
            Your Ultimate QA Automation Training Ground
          </h2>

          {/* Description - Improved readability */}
          <p
            className="text-gray-300/90 max-w-2xl mx-auto mb-12 text-lg leading-relaxed"
            data-testid="hero-description"
          >
            Master test automation with real-world UI components. Practice with Playwright,
            Cypress, Selenium, and your framework of choice in this virtual training dojo.
          </p>

          {/* Framework logos section - Enhanced styling */}
          <div className="mb-12" data-testid="framework-section">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-6 font-medium">
              Practice with your favorite tools
            </p>
            <div
              className="flex justify-center items-center gap-6 md:gap-8"
              data-testid="framework-logos"
            >
              {[
                {
                  href: "https://docs.cypress.io/",
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-DeHKQR6zrjNrxmBijhIYF9pgPUoe6e.png",
                  alt: "Cypress",
                },
                {
                  href: "https://playwright.dev/docs/getting-started-vscode",
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/playwright_profile-0MyzvaC87RMY6zFrYyXX2V1cHFjKDt.png",
                  alt: "Playwright",
                },
                {
                  href: "https://www.selenium.dev/documentation/",
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-94Orl1F184tPDqCzSzUQ3BbBQFIXkQ.png",
                  alt: "Selenium",
                },
              ].map((framework) => (
                <Link
                  key={framework.alt}
                  href={framework.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  data-testid={`framework-link-${framework.alt.toLowerCase()}`}
                >
                  <div
                    className="relative w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 group-hover:border-purple-500/50 group-hover:shadow-lg group-hover:shadow-purple-500/20"
                    data-testid={`framework-logo-${framework.alt.toLowerCase()}`}
                  >
                    <Image
                      src={framework.src}
                      alt={framework.alt}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    {framework.alt}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section - Conditional based on auth */}
          <div className="flex flex-col items-center" data-testid="hero-cta">
            {isAuthenticated ? (
              /* Authenticated: Show dual CTAs */
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="#components-section"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
                  data-testid="explore-components-button"
                >
                  Explore Components
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                  data-testid="go-to-dashboard-button"
                >
                  Go to Dashboard
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Link>
              </div>
            ) : (
              /* Not authenticated: Show login CTA */
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
                  data-testid="start-practicing-button"
                >
                  Start Practicing
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Link>
                <p className="text-sm text-gray-400 mt-6 max-w-md" data-testid="hero-features-text">
                  Practice <span className="text-purple-400 font-medium">Frontend Testing</span> with
                  Components{" "}
                  <span className="mx-2 text-gray-600">|</span>{" "}
                  <span className="text-cyan-400 font-medium">Backend Testing</span> with Task API
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </div>
  )
}

export function HeroBanner() {
  // @ts-expect-error Async Server Component
  return <HeroBannerAsync />
}
