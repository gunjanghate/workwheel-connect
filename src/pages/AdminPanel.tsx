
import React, { useState } from 'react';
import { jobs, users } from '@/data/mockData';
import { Job, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Search, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(jobSearchQuery.toLowerCase())
  );
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );
  
  const handleDeleteJob = (jobId: string) => {
    toast.success('Job deleted successfully');
  };
  
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailOpen(true);
  };
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage jobs, users, and application settings</p>
        </div>
        
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="mb-8 bg-transparent border-b border-gray-200 w-full justify-start">
            <TabsTrigger 
              value="jobs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Jobs
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  className="pl-10 subtle-ring-focus"
                />
              </div>
              <Link to="/add-job">
                <Button>Add New Job</Button>
              </Link>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date Posted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id} className="hover-lift">
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.category}</TableCell>
                      <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSelectJob(job)}
                          className="h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link to={`/jobs/${job.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Job</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this job? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteJob(job.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="pl-10 subtle-ring-focus"
                />
              </div>
              <Button>Add New User</Button>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover-lift">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`
                            ${user.role === 'job_seeker' ? 'bg-blue-100 text-blue-800' : 
                              user.role === 'employer' ? 'bg-purple-100 text-purple-800' : 
                              'bg-green-100 text-green-800'}
                          `}
                        >
                          {user.role === 'job_seeker' ? 'Job Seeker' : 
                           user.role === 'employer' ? 'Employer' : 'Admin'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this user? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => toast.success('User deleted successfully')}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
              <p className="text-gray-500 mb-8">
                Configure application settings, notifications, and user permissions.
              </p>
              
              <div className="border-t border-gray-200 pt-6">
                <p className="text-center text-gray-500">
                  Admin settings feature is not available in this demo.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {selectedJob && (
        <Sheet open={isJobDetailOpen} onOpenChange={setIsJobDetailOpen}>
          <SheetContent className="sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{selectedJob.title}</SheetTitle>
              <SheetDescription>Job details and management</SheetDescription>
            </SheetHeader>
            
            <div className="py-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company</h3>
                  <p className="mt-1">{selectedJob.company}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{selectedJob.location}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Salary</h3>
                  <p className="mt-1">{selectedJob.salary}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Posted Date</h3>
                  <p className="mt-1">{new Date(selectedJob.postedDate).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                  <p className="mt-1">{new Date(selectedJob.deadline).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedJob.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-sm text-gray-600">{selectedJob.description}</p>
                </div>
              </div>
            </div>
            
            <SheetFooter className="sm:justify-start">
              <div className="flex space-x-2">
                <Link to={`/jobs/${selectedJob.id}`}>
                  <Button>View Job</Button>
                </Link>
                <Button variant="outline">Edit Job</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Job</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Job</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this job? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => {
                          handleDeleteJob(selectedJob.id);
                          setIsJobDetailOpen(false);
                        }}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default AdminPanel;
