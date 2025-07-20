import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { 
  ArrowRight, 
  ArrowLeft,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck
} from "lucide-react";

const guestFeatures = [
  {
    title: "Limited Scenarios",
    description: "Access to 2 basic scenarios",
    icon: CheckCircle,
    available: true
  },
  {
    title: "No Progress Tracking",
    description: "Can't save progress or earn achievements",
    icon: AlertTriangle,
    available: false
  },
  {
    title: "Basic Resources",
    description: "Access to awareness hub content",
    icon: CheckCircle,
    available: true
  },
  {
    title: "No Personalization",
    description: "Generic experience without customization",
    icon: AlertTriangle,
    available: false
  }
];

export function GuestLogin() {
  const { loginAsGuest } = useAuth();
  const [guestName, setGuestName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestLogin = async () => {
    setIsLoading(true);
    
    // Simulate guest login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to scenarios with guest mode
    window.location.href = "/scenarios?mode=guest";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Link to="/get-started" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Get Started
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Try as Guest</h1>
          <p className="text-gray-600">Explore Justice Journey with limited access - no account required</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Guest Login Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-justice-primary" />
                Guest Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="guestName" className="text-sm font-medium text-gray-900">
                  What should we call you? (Optional)
                </Label>
                <Input
                  id="guestName"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name or nickname"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This helps personalize your experience during this session
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Guest Session</h4>
                    <p className="text-sm text-blue-800">
                      Your session will last until you close your browser. 
                      Create an account to save your progress permanently.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGuestLogin}
                className="w-full bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Starting Guest Session...
                  </>
                ) : (
                  <>
                    Continue as Guest
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Want the full experience?{" "}
                  <Link to="/create-account" className="text-justice-primary hover:underline font-medium">
                    Create a free account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-justice-primary" />
                What's Available
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {guestFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <IconComponent className={`h-5 w-5 mt-0.5 ${
                      feature.available ? "text-green-500" : "text-orange-500"
                    }`} />
                    <div>
                      <h4 className={`font-medium ${
                        feature.available ? "text-gray-900" : "text-gray-500"
                      }`}>
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Create Account Benefits</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• All 6 scenarios available</li>
                  <li>• Save progress and achievements</li>
                  <li>• Personalized learning paths</li>
                  <li>• Track knowledge improvement</li>
                  <li>• Share results with educators</li>
                </ul>
                <Link to="/create-account">
                  <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                    Upgrade to Full Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Links */}
        <div className="mt-8 text-center">
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Already have an account?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/login">
                  <Button variant="outline" className="border-justice-primary text-justice-primary hover:bg-justice-primary hover:text-white">
                    Sign In to Account
                  </Button>
                </Link>
                <Link to="/create-account">
                  <Button className="bg-justice-primary hover:bg-justice-primary/90">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
