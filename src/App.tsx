import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LotIQProvider } from "@/contexts/LotIQContext";

import Splash from "@/pages/lotiq/Splash";
import Login from "@/pages/lotiq/Login";
import ForgotPassword from "@/pages/lotiq/ForgotPassword";
import VerificationLink from "@/pages/lotiq/VerificationLink";
import SetPassword from "@/pages/lotiq/SetPassword";
import PasswordChanged from "@/pages/lotiq/PasswordChanged";
import Signup from "@/pages/lotiq/Signup";
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
import AuthorizedParkers from "@/pages/lotiq/AuthorizedParkers";
import InviteParker from "@/pages/lotiq/InviteParker";
import ParkerDetail from "@/pages/lotiq/ParkerDetail";
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
import NotificationFeed from "@/pages/lotiq/NotificationFeed";
import SlipFallAnalysis from "@/pages/lotiq/SlipFallAnalysis";
import AddNotificationPerson from "@/pages/lotiq/AddNotificationPerson";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LotIQProvider>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forgot-password/verify" element={<VerificationLink />} />
              <Route path="/forgot-password/set-password" element={<SetPassword />} />
              <Route path="/forgot-password/success" element={<PasswordChanged />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
              <Route path="/property/:id/parkers" element={<AuthorizedParkers />} />
              <Route path="/property/:id/parkers/invite" element={<InviteParker />} />
              <Route path="/property/:id/parkers/:parkerId" element={<ParkerDetail />} />
              <Route path="/property/:id/billing" element={<Billing />} />
              <Route path="/property/:id/billing/invoices" element={<Invoices />} />
              <Route path="/property/:id/billing/invoices/:invoiceId" element={<InvoiceDetail />} />
              <Route path="/property/:id/billing/payment" element={<PaymentMethod />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/settings/terms" element={<TermsConditions />} />
              <Route path="/settings/privacy" element={<PrivacyPolicy />} />
              <Route path="/settings/help" element={<HelpSupport />} />
              <Route path="/settings/password" element={<ChangePassword />} />
              <Route path="/notifications" element={<NotificationFeed />} />
              <Route path="/property/:id/notifications" element={<Notifications />} />
              <Route path="/property/:id/notifications/add" element={<AddNotificationPerson />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LotIQProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
