import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const MercadoPagoButton = () => {
  const handlePayment = () => {
    window.open('https://link.mercadopago.com.ar/argentina44', '_blank');
  };

  return (
    <Button 
      onClick={handlePayment}
      size="lg" 
      className="w-full bg-accent hover:bg-accent-dark text-accent-foreground font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <CreditCard className="mr-2 h-5 w-5" />
      DONATIVO CON MERCADO PAGO
    </Button>
  );
};

export default MercadoPagoButton;
