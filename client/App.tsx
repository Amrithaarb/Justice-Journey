import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import { LanguageProvider } from "./lib/i18n";
import { Navigation } from "./components/Navigation";
import { LegalChatbot } from "./components/LegalChatbot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ScenarioSimulation } from "./pages/ScenarioSimulation";
import { AwarenessHub } from "./pages/AwarenessHub";
import { Results } from "./pages/Results";
import { GetStarted } from "./pages/GetStarted";
import { CreateAccount } from "./pages/CreateAccount";
import { Login } from "./pages/Login";
import { GuestLogin } from "./pages/GuestLogin";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/guest-login" element={<GuestLogin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scenarios" element={<ScenarioSimulation />} />
            <Route path="/awareness" element={<AwarenessHub />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <LegalChatbot />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
