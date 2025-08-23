import React from 'react';
import { CheckCircle, X } from 'lucide-react';
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
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
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
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
            ¡Registro Exitoso!
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {userName ? `¡Felicidades ${userName}!` : '¡Felicidades!'} Tu registro se ha completado con éxito.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              📧 <strong>Revisa tu correo electrónico</strong><br />
              Te enviaremos el dia de mañana temprano el enlace de Zoom para la Masterclass del 24 de agosto. No es necesario que te registres nuevamente.
            </p>
          </div>

          {/* Action button */}
          <Button
            onClick={onClose}
            className="w-full bg-accent hover:bg-accent-dark text-accent-foreground font-semibold py-3"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
