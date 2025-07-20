import { Button } from "../components/ui/button";
import { ArrowRight, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoonFeatures: string[];
}

export function PlaceholderPage({ title, description, comingSoonFeatures }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-8">
            <Construction className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Coming Soon</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {comingSoonFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-left">
                  <div className="w-2 h-2 bg-justice-primary rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Button 
            size="lg"
            className="bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90"
          >
            Continue Building This Page
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Let me know if you'd like me to implement this page next!
          </p>
        </div>
      </div>
    </div>
  );
}
