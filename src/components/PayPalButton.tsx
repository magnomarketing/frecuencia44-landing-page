import { PayPalButtons } from '@paypal/react-paypal-js';
import { useToast } from '@/hooks/use-toast';

interface PayPalButtonProps {
  amount: number;
  description: string;
  className?: string;
}

const PayPalButton = ({ amount, description, className = '' }: PayPalButtonProps) => {
  const { toast } = useToast();

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: 'USD'
          },
          description: description
        }
      ]
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const order = await actions.order.capture();
      
      toast({
        title: "¡Donación exitosa! 🎉",
        description: `Gracias por tu contribución de $${amount} USD. Tu apoyo es invaluable para nuestra misión.`,
      });

      console.log('Donación completada:', order);
      
      // Aquí puedes agregar lógica adicional como enviar email de confirmación
      // o registrar la donación en tu base de datos
      
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
    <div className={className}>
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
      />
    </div>
  );
};

export default PayPalButton;
