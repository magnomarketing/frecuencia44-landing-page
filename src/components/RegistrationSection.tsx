import { CheckCircle } from 'lucide-react';
import SuccessModal from './SuccessModal';

const RegistrationSection = () => {
  const benefits = [
    "Experiencia transformadora única",
    "Conexión con el Grupo Diamante",
    "Activación energética colectiva",
    "Material exclusivo del evento",
    "Acceso a comunidad privada",
    "Participación en la transformación de Argentina"
  ];

  return (
    <section id="registro" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Registro para la
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Master Class</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Al correo que registres recibirás el link de acceso por Zoom para conectarte a la MasterClass "Alquimia de Pactos y Lealtades" el Domingo 24 de agosto de 2025 a las 15:00 hrs (hora Argentina).<br />
            ⚡ Cupo virtual limitado a 1,000 personas. ¡Asegura tu lugar!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Benefits */}
          <div className="mb-12">
            <h3 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
              Lo que recibirás en la Masterclass del domingo 24 de Agosto a las 15 hrs
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-accent flex-shrink-0" size={20} />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form - Iframe */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-elegant p-6">
              <h3 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
                Master Class
              </h3>
              
              <iframe 
                width="540" 
                height="305" 
                src="https://f0e44c8a.sibforms.com/serve/MUIFAK905QvemTWEpPkAfAzcQViCckvl8GyR3my5cv7k4Iubk-XL4AdKuU-N8USlFqaHMJsT7pDp2uVHBlQrOooMS1IQXPbSaumtnempHJCokio2TjtPqUa6pNWieWC2D74IKFlf5uanvOqe1aNslOmLaYbfxXPP6cq-3rJxCTBpLP4lfiyNPfsxU7YLE71YzybkvRWfXDXXu_B-" 
                frameBorder="0" 
                allowFullScreen 
                style={{ 
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: '100%'
                }}
                title="Formulario de Registro - Masterclass Frecuencia 44"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;