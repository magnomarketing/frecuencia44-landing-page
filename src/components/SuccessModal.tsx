import React from 'react';
import { CheckCircle, X, Video, ExternalLink } from 'lucide-react';
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
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
            ¡Registro Exitoso! 🎯
          </h3>

          {/* Event Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4">
            <h4 className="text-lg font-bold text-blue-900 mb-2">
              Masterclass Frecuencia 44
            </h4>
            <p className="text-blue-800 text-sm">
              Domingo 24 de agosto, 15:00 (Argentina)
            </p>
          </div>

          {/* Zoom Details */}
          <div className="bg-white border border-blue-300 rounded-xl p-4 mb-4">
            <h5 className="font-bold text-gray-900 mb-3">📅 Detalles de Zoom</h5>
            
            <div className="space-y-3">
              {/* Join Button */}
              <div>
                <a 
                  href="https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  <Video className="w-4 h-4" />
                  <span>Unirse a Zoom</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Meeting Info */}
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-mono text-gray-900">825 1073 8233</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Código:</span>
                  <span className="font-mono text-gray-900">507559</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg"
            >
              ✅ Entendido
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
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 rounded-lg text-sm"
            >
              💙 Aportar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
