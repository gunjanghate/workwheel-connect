
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { users } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Briefcase } from 'lucide-react';

interface DemoAccountProps {
  email: string;
  role: string;
  onClick: (email: string) => void;
}

const DemoAccount: React.FC<DemoAccountProps> = ({ email, role, onClick }) => {
  return (
    <div 
      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick(email)}
    >
      <p className="font-medium">{role}</p>
      <p className="text-sm text-gray-600">{email}</p>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/jobs');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDemoAccountClick = (demoEmail: string) => {
    setEmail(demoEmail);
  };
  
  return (
    <div className="container mx-auto py-16 px-4 animate-fade-in">
      <div className="max-w-md mx-auto glass-card rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome to JobBoard</h1>
          <p className="text-gray-600 mt-2">Sign in to access your account</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="subtle-ring-focus"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="subtle-ring-focus"
                />
                <p className="text-xs text-gray-500 mt-1">
                  (For demo, password is not required)
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-full subtle-ring-focus"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="demo">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Select a demo account to sign in without registration:
              </p>
              
              <DemoAccount 
                email="seeker@example.com" 
                role="Job Seeker" 
                onClick={handleDemoAccountClick} 
              />
              
              <DemoAccount 
                email="employer@example.com" 
                role="Employer" 
                onClick={handleDemoAccountClick} 
              />
              
              <DemoAccount 
                email="admin@example.com" 
                role="Admin" 
                onClick={handleDemoAccountClick} 
              />
              
              <Button 
                onClick={handleLogin} 
                className="w-full rounded-full mt-4 subtle-ring-focus"
                disabled={!email || isLoading}
              >
                {isLoading ? 'Signing In...' : 'Continue with Demo Account'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-primary hover:underline">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
