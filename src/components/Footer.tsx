const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#soluciones', label: 'Soluciones' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Lucky Intelligence</h3>
            <p className="text-primary-foreground/80 max-w-sm">
              25+ años entregando soluciones inteligentes de telecomunicaciones 
              con tecnología avanzada de IA.
            </p>
            <div className="text-primary-foreground/80">
              <a 
                href="mailto:contacto@luckyintelligence.com"
                className="hover:text-primary-foreground transition-colors"
              >
                contacto@luckyintelligence.com
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Navegación</h4>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios Principales</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div>LuckyNet Finder</div>
              <div>Lucky Dashboard</div>
              <div>Lucky Link Manager</div>
              <div>LuckyIntelligence IA</div>
              <div>Lucky Security Scan</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-foreground/80">
              © {currentYear} Lucky Intelligence. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center gap-6 text-primary-foreground/80">
              <span className="text-sm">Tecnología que conecta el futuro</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;