import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Link } from "react-router-dom";
import { 
  Play, 
  BookOpen, 
  Award, 
  TrendingUp,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  Users,
  Brain,
  Smartphone,
  Shield,
  ShoppingBag,
  Zap,
  Trophy
} from "lucide-react";

// Mock user data
const userDashboard = {
  user: {
    name: "Alex Johnson",
    role: "Student",
    joinDate: "2024-01-15",
    streak: 7,
    level: "Intermediate Learner"
  },
  stats: {
    completedScenarios: 4,
    totalScenarios: 6,
    knowledgeScore: 78,
    timeSpent: 145, // minutes
    achievements: 3,
    correctAnswers: 15,
    totalAnswers: 20
  },
  recentActivity: [
    {
      type: "scenario",
      title: "Cyberbullying Situation", 
      score: 85,
      timeAgo: "2 hours ago",
      icon: Smartphone
    },
    {
      type: "achievement",
      title: "Perfect Justice Badge",
      timeAgo: "1 day ago",
      icon: Trophy
    },
    {
      type: "quiz",
      title: "Constitutional Rights Quiz",
      score: 92,
      timeAgo: "3 days ago", 
      icon: BookOpen
    }
  ],
  recommendedScenarios: [
    {
      id: "workplace-rights",
      title: "Workplace Harassment",
      difficulty: "Medium",
      category: "Employment Law",
      icon: Users,
      reason: "Build on your civil rights knowledge"
    },
    {
      id: "domestic-violence", 
      title: "Domestic Violence",
      difficulty: "Hard",
      category: "Family Law",
      icon: Shield,
      reason: "Advanced scenario for experienced learners"
    }
  ],
  weeklyGoals: {
    scenariosTarget: 2,
    scenariosCompleted: 1,
    minutesTarget: 60,
    minutesCompleted: 45
  }
};

export function Dashboard() {
  const { user, stats, recentActivity, recommendedScenarios, weeklyGoals } = userDashboard;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}! 
              </h1>
              <p className="text-gray-600 mt-2">
                Ready to continue your justice journey? You're on a {user.streak}-day streak! 🔥
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-justice-primary to-justice-secondary text-white px-4 py-2">
              {user.level}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.completedScenarios}/{stats.totalScenarios}</h3>
              <p className="text-gray-600">Scenarios Complete</p>
              <Progress value={(stats.completedScenarios / stats.totalScenarios) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.knowledgeScore}</h3>
              <p className="text-gray-600">Knowledge Score</p>
              <p className="text-sm text-green-600 mt-1">+12 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.achievements}</h3>
              <p className="text-gray-600">Achievements</p>
              <p className="text-sm text-purple-600 mt-1">2 more to unlock</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.timeSpent}min</h3>
              <p className="text-gray-600">Learning Time</p>
              <p className="text-sm text-orange-600 mt-1">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-justice-primary" />
                  Weekly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Complete Scenarios</span>
                    <span className="text-sm text-gray-600">
                      {weeklyGoals.scenariosCompleted}/{weeklyGoals.scenariosTarget}
                    </span>
                  </div>
                  <Progress 
                    value={(weeklyGoals.scenariosCompleted / weeklyGoals.scenariosTarget) * 100} 
                    className="h-3"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Learning Time</span>
                    <span className="text-sm text-gray-600">
                      {weeklyGoals.minutesCompleted}/{weeklyGoals.minutesTarget} min
                    </span>
                  </div>
                  <Progress 
                    value={(weeklyGoals.minutesCompleted / weeklyGoals.minutesTarget) * 100} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recommended Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-justice-primary" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendedScenarios.map((scenario) => {
                    const IconComponent = scenario.icon;
                    return (
                      <Card key={scenario.id} className="border-2 border-dashed border-gray-200 hover:border-justice-primary transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-justice-primary/10 rounded-lg">
                              <IconComponent className="h-5 w-5 text-justice-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{scenario.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{scenario.category}</p>
                              <p className="text-xs text-justice-primary mb-3">{scenario.reason}</p>
                              <Link to="/scenarios">
                                <Button size="sm" className="bg-justice-primary hover:bg-justice-primary/90">
                                  Start Scenario
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link to="/scenarios">
                    <Button className="w-full h-auto p-4 bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90">
                      <div className="text-center">
                        <Play className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">New Scenario</div>
                        <div className="text-xs opacity-90">Interactive learning</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/awareness">
                    <Button variant="outline" className="w-full h-auto p-4 border-justice-primary text-justice-primary hover:bg-justice-primary hover:text-white">
                      <div className="text-center">
                        <BookOpen className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">Study Resources</div>
                        <div className="text-xs opacity-70">Articles & guides</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/results">
                    <Button variant="outline" className="w-full h-auto p-4">
                      <div className="text-center">
                        <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">View Progress</div>
                        <div className="text-xs opacity-70">Track learning</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-justice-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-justice-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.timeAgo}</p>
                        {activity.score && (
                          <p className="text-xs text-justice-primary font-medium">Score: {activity.score}%</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Achievement Showcase */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <Star className="h-5 w-5 mr-2" />
                  Latest Achievement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-semibold text-yellow-900 mb-2">Perfect Justice</h3>
                <p className="text-sm text-yellow-800 mb-4">
                  You got 100% on a legal scenario! Your understanding of constitutional rights is excellent.
                </p>
                <Link to="/results">
                  <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white">
                    View All Achievements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Learning Tip */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Brain className="h-5 w-5 mr-2" />
                  Learning Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-800 mb-4">
                  Did you know? Taking breaks between scenarios helps improve retention. 
                  Try the "Pomodoro Technique" - 25 minutes of learning, then a 5-minute break!
                </p>
                <Link to="/awareness">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Learn More Tips
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
