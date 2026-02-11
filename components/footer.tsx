import Link from "next/link"
import { ExternalLink, Github, Globe, MessageCircle } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 px-4 bg-background/90" data-testid="app-footer">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-6">
          <p className="text-lg text-foreground/80 mb-4" data-testid="footer-tagline">
            Experimenta el futuro de QA con nuestro revolucionario espacio de trabajo Galaxy
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-6" data-testid="footer-links">
          <Link
            href="https://www.upexgalaxy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center"
            data-testid="footer-link-web"
          >
            <Globe className="mr-1.5 h-4 w-4" />
            Web Oficial
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
          <Link
            href="https://github.com/upex-galaxy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center"
            data-testid="footer-link-github"
          >
            <Github className="mr-1.5 h-4 w-4" />
            Github
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
          <Link
            href="https://upexgalaxy.slack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center"
            data-testid="footer-link-community"
          >
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Comunidad
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="text-center text-sm text-foreground/50" data-testid="footer-copyright">
          © {currentYear} UPEX Quality LLC. | Todos los Derechos Reservados
        </div>
      </div>
    </footer>
  )
}
