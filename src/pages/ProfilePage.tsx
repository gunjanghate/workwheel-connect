
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { applications } from '@/data/mockData';
import { jobs } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, FileText, Briefcase, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  const userApplications = applications.filter(app => app.userId === user?.id);
  
  // Get job details for applications
  const applicationWithJobs = userApplications.map(app => {
    const job = jobs.find(job => job.id === app.jobId);
    return { ...app, job };
  });
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-10 w-10" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className="mt-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {user?.role === 'job_seeker' ? 'Job Seeker' : 
                   user?.role === 'employer' ? 'Employer' : 'Admin'}
                </Badge>
              </div>
            </div>
            
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 bg-transparent border-b border-gray-200 w-full justify-start">
            <TabsTrigger 
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Overview
            </TabsTrigger>
            {user?.role === 'job_seeker' && (
              <TabsTrigger 
                value="applications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Applications
              </TabsTrigger>
            )}
            {user?.role === 'employer' && (
              <TabsTrigger 
                value="postedJobs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Posted Jobs
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="settings"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="hover-lift">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {user?.role === 'job_seeker' ? 'Applications' : 
                     user?.role === 'employer' ? 'Posted Jobs' : 'Managed Jobs'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">
                      {user?.role === 'job_seeker' ? userApplications.length : 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-lift">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {user?.role === 'job_seeker' ? 'Resume Views' : 
                     user?.role === 'employer' ? 'Total Applicants' : 'Active Users'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">12</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-lift">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">Active</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {user?.role === 'job_seeker' ? (
                    applicationWithJobs.length > 0 ? (
                      applicationWithJobs.map((app, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary mr-4">
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {app.status === 'pending' ? 'Applied for ' : 
                               app.status === 'reviewed' ? 'Application reviewed for ' : 
                               app.status === 'accepted' ? 'Accepted for ' : 
                               'Rejected from '}
                              <Link to={`/jobs/${app.jobId}`} className="text-primary hover:underline">
                                {app.job?.title}
                              </Link>
                            </p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{new Date(app.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No recent activity to display</p>
                    )
                  ) : (
                    <p className="text-gray-500">No recent activity to display</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {user?.role === 'job_seeker' && (
            <TabsContent value="applications" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Your Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applicationWithJobs.length > 0 ? (
                    <div className="space-y-6">
                      {applicationWithJobs.map((app, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <Link to={`/jobs/${app.jobId}`} className="text-lg font-medium hover:text-primary">
                                {app.job?.title}
                              </Link>
                              <p className="text-gray-600">{app.job?.company}</p>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Applied on {new Date(app.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div>
                              <Badge 
                                className={`
                                  ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                    app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' : 
                                    app.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                                    'bg-red-100 text-red-800'}
                                `}
                              >
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't applied to any jobs yet. Start your job search today!
                      </p>
                      <Link to="/jobs">
                        <Button>Browse Jobs</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {user?.role === 'employer' && (
            <TabsContent value="postedJobs" className="animate-fade-in">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Your Posted Jobs</CardTitle>
                  <Link to="/add-job">
                    <Button size="sm">Post New Job</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No jobs posted yet</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't posted any jobs yet. Create your first job listing!
                    </p>
                    <Link to="/add-job">
                      <Button>Post a Job</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          <TabsContent value="settings" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-12">
                  Account settings feature is not available in this demo.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
