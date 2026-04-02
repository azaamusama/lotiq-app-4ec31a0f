import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LotIQProvider } from "@/contexts/LotIQContext";

import Login from "@/pages/lotiq/Login";
import Dashboard from "@/pages/lotiq/Dashboard";
import Incidents from "@/pages/lotiq/Incidents";
import TowManagement from "@/pages/lotiq/TowManagement";
import Rules from "@/pages/lotiq/Rules";
import People from "@/pages/lotiq/People";
import Vehicles from "@/pages/lotiq/Vehicles";
import Cameras from "@/pages/lotiq/Cameras";
import PropertySetup from "@/pages/lotiq/PropertySetup";
import Properties from "@/pages/lotiq/Properties";
import Pricing from "@/pages/lotiq/Pricing";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LotIQProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/incidents/:id" element={<Incidents />} />
            <Route path="/towing" element={<TowManagement />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/people" element={<People />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/property" element={<Properties />} />
            <Route path="/property/setup" element={<PropertySetup />} />
            <Route path="/property/:id" element={<PropertySetup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LotIQProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
