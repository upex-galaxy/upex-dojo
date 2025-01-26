import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="page-background/80 border-t border-[#1A2C5A] py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-300 mb-4">
            Experimenta el futuro de QA con nuestro revolucionario espacio de trabajo Galaxy
          </p>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mb-6">
          <Link
            href="https://upex.docu.upexgalaxy.com/wiki/external/NGM4MmRlNDQ3ZmU2NGIxNThjYzZjZWNiMWNkZjJhNzI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
          >
            Sobre Nosotros
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="https://upex.docu.upexgalaxy.com/wiki/external/MjYwZjFmYzNlMDJjNDgwY2JlODNiMzIxYTUyMTQ1MzA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
          >
            Política de Privacidad
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="https://www.upexgalaxy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
          >
            upexgalaxy.com
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="text-center text-sm text-gray-500">
          © 2025 UPEX Quality LLC. | Todos los Derechos Reservados
        </div>
      </div>
    </footer>
  )
}

