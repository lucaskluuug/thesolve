import { Instagram, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="font-display text-2xl font-bold text-primary">THE SOLVE</span>
              <span className="font-display text-xs font-semibold text-muted-foreground ml-2">TSLV</span>
            </div>
            <p className="font-body text-muted-foreground max-w-md mb-6">
              Nutrição funcional e performance. Ciência, consistência e estilo de vida 
              funcional para quem quer viver com mais energia, foco e realização.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@thesolve.com.br" 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#produtos" className="font-body text-muted-foreground hover:text-accent transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#categorias" className="font-body text-muted-foreground hover:text-accent transition-colors">
                  Categorias
                </a>
              </li>
              <li>
                <a href="#sobre" className="font-body text-muted-foreground hover:text-accent transition-colors">
                  Sobre
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="font-body text-sm">contato@thesolve.com.br</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="font-body text-sm">Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Solve. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-accent transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-accent transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};