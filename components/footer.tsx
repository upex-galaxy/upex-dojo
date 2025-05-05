import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 bg-background/90" data-testid="app-footer">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-6">
          <p className="text-lg text-foreground/80 mb-4" data-testid="footer-tagline">
            Experimenta el futuro de QA con nuestro revolucionario espacio de trabajo Galaxy
          </p>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mb-6" data-testid="footer-links">
          <Link
            href="https://upex.docu.upexgalaxy.com/wiki/external/NGM4MmRlNDQ3ZmU2NGIxNThjYzZjZWNiMWNkZjJhNzI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center"
            data-testid="footer-link"
          >
            Sobre Nosotros
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="https://upex.docu.upexgalaxy.com/wiki/external/MjYwZjFmYzNlMDJjNDgwY2JlODNiMzIxYTUyMTQ1MzA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center"
            data-testid="footer-link"
          >
            Política de Privacidad
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="https://www.upexgalaxy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center"
            data-testid="footer-link"
          >
            upexgalaxy.com
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="text-center text-sm text-foreground/50" data-testid="footer-copyright">
          © 2025 UPEX Quality LLC. | Todos los Derechos Reservados
        </div>
      </div>
    </footer>
  )
}
