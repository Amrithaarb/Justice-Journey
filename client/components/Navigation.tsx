import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Scale, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../lib/auth";
import { useLanguage } from "../lib/i18n";
import { LanguageSelector, LanguageSelectorMobile } from "./LanguageSelector";

export function Navigation() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t('nav.home') },
    { href: "/awareness", label: t('nav.awareness') },
    { href: "/scenarios", label: t('nav.scenarios') },
    { href: "/results", label: t('nav.results') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-justice-primary to-justice-secondary bg-clip-text text-transparent">
              <p>Justice Journey</p>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-justice-primary bg-justice-primary/10"
                    : "text-gray-600 hover:text-justice-primary hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn && (
              <Link to="/profile">
                <Button 
                  variant="ghost"
                  size="sm" 
                  className="text-gray-600 hover:text-justice-primary"
                >
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Button>
              </Link>
            )}
            <Link to="/get-started">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-justice-primary bg-justice-primary/10"
                      : "text-gray-600 hover:text-justice-primary hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn && (
                <Link to="/profile">
                  <Button 
                    variant="ghost"
                    size="sm" 
                    className="w-full mt-2 justify-start text-gray-600 hover:text-justice-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              )}
              <Link to="/get-started">
                <Button 
                  size="sm" 
                  className="w-full mt-2 bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
