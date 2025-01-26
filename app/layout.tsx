import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import localFont from 'next/font/local';
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

const geistSans = localFont({
	src: './fonts/CascadiaCode.woff2',
	variable: '--font-geist-sans',
	weight: '100 900'
});
const codeFont = localFont({
	src: './fonts/CascadiaCodeItalic.woff2',
	variable: '--font-geist-mono',
	weight: '100 900'
});

export const metadata = {
  title: "UPEX Dojo - QA Automation Practice Platform",
  description: "A platform for QA Automation Engineers to practice end-to-end testing. Select any component from our practice list below and test it with the framework of your choice—Playwright, Cypress, Selenium, and more. Strengthen your skills by exploring real-world testing scenarios within this virtual Dojo.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col ${geistSans.className} ${codeFont.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
              <div className="container max-w-7xl mx-auto">
                <MainNav />
              </div>
            </header>
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

