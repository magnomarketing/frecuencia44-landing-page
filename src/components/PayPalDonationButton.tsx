import { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Heart, DollarSign } from 'lucide-react';

interface PayPalDonationButtonProps {
  className?: string;
}

const donationAmounts = [
  { value: 5, label: '$5 USD' },
  { value: 10, label: '$10 USD' },
  { value: 25, label: '$25 USD' },
  { value: 50, label: '$50 USD' },
  { value: 100, label: '$100 USD' },
  { value: 0, label: 'Personalizado' }
];

const PayPalDonationButton = ({ className = '' }: PayPalDonationButtonProps) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const { toast } = useToast();

  const handleAmountSelect = (amount: number) => {
    if (amount === 0) {
      setShowCustomInput(true);
      setSelectedAmount(0);
    } else {
      setShowCustomInput(false);
      setSelectedAmount(amount);
      setCustomAmount('');
    }
  };

  const getFinalAmount = () => {
    if (showCustomInput && customAmount) {
      const amount = parseFloat(customAmount);
      return isNaN(amount) || amount <= 0 ? 10 : amount;
    }
    return selectedAmount;
  };

  const createOrder = (data: any, actions: any) => {
    const amount = getFinalAmount();
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: 'USD'
          },
          description: `Donación voluntaria - Frecuencia 44 Masterclass`
        }
      ]
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const order = await actions.order.capture();
      const amount = getFinalAmount();
      
      toast({
        title: "¡Donación exitosa! 🎉",
        description: `Gracias por tu contribución de $${amount} USD. Tu apoyo es invaluable para nuestra misión de transformación.`,
      });

      console.log('Donación completada:', order);
      
      // Reset form
      setSelectedAmount(10);
      setCustomAmount('');
      setShowCustomInput(false);
      
    } catch (error) {
      console.error('Error en la donación:', error);
      toast({
        title: "Error en la donación",
        description: "Hubo un problema procesando tu donación. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  const onError = (err: any) => {
    console.error('Error de PayPal:', err);
    toast({
      title: "Error de PayPal",
      description: "Hubo un problema con PayPal. Por favor intenta nuevamente o usa otro método.",
      variant: "destructive",
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Amount Selection */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground text-center">
          Selecciona el monto de tu donación:
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {donationAmounts.map((option) => (
            <Button
              key={option.value}
              variant={selectedAmount === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleAmountSelect(option.value)}
              className="text-xs sm:text-sm"
            >
              <DollarSign className="mr-1" size={14} />
              {option.label}
            </Button>
          ))}
        </div>

        {/* Custom Amount Input */}
        {showCustomInput && (
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Ingresa el monto en USD"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              min="1"
              step="0.01"
            />
            <p className="text-xs text-muted-foreground text-center">
              Monto mínimo: $1 USD
            </p>
          </div>
        )}
      </div>

      {/* PayPal Button */}
      <div className="space-y-2">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Donación de ${getFinalAmount()} USD
          </p>
        </div>
        
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'pay'
          }}
          fundingSource="paypal"
          forceReRender={[selectedAmount, customAmount]}
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          <Heart className="inline mr-1" size={12} />
          Tu donación es completamente segura y voluntaria
        </p>
      </div>
    </div>
  );
};

export default PayPalDonationButton;
