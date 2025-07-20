import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Award, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Target,
  BookOpen,
  Share2,
  Download,
  Repeat,
  ArrowRight,
  Scale,
  Users,
  Smartphone,
  ShoppingBag,
  Car,
  Home,
  Star,
  Calendar,
  Brain,
  Shield,
  Eye
} from "lucide-react";

// Mock data for demonstration
const userProgress = {
  totalScenarios: 6,
  completedScenarios: 4,
  correctDecisions: 15,
  totalDecisions: 20,
  learningStreak: 7,
  totalLearningTime: 145, // minutes
  knowledgeScore: 78,
  lastActivity: "2 hours ago"
};

const completedScenarios = [
  {
    id: "cyberbullying",
    title: "Cyberbullying Situation",
    completedAt: "2024-01-15",
    role: "Witness/Friend",
    score: 85,
    correctChoices: 4,
    totalChoices: 5,
    timeSpent: 12,
    icon: Smartphone,
    status: "excellent",
    keyLearning: "Learned about documentation requirements and proper reporting channels for cyberbullying incidents"
  },
  {
    id: "police-interaction",
    title: "Police Stop",
    completedAt: "2024-01-14", 
    role: "Civilian",
    score: 92,
    correctChoices: 6,
    totalChoices: 6,
    timeSpent: 18,
    icon: Shield,
    status: "perfect",
    keyLearning: "Mastered constitutional rights during police interactions and proper exercise of Miranda rights"
  },
  {
    id: "theft",
    title: "Shoplifting Incident",
    completedAt: "2024-01-12",
    role: "Authority Figure",
    score: 70,
    correctChoices: 3,
    totalChoices: 5,
    timeSpent: 15,
    icon: ShoppingBag,
    status: "good",
    keyLearning: "Understanding of juvenile justice process and alternative sentencing options"
  },
  {
    id: "traffic-violation",
    title: "Traffic Stop",
    completedAt: "2024-01-10",
    role: "Driver",
    score: 65,
    correctChoices: 3,
    totalChoices: 4,
    timeSpent: 8,
    icon: Car,
    status: "fair",
    keyLearning: "Basic traffic law compliance and interaction protocols with law enforcement"
  }
];

const achievements = [
  {
    id: "first-scenario",
    title: "First Steps",
    description: "Complete your first scenario",
    icon: "🎯",
    earned: true,
    earnedDate: "2024-01-10"
  },
  {
    id: "perfect-score",
    title: "Perfect Justice",
    description: "Get 100% on a scenario",
    icon: "⭐",
    earned: true,
    earnedDate: "2024-01-14"
  },
  {
    id: "streak-master",
    title: "Streak Master",
    description: "Complete scenarios 7 days in a row",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-15"
  },
  {
    id: "rights-expert",
    title: "Rights Expert",
    description: "Master all constitutional rights scenarios",
    icon: "📜",
    earned: false,
    progress: 75
  },
  {
    id: "knowledge-seeker",
    title: "Knowledge Seeker",
    description: "Complete 10 scenarios",
    icon: "📚",
    earned: false,
    progress: 40
  },
  {
    id: "mentor",
    title: "Community Mentor",
    description: "Help others by sharing results",
    icon: "👥",
    earned: false,
    progress: 0
  }
];

const learningInsights = [
  {
    category: "Constitutional Rights",
    scenarios: 2,
    averageScore: 88,
    improvement: "+12%",
    status: "excellent"
  },
  {
    category: "Cybercrime Law",
    scenarios: 1,
    averageScore: 85,
    improvement: "+8%",
    status: "excellent"
  },
  {
    category: "Juvenile Justice",
    scenarios: 1,
    averageScore: 70,
    improvement: "+5%",
    status: "good"
  },
  {
    category: "Traffic Law",
    scenarios: 1,
    averageScore: 65,
    improvement: "-2%",
    status: "needs-improvement"
  }
];

