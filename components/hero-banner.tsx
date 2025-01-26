import Image from "next/image"
import Link from "next/link"

export function HeroBanner() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dojo_ninja-QHGSv5kXbupUH9njcNAm7UAYY39rof.webp"
        alt="Dojo Background"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background z-10" />

      <div className="relative z-20 container mx-auto px-4 py-20 text-center">
        {/* Main content */}
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
            Welcome to UPEX DOJO
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-200">
            Your Ultimate QA Automation Basic Training Ground
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            Select any component from our practice list below and test it with the framework of your choice—Playwright,
            Cypress, Selenium, and more. Strengthen your skills by exploring real-world testing scenarios within this
            virtual Dojo.
          </p>

          {/* Framework logos */}
          <div className="flex justify-center items-center gap-8">
            <Link href="https://docs.cypress.io/" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative w-16 h-16 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border-2 border-gray-800 p-[2px] transition-transform hover:scale-110">
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
            >
              <div className="relative w-16 h-16 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border-2 border-gray-800 p-[2px] transition-transform hover:scale-110">
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
            >
              <div className="relative w-16 h-16 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border-2 border-gray-800 p-[2px] transition-transform hover:scale-110">
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
        </div>

        {/* Subtle arrow indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

