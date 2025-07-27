import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Check, Globe, ChevronDown } from "lucide-react";
import { useLanguage, languages, Language } from "../lib/i18n";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[120px]"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm">{currentLanguage?.nativeName}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full mt-2 right-0 z-50 w-64 max-h-80 overflow-y-auto shadow-lg">
            <CardContent className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-2 border-b">
                {t("nav.language")}
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors ${
                    language === lang.code
                      ? "bg-justice-primary/10 text-justice-primary"
                      : ""
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-xs text-gray-500">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <Check className="h-4 w-4 text-justice-primary" />
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export function LanguageSelectorMobile() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-500 px-3">
        {t("nav.language")}
      </div>
      <div className="grid grid-cols-2 gap-2 px-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex flex-col items-center p-3 text-xs rounded-lg border transition-colors ${
              language === lang.code
                ? "border-justice-primary bg-justice-primary/10 text-justice-primary"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="font-medium">{lang.nativeName}</span>
            <span className="text-gray-500">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
