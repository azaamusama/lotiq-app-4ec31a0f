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
import CameraDetail from "@/pages/lotiq/CameraDetail";
import PropertySetup from "@/pages/lotiq/PropertySetup";
import Properties from "@/pages/lotiq/Properties";
import AddProperty from "@/pages/lotiq/AddProperty";
import PropertyDetail from "@/pages/lotiq/PropertyDetail";
import Pricing from "@/pages/lotiq/Pricing";
import MonitoringRules from "@/pages/lotiq/MonitoringRules";
import Billing from "@/pages/lotiq/Billing";
import Invoices from "@/pages/lotiq/Invoices";
import InvoiceDetail from "@/pages/lotiq/InvoiceDetail";
import PaymentMethod from "@/pages/lotiq/PaymentMethod";
import Settings from "@/pages/lotiq/Settings";
import TermsConditions from "@/pages/lotiq/TermsConditions";
import PrivacyPolicy from "@/pages/lotiq/PrivacyPolicy";
import HelpSupport from "@/pages/lotiq/HelpSupport";
import ChangePassword from "@/pages/lotiq/ChangePassword";
import Notifications from "@/pages/lotiq/Notifications";
import SlipFallAnalysis from "@/pages/lotiq/SlipFallAnalysis";
import AddNotificationPerson from "@/pages/lotiq/AddNotificationPerson";
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
            <Route path="/rules" element={<Settings />} />
            <Route path="/people" element={<People />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/cameras/:id" element={<CameraDetail />} />
            <Route path="/property" element={<Properties />} />
            <Route path="/property/add" element={<AddProperty />} />
            <Route path="/property/setup" element={<PropertySetup />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/property/:id/slip-fall" element={<SlipFallAnalysis />} />
            <Route path="/property/:id/monitoring" element={<MonitoringRules />} />
            <Route path="/property/:id/billing" element={<Billing />} />
            <Route path="/property/:id/billing/invoices" element={<Invoices />} />
            <Route path="/property/:id/billing/invoices/:invoiceId" element={<InvoiceDetail />} />
            <Route path="/property/:id/billing/payment" element={<PaymentMethod />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/settings/terms" element={<TermsConditions />} />
            <Route path="/settings/privacy" element={<PrivacyPolicy />} />
            <Route path="/settings/help" element={<HelpSupport />} />
            <Route path="/settings/password" element={<ChangePassword />} />
            <Route path="/settings/notifications" element={<Notifications />} />
            <Route path="/settings/notifications/add" element={<AddNotificationPerson />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LotIQProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
