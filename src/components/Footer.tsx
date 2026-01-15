import { Github, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/40 py-12 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold tracking-tighter">LAKSH</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Building AI systems that turn chaos into working products.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="mailto:contact@laksh.ai" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://github.com/laksh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://instagram.com/laksh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Laksh. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
