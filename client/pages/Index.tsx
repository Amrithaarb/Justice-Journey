import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";
import {
  Scale,
  Users,
  BookOpen,
  Shield,
  ArrowRight,
  Play,
  Target,
  Lightbulb,
  Award
} from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { VoiceReader } from "../components/VoiceReader";

export default function Index() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-justice-primary/5 via-white to-justice-secondary/5">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center lg:text-left lg:col-span-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="block">Know Your</span>
                <span className="block bg-gradient-to-r from-justice-primary to-justice-secondary bg-clip-text text-transparent">
                  Legal Rights
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                Justice Journey empowers youth and communities with interactive legal education. 
                Learn about your rights, understand consequences, and navigate legal situations 
                with confidence through engaging scenarios and expert guidance.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Link to="/scenarios">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90 text-lg px-8 py-3"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/awareness">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto border-justice-primary text-justice-primary hover:bg-justice-primary hover:text-white text-lg px-8 py-3"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-lg transform rotate-6 opacity-20"></div>
                <Card className="relative bg-white/80 backdrop-blur-sm border-2 border-justice-primary/20">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full">
                        <Scale className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Interactive Learning</h3>
                        <p className="text-gray-600">Choose your path, learn from outcomes</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-justice-success rounded-full"></div>
                        <span className="text-gray-700">Real-world legal scenarios</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-justice-warning rounded-full"></div>
                        <span className="text-gray-700">Expert legal explanations</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-justice-primary rounded-full"></div>
                        <span className="text-gray-700">Track your progress</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Empower Yourself with Legal Knowledge
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              From understanding your rights during police interactions to learning about 
              cyberbullying laws, we make legal education accessible and engaging.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Scenario Simulation</h3>
                <p className="text-gray-600">
                  Step into real-world situations and see how your choices affect legal outcomes. 
                  Learn through interactive decision-making.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-6">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Awareness Hub</h3>
                <p className="text-gray-600">
                  Access simplified legal articles, myth-busting content, and essential 
                  information about your rights and responsibilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your learning journey, review past decisions, and build your 
                  legal knowledge systematically.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                Our Mission: Justice for All
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We believe that everyone deserves to understand their legal rights and the 
                consequences of their actions. Justice Journey makes legal education accessible, 
                especially for youth and underserved communities who need it most.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-justice-primary mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Focused</h3>
                    <p className="text-gray-600">Designed specifically for youth and underserved communities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-justice-primary mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Educational Excellence</h3>
                    <p className="text-gray-600">Expert-reviewed content in simple, understandable language</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Shield className="h-6 w-6 text-justice-primary mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Rights Protection</h3>
                    <p className="text-gray-600">Empowering people to know and exercise their legal rights</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-lg transform -rotate-6 opacity-20"></div>
                <div className="relative bg-white rounded-lg shadow-2xl p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-6">
                      <Scale className="h-10 w-10 text-white" />
                    </div>
                    <blockquote className="text-lg text-gray-700 italic mb-4">
                      "Knowledge of the law is essential for justice. When people understand 
                      their rights, they can better protect themselves and their communities."
                    </blockquote>
                    <p className="font-semibold text-gray-900">Justice Journey Team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-justice-primary to-justice-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Start Your Legal Education Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of learners who are building their legal knowledge and 
            protecting their rights through Justice Journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scenarios">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto bg-white text-justice-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                Explore Scenarios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/awareness">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-justice-primary text-lg px-8 py-3"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Learn Your Rights
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
