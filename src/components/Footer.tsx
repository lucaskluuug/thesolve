import { Instagram, Mail, MapPin } from "lucide-react";
import logoImg from "@/assets/logo-thesolve.png";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logoImg} alt="The Solve" className="h-8 mb-6 brightness-0 invert" />
            <p className="text-background/60 max-w-md mb-6 text-sm leading-relaxed">
              Nutrição funcional e performance. Ciência, consistência e estilo de vida
              funcional para quem quer viver com mais energia, foco e realização.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:contato@thesolve.com.br" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold text-background uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li><a href="#produtos" className="text-sm text-background/60 hover:text-background transition-colors">Produtos</a></li>
              <li><a href="#categorias" className="text-sm text-background/60 hover:text-background transition-colors">Categorias</a></li>
              <li><a href="#sobre" className="text-sm text-background/60 hover:text-background transition-colors">Sobre</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-background uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/60 text-sm">
                <Mail className="w-4 h-4" />
                contato@thesolve.com.br
              </li>
              <li className="flex items-center gap-2 text-background/60 text-sm">
                <MapPin className="w-4 h-4" />
                Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} The Solve. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">Política de Privacidade</a>
            <a href="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};