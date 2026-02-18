import { Instagram, Mail, MapPin } from "lucide-react";
import logoImg from "@/assets/logo-thesolve.png";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      {/* CTA Banner */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4">
            Comece sua jornada hoje
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Nutrição funcional que cabe na sua rotina. Uma dose por dia para
            energia, foco e bem-estar.
          </p>
          <a
            href="#produtos"
            className="inline-flex items-center gap-2 bg-background text-foreground font-bold px-8 py-3 rounded-full hover:bg-background/90 transition-colors"
          >
            Comprar agora
          </a>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <img
              src={logoImg}
              alt="The Solve"
              className="h-8 mb-6 brightness-0 invert"
            />
            <p className="text-background/50 max-w-md text-sm leading-relaxed">
              Existimos para transformar saúde e bem-estar com fórmulas
              inteligentes que unem ciência e estratégia funcional — para que
              cada pessoa escolha como quer se sentir, todos os dias.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-background uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#produtos"
                  className="text-sm text-background/50 hover:text-background transition-colors"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  className="text-sm text-background/50 hover:text-background transition-colors"
                >
                  Benefícios
                </a>
              </li>
              <li>
                <a
                  href="#ingredientes"
                  className="text-sm text-background/50 hover:text-background transition-colors"
                >
                  Ingredientes
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="text-sm text-background/50 hover:text-background transition-colors"
                >
                  Sobre
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-background uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/50 text-sm">
                <Mail className="w-4 h-4" />
                contato@thesolve.com.br
              </li>
              <li className="flex items-center gap-2 text-background/50 text-sm">
                <MapPin className="w-4 h-4" />
                Brasil
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/50 hover:text-background hover:border-background/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} The Solve. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-background/30 hover:text-background/50 transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-xs text-background/30 hover:text-background/50 transition-colors"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
