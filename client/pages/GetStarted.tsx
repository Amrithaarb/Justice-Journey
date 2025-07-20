import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Target, 
  BookOpen,
  Shield,
  Clock,
  Star,
  Lightbulb,
  Award,
  Play,
  UserPlus,
  LogIn
} from "lucide-react";

const learningPaths = [
  {
    id: "student",
    title: "Student Path",
    description: "Perfect for high school and college students learning about legal rights",
    icon: BookOpen,
    duration: "2-3 hours",
    scenarios: 4,
    difficulty: "Beginner",
    features: [
      "Campus safety scenarios",
      "Digital rights awareness", 
      "Student conduct codes",
      "Basic constitutional rights"
    ],
    color: "bg-blue-500"
  },
  {
    id: "youth",
    title: "Youth Advocate",
    description: "For young adults and community advocates working with underserved populations",
    icon: Users,
    duration: "4-5 hours",
    scenarios: 6,
    difficulty: "Intermediate", 
    features: [
      "Juvenile justice system",
      "Community outreach knowledge",
      "Crisis intervention basics",
      "Victim support protocols"
    ],
    color: "bg-green-500"
  },
  {
    id: "professional",
    title: "Legal Professional",
    description: "For educators, social workers, and legal aid professionals",
    icon: Shield,
    duration: "6-8 hours",
    scenarios: 8,
    difficulty: "Advanced",
    features: [
      "Complex legal scenarios",
      "Professional ethics",
      "Documentation requirements",
      "Multi-jurisdictional issues"
    ],
    color: "bg-purple-500"
  }
];

const benefits = [
  {
    icon: Target,
    title: "Interactive Learning",
    description: "Learn through real-world scenarios and decision-making exercises"
  },
  {
    icon: Award,
    title: "Track Progress",
    description: "Earn achievements and monitor your legal knowledge growth"
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Help build safer, more informed communities"
  },
  {
    icon: Lightbulb,
    title: "Expert Insights",
    description: "Access legal expertise translated into understandable guidance"
  }
];

export function GetStarted() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-justice-primary/5 via-white to-justice-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Begin Your Justice Journey!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              You've selected the <strong>{learningPaths.find(p => p.id === selectedPath)?.title}</strong>. 
              Create your account to start learning and track your progress.
            </p>
          </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <UserPlus className="h-10 w-10 text-justice-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Create Account</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Full access to all scenarios, progress tracking, and achievements.
                </p>
                <Link to="/create-account" state={{ selectedPath }}>
                  <Button size="sm" className="w-full bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90">
                    Create Free Account
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-justice-primary">
              <CardContent className="p-6">
                <User className="h-10 w-10 text-justice-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Try as Guest</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Quick access to limited scenarios - no account required.
                </p>
                <Link to="/guest-login" state={{ selectedPath }}>
                  <Button size="sm" variant="outline" className="w-full border-justice-primary text-justice-primary hover:bg-justice-primary hover:text-white">
                    Continue as Guest
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <LogIn className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sign In</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Welcome back! Continue your learning journey.
                </p>
                <Link to="/login" state={{ selectedPath }}>
                  <Button size="sm" variant="outline" className="w-full">
                    Sign In to Account
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep(1)}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Choose a Different Path
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-justice-primary/5 via-white to-justice-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
            Start Your Justice Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose your learning path based on your role and goals. Each path is designed 
            to provide relevant legal knowledge for your specific needs and community.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Self-paced learning</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              <span>Expert-reviewed content</span>
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              <span>Track achievements</span>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-justice-primary/10 rounded-full mb-4">
                    <IconComponent className="h-6 w-6 text-justice-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Paths */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Choose Your Learning Path
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => {
              const IconComponent = path.icon;
              const isSelected = selectedPath === path.id;
              
              return (
                <Card 
                  key={path.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-xl ${
                    isSelected ? "ring-2 ring-justice-primary shadow-lg scale-105" : "hover:scale-102"
                  }`}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 ${path.color} rounded-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {path.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{path.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{path.duration}</span>
                      <span>{path.scenarios} scenarios</span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">What you'll learn:</h4>
                      <ul className="space-y-1">
                        {path.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {isSelected && (
                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentStep(2);
                        }}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start This Path
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-justice-primary to-justice-secondary text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of learners building stronger, more informed communities through legal education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-justice-primary hover:bg-gray-100"
                onClick={() => setSelectedPath('student')}
              >
                Quick Start - Student Path
              </Button>
              <Link to="/awareness">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-justice-primary"
                >
                  Explore Resources First
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
