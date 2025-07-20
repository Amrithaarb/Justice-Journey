import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Link, useLocation } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  X,
  Mail,
  Lock,
  User,
  Calendar,
  GraduationCap,
  Briefcase,
  Users,
  Shield
} from "lucide-react";

const roleOptions = [
  {
    id: "student",
    title: "Student",
    description: "High school or college student",
    icon: GraduationCap
  },
  {
    id: "educator",
    title: "Educator",
    description: "Teacher, counselor, or administrator",
    icon: Users
  },
  {
    id: "advocate",
    title: "Youth Advocate",
    description: "Social worker, community organizer",
    icon: Shield
  },
  {
    id: "professional",
    title: "Legal Professional",
    description: "Lawyer, paralegal, or legal aid worker",
    icon: Briefcase
  },
  {
    id: "other",
    title: "Community Member",
    description: "Parent, volunteer, or interested citizen",
    icon: User
  }
];

const passwordRequirements = [
  { text: "At least 8 characters", regex: /.{8,}/ },
  { text: "One uppercase letter", regex: /[A-Z]/ },
  { text: "One lowercase letter", regex: /[a-z]/ },
  { text: "One number", regex: /\d/ }
];

export function CreateAccount() {
  const location = useLocation();
  const selectedPath = location.state?.selectedPath;
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    organization: "",
    ageRange: "",
    agreeToTerms: false,
    receiveUpdates: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const failedRequirements = passwordRequirements.filter(req => !req.regex.test(formData.password));
      if (failedRequirements.length > 0) {
        newErrors.password = "Password doesn't meet all requirements";
      }
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.role) newErrors.role = "Please select your role";
    if (!formData.ageRange) newErrors.ageRange = "Please select your age range";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms of service";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      // Handle account creation
      console.log("Creating account:", formData);
      // Redirect to dashboard or scenarios
    }
  };

  const getPasswordStrength = () => {
    const metRequirements = passwordRequirements.filter(req => req.regex.test(formData.password));
    return metRequirements.length;
  };

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Link to="/get-started" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Get Started
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h1>
            <p className="text-gray-600">Help us personalize your learning experience</p>
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-justice-primary rounded-full"></div>
                <div className="w-8 h-1 bg-justice-primary rounded-full"></div>
                <div className="w-3 h-3 bg-justice-primary rounded-full"></div>
              </div>
            </div>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-4 block">
                    What best describes your role? *
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {roleOptions.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <div
                          key={role.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.role === role.id
                              ? "border-justice-primary bg-justice-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleInputChange("role", role.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <IconComponent className={`h-5 w-5 mt-0.5 ${
                              formData.role === role.id ? "text-justice-primary" : "text-gray-400"
                            }`} />
                            <div>
                              <h3 className="font-medium text-gray-900">{role.title}</h3>
                              <p className="text-sm text-gray-600">{role.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
                </div>

                {/* Age Range */}
                <div>
                  <Label htmlFor="ageRange" className="text-base font-medium text-gray-900">
                    Age Range *
                  </Label>
                  <select
                    id="ageRange"
                    value={formData.ageRange}
                    onChange={(e) => handleInputChange("ageRange", e.target.value)}
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-justice-primary focus:border-justice-primary"
                  >
                    <option value="">Select your age range</option>
                    <option value="under-18">Under 18</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65-plus">65+</option>
                  </select>
                  {errors.ageRange && <p className="text-red-600 text-sm mt-1">{errors.ageRange}</p>}
                </div>

                {/* Organization (Optional) */}
                <div>
                  <Label htmlFor="organization" className="text-base font-medium text-gray-900">
                    Organization (Optional)
                  </Label>
                  <Input
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    placeholder="School, company, or organization name"
                    className="mt-2"
                  />
                </div>

                {/* Terms and Updates */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-5">
                      I agree to the <Link to="/terms" className="text-justice-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-justice-primary hover:underline">Privacy Policy</Link> *
                    </Label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>}
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="receiveUpdates"
                      checked={formData.receiveUpdates}
                      onCheckedChange={(checked) => handleInputChange("receiveUpdates", checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="receiveUpdates" className="text-sm text-gray-700 leading-5">
                      I'd like to receive updates about new scenarios and legal education resources
                    </Label>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Link to="/get-started" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Get Started
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join Justice Journey and start learning</p>
          {selectedPath && (
            <p className="text-sm text-justice-primary mt-2">
              Starting with: {selectedPath} path
            </p>
          )}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-justice-primary rounded-full"></div>
              <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-900">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`mt-1 ${errors.firstName ? "border-red-500" : ""}`}
                    placeholder="First name"
                  />
                  {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-900">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`mt-1 ${errors.lastName ? "border-red-500" : ""}`}
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                  Email Address *
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                  Password *
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => {
                      const meets = req.regex.test(formData.password);
                      return (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          {meets ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-gray-400" />
                          )}
                          <span className={meets ? "text-green-600" : "text-gray-500"}>
                            {req.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900">
                  Confirm Password *
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-justice-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
