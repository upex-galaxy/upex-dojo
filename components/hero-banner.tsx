import Image from "next/image"
import Link from "next/link"

export function HeroBanner() {
  return (
    <div className="relative h-[600px] overflow-hidden" data-testid="hero-banner">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dojo_ninja-QHGSv5kXbupUH9njcNAm7UAYY39rof.webp"
        alt="Dojo Background"
        fill
        className="object-cover"
        priority
        data-testid="hero-background"
      />

      {/* Gradient overlay - works with both themes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background z-10" />

      <div className="relative z-20 container mx-auto px-4 py-20 text-center" data-testid="hero-content">
        {/* Main content */}
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400"
            data-testid="hero-title"
          >
            Welcome to UPEX DOJO
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-200" data-testid="hero-subtitle">
            Your Ultimate QA Automation Basic Training Ground
          </h2>

          {/* Description text - moved above the framework logos */}
          <p className="text-gray-300 max-w-3xl mx-auto mb-10" data-testid="hero-description">
            Select any component from our practice list below and test it with the framework of your choice—Playwright,
            Cypress, Selenium, and more. Strengthen your skills by exploring real-world testing scenarios within this
            virtual Dojo.
          </p>

          {/* Framework logos */}
          <div className="flex justify-center items-center gap-8 mb-8" data-testid="framework-logos">
            <Link
              href="https://docs.cypress.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              data-testid="framework-link"
            >
              <div
                className="relative w-16 h-16 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border-2 border-gray-800 p-[2px] transition-transform hover:scale-110"
                data-testid="framework-logo"
              >
                <div className="w-full h-full rounded-lg overflow-hidden bg-white/10 p-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-DeHKQR6zrjNrxmBijhIYF9pgPUoe6e.png"
                    alt="Cypress"
                    fill
                    className="object-contain scale-75"
                  />
                </div>
              </div>
            </Link>
            <Link
              href="https://playwright.dev/docs/getting-started-vscode"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              data-testid="framework-link"
            >
              <div
                className="relative w-16 h-16 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border-2 border-gray-800 p-[2px] transition-transform hover:scale-110"
                data-testid="framework-logo"
              >
                <div className="w-full h-full rounded-lg overflow-hidden bg-white/10 p-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/playwright_profile-0MyzvaC87RMY6zFrYyXX2V1cHFjKDt.png"
                    alt="Playwright"
                    fill
                    className="object-contain scale-75"
                  />
                </div>
              </div>
            </Link>
            <Link
              href="https://www.selenium.dev/documentation/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              data-testid="framework-link"
            >
              <div
                className="relative w-16 h-16 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border-2 border-gray-800 p-[2px] transition-transform hover:scale-110"
                data-testid="framework-logo"
              >
                <div className="w-full h-full rounded-lg overflow-hidden bg-white/10 p-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-94Orl1F184tPDqCzSzUQ3BbBQFIXkQ.png"
                    alt="Selenium"
                    fill
                    className="object-contain scale-75"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Call to action */}
          <div className="mt-4" data-testid="hero-cta">
            <Link
              href="#components-section"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium transition-transform hover:scale-105"
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
          </div>
        </div>
      </div>
    </div>
  )
}
