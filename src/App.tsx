import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import FloatingDonationButton from "./components/FloatingDonationButton";

const queryClient = new QueryClient();

// Configuración de PayPal
const paypalOptions = {
  clientId: process.env.NODE_ENV === 'production' 
    ? 'AWI8959Buf8HLIorpyfPsu8v64GnMZZi4w4PXxi9jB7QDAU-HDQL0R3PvGcWHqGHa4NDdqVlROuLhvEo' // Client ID de producción
    : 'AfeO5GtQ-NCRVzUHF8DoyuEngpR7b3ce0jTrwrjH9UVqVSGCi02Is6Gz3D3Pl0Qi5GgUHF9kE4SWWfW0', // Client ID de sandbox para desarrollo
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
        <FloatingDonationButton />
      </TooltipProvider>
    </PayPalScriptProvider>
  </QueryClientProvider>
);

export default App;
