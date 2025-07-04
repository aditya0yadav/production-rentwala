import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { HomePageDesktop } from "./screens/HomePageDesktop";
import { PropertiesPage } from "./screens/PropertiesPage";
import { AboutPage } from "./screens/AboutPage";
import { ServicesPage } from "./screens/ServicesPage";
import { ContactPage } from "./screens/ContactPage";
import { TermsPage } from "./screens/TermsPage";
import { AdminPage } from "./screens/AdminPage";
import { PropertyDetailPage } from "./screens/PropertyDetailPage";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<HomePageDesktop />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;