const detailedScenario = {
  title: "Cyberbullying Situation",
  role: "Witness/Friend",
  decisionPath: [
    {
      step: 1,
      situation: "Friend shows you cyberbullying messages",
      choice: "Advise documenting evidence and reporting to authorities",
      outcome: "Correct - Documentation is crucial for legal action",
      lawInvolved: "Anti-cyberbullying statutes require evidence for prosecution",
      correct: true
    },
    {
      step: 2,
      situation: "School asks for your statement",
      choice: "Provide honest, detailed account of what you witnessed",
      outcome: "Correct - Witness testimony strengthens the case",
      lawInvolved: "Witness cooperation is essential in harassment cases",
      correct: true
    },
    {
      step: 3,
      situation: "Bullies threaten retaliation",
      choice: "Report threats immediately to school and parents",
      outcome: "Correct - Additional threats can escalate charges",
      lawInvolved: "Retaliation against witnesses is a separate offense",
      correct: true
    },
    {
      step: 4,
      situation: "Friend wants to drop the case",
      choice: "Explain legal protections and support options available",
      outcome: "Correct - Victim support improves case outcomes",
      lawInvolved: "Victim advocacy programs provide legal protection",
      correct: true
    },
    {
      step: 5,
      situation: "Asked to testify in disciplinary hearing",
      choice: "Agree to testify but request support person present",
      outcome: "Partially correct - Could have also requested closed hearing",
      lawInvolved: "Student witnesses have rights to accommodations",
      correct: false
    }
  ]
};

