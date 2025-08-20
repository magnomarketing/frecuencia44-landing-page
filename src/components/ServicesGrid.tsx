import ServiceCard from './ServiceCard';
import iconNetwork from '@/assets/icon-network.jpg';
import iconDashboard from '@/assets/icon-dashboard.jpg';
import iconAiChip from '@/assets/icon-ai-chip.jpg';
import iconCloud from '@/assets/icon-cloud.jpg';
import iconAiBrain from '@/assets/icon-ai-brain.jpg';
import iconSecurity from '@/assets/icon-security.jpg';

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      icon: iconNetwork,
      title: "LuckyNet Finder",
      description: "Herramienta avanzada con IA que accede de forma instantánea a la red más grande de telecomunicaciones en México. Analiza en tiempo real la cobertura de más de 300 proveedores. Optimiza búsqueda de conectividad y obtén las mejores opciones disponibles en cada zona simplificando el proceso de búsqueda y contratación obteniendo los mejores precios así como los mejores tiempos de entrega."
    },
    {
      id: 2,
      icon: iconDashboard,
      title: "Lucky Dashboard",
      description: "Ofrecemos visibilidad completa sobre demanda, cobertura y tendencias de mercado. Proporcionamos insights estratégicos para que los distribuidores optimicen su oferta comercial y aumenten su rentabilidad."
    },
    {
      id: 3,
      icon: iconAiChip,
      title: "Lucky Link Manager",
      description: "Monitoreo y gestión de redes telecom. Supervisar elementos de red, recibir alertas, garantizar sincronización NTP, gestionar autenticación y registros (TACACS), realizar respaldos diarios, analizar tráfico con NetFlow, y monitorear desempeño con sondas. Todo desde un único panel de control, con microservicios llave en mano."
    },
    {
      id: 4,
      icon: iconCloud,
      title: "Lucky Ancolo",
      description: "Servicios de Colocación Flexibles y con Capa 2 donde ofrecemos servicios de colocation y virtualización de infraestructura junto con nuestro socio global Equinix, permitiendo acceso flexible a racks individuales o completos según la necesidad del cliente."
    },
    {
      id: 5,
      icon: iconAiBrain,
      title: "LuckyIntelligence IA",
      description: "Plataforma de inteligencia artificial avanzada que optimiza la gestión de telecomunicaciones mediante análisis predictivo, automatización inteligente de procesos de red, y toma de decisiones autónoma. Utiliza machine learning para predecir fallas, optimizar rendimiento y mejorar la eficiencia operativa de infraestructuras de telecomunicaciones."
    },
    {
      id: 6,
      icon: iconSecurity,
      title: "Lucky Security Scan",
      description: "Lucky Security Scan es una solución avanzada de ciberseguridad que analiza proactivamente los sistemas y redes de tu empresa, identificando vulnerabilidades en tiempo real. Mediante tecnología inteligente, evalúa continuamente el estado de seguridad de tus sistemas, servidores, enlaces dedicados y dispositivos conectados, alertándote sobre riesgos potenciales y ofreciendo recomendaciones claras para mitigarlos."
    }
  ];

  return (
    <section id="servicios" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nuestros <span className="text-gradient">Servicios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones integrales de telecomunicaciones potenciadas por inteligencia artificial
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;