import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Tools from "./pages/tools/Tools";
import SafetyClass from "./pages/tools/SafetyClass";
import AIReadiness from "./pages/tools/AIReadiness";
import HipaaCloud from "./pages/tools/HipaaCloud";
import Templates from "./pages/tools/Templates";
import ClearanceRoadmap from "./pages/tools/ClearanceRoadmap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/iec-62304-safety-class" element={<SafetyClass />} />
          <Route path="/tools/ai-ml-readiness" element={<AIReadiness />} />
          <Route path="/tools/hipaa-cloud-checklist" element={<HipaaCloud />} />
          <Route path="/tools/templates" element={<Templates />} />
          <Route path="/tools/code-to-clearance" element={<ClearanceRoadmap />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
