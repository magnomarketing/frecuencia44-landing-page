import React from 'react';
import { CheckCircle, X, Mail, Calendar, Video, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Success icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-3xl text-gray-900 mb-6">
            ¡Invitación Confirmada! 🎯
          </h3>

          {/* Invitation Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="text-left">
              <p className="text-lg text-blue-900 mb-4">
                <strong>Equipo Samuel Valdivia</strong> le está invitando a una reunión de Zoom programada.
              </p>
              
              <h4 className="text-xl font-bold text-blue-900 mb-4">
                Masterclass Frecuencia 44: ALQUIMIA DE PACTOS Y REALIDADES
              </h4>
              
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  Hora: 24 ago 2025 03:00 p. m. Buenos Aires, Georgetown
                </span>
              </div>
            </div>
          </div>

          {/* Zoom Meeting Details */}
          <div className="bg-white border-2 border-blue-300 rounded-xl p-6 mb-6 shadow-lg">
            <h5 className="font-bold text-lg text-gray-900 mb-4">📅 Detalles de la Reunión</h5>
            
            <div className="space-y-4 text-left">
              {/* Join Meeting Button */}
              <div className="text-center">
                <a 
                  href="https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <Video className="w-5 h-5" />
                  <span>Únase a la reunión de Zoom</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Meeting Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">ID de reunión:</span>
                  <span className="font-mono text-gray-900">825 1073 8233</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Código de acceso:</span>
                  <span className="font-mono text-gray-900">507559</span>
                </div>
              </div>

              {/* Zoom AI Companion Link */}
              <div className="text-center">
                <a 
                  href="https://us02web.zoom.us/launch/edl?muid=a5c5a19d-8ef5-4267-9483-98ce289317ee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <span>Ver información de la reunión con Zoom AI Companion</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-green-800 font-medium">
                  📧 <strong>¡Invitación enviada por email!</strong>
                </p>
                <p className="text-sm text-green-700 mt-1">
                  También hemos enviado esta invitación a tu correo electrónico para que puedas agregarla a tu calendario.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800">
              💡 <strong>Instrucciones:</strong> Haz clic en "Únase a la reunión de Zoom" cuando sea la hora del evento. 
              Te recomendamos conectarte 5 minutos antes para asegurar una experiencia fluida.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg"
            >
              ✅ Entendido, Gracias
            </Button>
            
            <Button
              onClick={() => {
                onClose();
                // Scroll to donation section
                const donationSection = document.getElementById('donativo');
                if (donationSection) {
                  donationSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg"
            >
              💙 Aportar un Granito de Arena
            </Button>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-4">
            Si no recibes el email en los próximos 5 minutos, revisa tu carpeta de spam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
