import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Configuración de PayPal
const paypalOptions = {
  clientId: process.env.NODE_ENV === 'production' 
    ? 'ATGFv2fAp2mEKDjQktr-tAzKx-r7N8jOkmaCCvqFXYVI589Z4lu4Nx005khcivb51bCn8UBFVxJN9W1W' // Client ID de producción
    : 'AZ5sLcMXbp1xOS54Hwk_suEgYxX6bqox6IsepXt8XOG9yqvRhofv89i_4mexkxUiYgT0TLxxfQZrHyGb, // Client ID de sandbox para desarrollo
  currency: 'USD',
  intent: 'capture',
  components: 'buttons',
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PayPalScriptProvider options={paypalOptions}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter 
          basename=""
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ScrollToTop />
      </TooltipProvider>
    </PayPalScriptProvider>
  </QueryClientProvider>
);

export default App;
