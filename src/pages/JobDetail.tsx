
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobs } from '@/data/mockData';
import { Job } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Calendar, MapPin, Clock, Briefcase, Building, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  const job = jobs.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Job not found</h2>
        <p className="mb-8">The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs">
          <Button>View All Jobs</Button>
        </Link>
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to apply for this job', {
        description: 'You need to be logged in as a job seeker to apply',
        action: {
          label: 'Sign In',
          onClick: () => navigate('/login')
        }
      });
      return;
    }
    
    if (user?.role !== 'job_seeker') {
      toast.error('Only job seekers can apply for jobs');
      return;
    }
    
    setIsApplyDialogOpen(true);
  };
  
  const handleSubmitApplication = () => {
    toast.success('Application submitted successfully!', {
      description: 'The employer will review your application soon.'
    });
    setIsApplyDialogOpen(false);
    setCoverLetter('');
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };
  
  const postedDate = new Date(job.postedDate);
  const deadlineDate = new Date(job.deadline);
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/jobs" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to jobs
          </Link>
          
          <div className="glass-card rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mr-4">
                  {job.logo ? (
                    <img 
                      src={job.logo} 
                      alt={`${job.company} logo`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/400x400?text=Company';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {job.company.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                  <div className="flex items-center mt-1">
                    <Building className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">{job.company}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleShare} variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
                {isAuthenticated && user?.role === 'job_seeker' && (
                  <Button onClick={handleApply} className="rounded-full">Apply Now</Button>
                )}
                {!isAuthenticated && (
                  <Link to="/login">
                    <Button className="rounded-full">Sign in to Apply</Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span>Posted {postedDate.toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium text-primary">
                {job.salary}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Apply by {deadlineDate.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-8 mb-8 animate-fade-in animation-delay-100">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="whitespace-pre-line text-gray-700 mb-6">{job.description}</p>
            
            <Separator className="my-8" />
            
            <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
            <p className="text-gray-700 mb-6">
              {job.company} is a leading company in the {job.category.toLowerCase()} industry, 
              committed to innovation and excellence. We offer a collaborative work environment 
              with opportunities for professional growth and competitive benefits.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <ul className="list-disc pl-5 mb-6 text-gray-700">
              {job.skills.map((skill, index) => (
                <li key={index} className="mb-1">{skill}</li>
              ))}
            </ul>
          </div>
          
          <div className="text-center animate-fade-in animation-delay-200">
            {isAuthenticated && user?.role === 'job_seeker' ? (
              <Button onClick={handleApply} size="lg" className="px-8 rounded-full">
                Apply for this Position
              </Button>
            ) : !isAuthenticated ? (
              <Link to="/login">
                <Button size="lg" className="px-8 rounded-full">
                  Sign in to Apply
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-xl">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Cover Letter</h4>
              <Textarea
                placeholder="Tell the employer why you're a great fit for the position..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="h-40"
              />
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Resume</h4>
              <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-gray-500 mb-2">Upload your resume (PDF, DOC, DOCX)</p>
                <Button variant="outline" size="sm" className="rounded-full">
                  Choose File
                </Button>
                <p className="text-xs text-gray-400 mt-2">Not required for this demo</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitApplication}>
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobDetail;
