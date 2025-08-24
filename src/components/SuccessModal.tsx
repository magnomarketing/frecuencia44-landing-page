import React from 'react';
import { CheckCircle, X, Mail, Calendar, Video } from 'lucide-react';
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
      <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl transform transition-all">
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
          <h3 className="font-display font-bold text-3xl text-gray-900 mb-4">
            ¡Registro Confirmado! 🎯
          </h3>

          {/* Personalized message */}
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            {userName ? `¡Felicidades ${userName}!` : '¡Felicidades!'} Tu lugar está reservado para la <strong>Masterclass Frecuencia 44</strong>.
          </p>

          {/* Event details */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-blue-900 mb-4 text-lg">📅 Detalles del Evento</h4>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800"><strong>Fecha:</strong> Domingo 24 de agosto de 2025</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Video className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800"><strong>Hora:</strong> 15:00 (hora Argentina)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800"><strong>Plataforma:</strong> Zoom</span>
              </div>
            </div>
          </div>

          {/* Email notification */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-green-800 font-medium">
                  📧 <strong>¡Email enviado!</strong>
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Revisa tu correo electrónico. Te hemos enviado el enlace de Zoom y todos los detalles para unirte a la Masterclass.
                </p>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800">
              💡 <strong>Próximos pasos:</strong> Guarda la fecha en tu calendario y prepárate para una experiencia transformadora. ¡Nos vemos en la Masterclass!
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg"
            >
              ✅ ¡Perfecto, Entendido!
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
