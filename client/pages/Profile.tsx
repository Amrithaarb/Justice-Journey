import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Shield, 
  Bell,
  Download,
  Award,
  BarChart3,
  Edit3,
  Save,
  X,
  CheckCircle,
  Clock,
  Target,
  BookOpen
} from "lucide-react";

// Mock user data
const userData = {
  firstName: "Alex",
  lastName: "Johnson", 
  email: "alex.johnson@email.com",
  role: "Student",
  organization: "Central High School",
  ageRange: "16-18",
  joinDate: "2024-01-15",
  lastActive: "2 hours ago",
  learningPath: "Student Path",
  completedScenarios: 4,
  totalScenarios: 6,
  knowledgeScore: 78,
  streak: 7,
  achievements: 3,
  preferences: {
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    reminders: true
  }
};

const recentActivity = [
  {
    type: "scenario",
    title: "Cyberbullying Situation",
    date: "2 hours ago",
    score: 85,
    icon: CheckCircle
  },
  {
    type: "achievement",
    title: "Earned 'Perfect Justice' badge",
    date: "1 day ago",
    icon: Award
  },
  {
    type: "quiz",
    title: "Constitutional Rights Quiz",
    date: "3 days ago",
    score: 92,
    icon: BookOpen
  }
];

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleSave = () => {
    // Save logic here
    console.log("Saving profile data:", editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Details</h1>
              <p className="text-gray-600 mt-2">Manage your profile and learning preferences</p>
            </div>
            <div className="flex space-x-3">
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-justice-primary text-justice-primary hover:bg-justice-primary hover:text-white"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSave}
                    className="bg-justice-primary hover:bg-justice-primary/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-4 mx-auto">
                  <User className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-xl">
                  {userData.firstName} {userData.lastName}
                </CardTitle>
                <Badge className="bg-justice-primary/10 text-justice-primary">
                  {userData.role}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-sm text-gray-600">
                  <p>Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
                  <p>Last active: {userData.lastActive}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-justice-primary">{userData.completedScenarios}</div>
                    <div className="text-xs text-gray-600">Scenarios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-justice-primary">{userData.knowledgeScore}</div>
                    <div className="text-xs text-gray-600">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-justice-primary">{userData.streak}</div>
                    <div className="text-xs text-gray-600">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-justice-primary">{userData.achievements}</div>
                    <div className="text-xs text-gray-600">Achievements</div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Link to="/scenarios">
                    <Button size="sm" className="w-full bg-justice-primary hover:bg-justice-primary/90">
                      Continue Learning
                    </Button>
                  </Link>
                  <Link to="/results">
                    <Button size="sm" variant="outline" className="w-full">
                      View Progress
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-justice-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-justice-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.date}</p>
                        {activity.score && (
                          <p className="text-xs text-justice-primary font-medium">Score: {activity.score}%</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="data">Data & Privacy</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={editedData.firstName}
                          onChange={(e) => setEditedData({...editedData, firstName: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editedData.lastName}
                          onChange={(e) => setEditedData({...editedData, lastName: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          value={editedData.email}
                          onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          value={editedData.role}
                          onChange={(e) => setEditedData({...editedData, role: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-justice-primary focus:border-justice-primary disabled:bg-gray-100"
                        >
                          <option value="Student">Student</option>
                          <option value="Educator">Educator</option>
                          <option value="Youth Advocate">Youth Advocate</option>
                          <option value="Legal Professional">Legal Professional</option>
                          <option value="Community Member">Community Member</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="ageRange">Age Range</Label>
                        <select
                          id="ageRange"
                          value={editedData.ageRange}
                          onChange={(e) => setEditedData({...editedData, ageRange: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-justice-primary focus:border-justice-primary disabled:bg-gray-100"
                        >
                          <option value="under-18">Under 18</option>
                          <option value="16-18">16-18</option>
                          <option value="18-24">18-24</option>
                          <option value="25-34">25-34</option>
                          <option value="35-44">35-44</option>
                          <option value="45-54">45-54</option>
                          <option value="55-64">55-64</option>
                          <option value="65-plus">65+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={editedData.organization}
                        onChange={(e) => setEditedData({...editedData, organization: e.target.value})}
                        disabled={!isEditing}
                        className="mt-1"
                        placeholder="School, company, or organization"
                      />
                    </div>

                    <div>
                      <Label htmlFor="learningPath">Learning Path</Label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{userData.learningPath}</span>
                          <Link to="/get-started">
                            <Button size="sm" variant="outline">
                              Change Path
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Notifications & Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive updates about new scenarios and progress</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={userData.preferences.emailNotifications}
                          className="w-4 h-4 text-justice-primary border-gray-300 rounded focus:ring-justice-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Push Notifications</h4>
                          <p className="text-sm text-gray-600">Real-time notifications in your browser</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={userData.preferences.pushNotifications}
                          className="w-4 h-4 text-justice-primary border-gray-300 rounded focus:ring-justice-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Weekly Digest</h4>
                          <p className="text-sm text-gray-600">Summary of your learning progress</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={userData.preferences.weeklyDigest}
                          className="w-4 h-4 text-justice-primary border-gray-300 rounded focus:ring-justice-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Learning Reminders</h4>
                          <p className="text-sm text-gray-600">Gentle reminders to continue your learning journey</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={userData.preferences.reminders}
                          className="w-4 h-4 text-justice-primary border-gray-300 rounded focus:ring-justice-primary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data & Privacy */}
              <TabsContent value="data">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Data & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Data Usage</h4>
                        <p className="text-sm text-blue-800">
                          Your learning data helps us improve the platform and provide personalized recommendations. 
                          All data is encrypted and never shared with third parties.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Download Your Data
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-start">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Privacy Policy
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                          <X className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
