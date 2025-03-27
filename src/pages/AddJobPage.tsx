
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { categories, jobTypes, locations } from '@/data/mockData';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    category: '',
    type: '',
    deadline: '',
    skills: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.company || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would send data to server here
    toast.success('Job posted successfully!', {
      description: 'Your job listing has been created and is now live.'
    });
    
    // Redirect to jobs page
    navigate('/jobs');
  };
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <Link to="/jobs" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to jobs
        </Link>
        
        <div className="glass-card rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Senior React Developer"
                  value={formData.title}
                  onChange={handleChange}
                  className="subtle-ring-focus"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="e.g. TechCorp Inc."
                  value={formData.company}
                  onChange={handleChange}
                  className="subtle-ring-focus"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select 
                  value={formData.location} 
                  onValueChange={(value) => handleSelectChange('location', value)}
                >
                  <SelectTrigger className="subtle-ring-focus">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.slice(1).map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  name="salary"
                  placeholder="e.g. $80,000 - $100,000"
                  value={formData.salary}
                  onChange={handleChange}
                  className="subtle-ring-focus"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className="subtle-ring-focus">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger className="subtle-ring-focus">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.slice(1).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="subtle-ring-focus"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                  value={formData.skills}
                  onChange={handleChange}
                  className="subtle-ring-focus"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">
                Job Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter detailed job description..."
                value={formData.description}
                onChange={handleChange}
                className="min-h-[200px] subtle-ring-focus"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/jobs')}>
                Cancel
              </Button>
              <Button type="submit">Post Job</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobPage;