export function Results() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [showDetailedPath, setShowDetailedPath] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      perfect: "bg-green-100 text-green-800",
      excellent: "bg-blue-100 text-blue-800", 
      good: "bg-yellow-100 text-yellow-800",
      fair: "bg-orange-100 text-orange-800",
      "needs-improvement": "bg-red-100 text-red-800"
    };
    return styles[status as keyof typeof styles] || styles.fair;
  };

  if (showDetailedPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowDetailedPath(false)}
              className="text-gray-600 hover:text-gray-900 mb-4"
            >
              ← Back to Results
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Decision Path Analysis</h1>
            <p className="text-lg text-gray-600">{detailedScenario.title} - {detailedScenario.role}</p>
          </div>

          <div className="space-y-6">
            {detailedScenario.decisionPath.map((step, index) => (
              <Card key={index} className={`border-l-4 ${step.correct ? 'border-l-green-500' : 'border-l-orange-500'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 ${
                        step.correct ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {step.step}
                      </div>
                      Step {step.step}
                    </CardTitle>
                    {step.correct ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Situation:</h4>
                    <p className="text-gray-700">{step.situation}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Your Choice:</h4>
                    <p className="text-gray-700">{step.choice}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Outcome:</h4>
                    <p className={step.correct ? "text-green-700" : "text-orange-700"}>{step.outcome}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                      <Scale className="h-4 w-4 mr-2 text-justice-primary" />
                      Legal Context:
                    </h4>
                    <p className="text-gray-700 text-sm">{step.lawInvolved}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-justice-primary/5">
            <CardHeader>
              <CardTitle className="text-xl text-justice-primary">Learning Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Takeaways:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Documentation is essential for cyberbullying cases</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Witness testimony strengthens legal proceedings</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Retaliation against witnesses is a separate offense</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Areas for Improvement:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <span>Learn about additional witness protections available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Learning Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your progress, review your decisions, and continue building your legal knowledge.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-justice-primary/10 rounded-full mb-4">
                <Target className="h-6 w-6 text-justice-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{userProgress.completedScenarios}/{userProgress.totalScenarios}</h3>
              <p className="text-gray-600">Scenarios Completed</p>
              <Progress value={(userProgress.completedScenarios / userProgress.totalScenarios) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{Math.round((userProgress.correctDecisions / userProgress.totalDecisions) * 100)}%</h3>
              <p className="text-gray-600">Decision Accuracy</p>
              <p className="text-sm text-gray-500 mt-1">{userProgress.correctDecisions}/{userProgress.totalDecisions} correct</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{userProgress.totalLearningTime}min</h3>
              <p className="text-gray-600">Learning Time</p>
              <p className="text-sm text-gray-500 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{userProgress.knowledgeScore}</h3>
              <p className="text-gray-600">Knowledge Score</p>
              <p className="text-sm text-green-600 mt-1">+12 this week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="scenarios" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Completed Scenarios */}
          <TabsContent value="scenarios" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Completed Scenarios</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Progress
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {completedScenarios.map((scenario) => {
                const IconComponent = scenario.icon;
                return (
                  <Card key={scenario.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-justice-primary/10 rounded-lg">
                            <IconComponent className="h-6 w-6 text-justice-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
                            <p className="text-gray-600">Role: {scenario.role}</p>
                            <p className="text-sm text-gray-500">Completed {scenario.completedAt}</p>
                          </div>
                        </div>
                        <Badge className={getStatusBadge(scenario.status)}>
                          {scenario.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(scenario.score)}`}>
                            {scenario.score}%
                          </div>
                          <p className="text-sm text-gray-600">Score</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {scenario.correctChoices}/{scenario.totalChoices}
                          </div>
                          <p className="text-sm text-gray-600">Correct Choices</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{scenario.timeSpent}min</div>
                          <p className="text-sm text-gray-600">Time Spent</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Learning:</h4>
                        <p className="text-gray-700 text-sm">{scenario.keyLearning}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowDetailedPath(true)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Decision Path
                        </Button>
                        <Link to="/scenarios">
                          <Button variant="outline" size="sm">
                            <Repeat className="h-4 w-4 mr-2" />
                            Retry Scenario
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Learning Progress */}
          <TabsContent value="progress" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-justice-primary" />
                    Knowledge Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningInsights.map((insight, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{insight.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getScoreColor(insight.averageScore)}`}>
                            {insight.averageScore}%
                          </span>
                          <span className={`text-xs ${insight.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {insight.improvement}
                          </span>
                        </div>
                      </div>
                      <Progress value={insight.averageScore} className="h-2" />
                      <p className="text-xs text-gray-500">{insight.scenarios} scenarios completed</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-justice-primary" />
                    Activity Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Cyberbullying Scenario</p>
                        <p className="text-xs text-gray-600">Completed 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Police Interaction Scenario</p>
                        <p className="text-xs text-gray-600">Completed yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Traffic Violation Scenario</p>
                        <p className="text-xs text-gray-600">Completed 5 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`${achievement.earned ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50'}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <div>
                        <Badge className="bg-yellow-100 text-yellow-800 mb-2">Earned</Badge>
                        <p className="text-xs text-gray-500">Earned on {achievement.earnedDate}</p>
                      </div>
                    ) : (
                      <div>
                        <Progress value={achievement.progress || 0} className="mb-2 h-2" />
                        <p className="text-xs text-gray-500">{achievement.progress || 0}% complete</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Learning Insights */}
          <TabsContent value="insights" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Learning Insights</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-justice-primary" />
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Strengths:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 text-sm">Constitutional rights knowledge</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 text-sm">Evidence documentation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 text-sm">Victim support protocols</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Areas for Growth:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="text-gray-700 text-sm">Traffic law specifics</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="text-gray-700 text-sm">Witness protection options</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-justice-primary" />
                    Recommended Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-justice-primary/5 rounded-lg">
                    <h4 className="font-semibold text-justice-primary mb-2">Domestic Violence Scenario</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Learn about protection orders and family law protections.
                    </p>
                    <Link to="/scenarios">
                      <Button size="sm" className="bg-justice-primary hover:bg-justice-primary/90">
                        Start Scenario
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">Workplace Rights Quiz</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Test your knowledge of employment law and workplace harassment.
                    </p>
                    <Link to="/awareness">
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                        Take Quiz
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
