
import React, { useState, useEffect } from 'react';
import { jobs } from '@/data/mockData';
import { Job, JobFilter } from '@/types';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import { Briefcase } from 'lucide-react';

const JobsPage: React.FC = () => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [filters, setFilters] = useState<JobFilter>({
    search: '',
    category: '',
    location: '',
    type: ''
  });
  
  const applyFilters = (jobs: Job[], filters: JobFilter): Job[] => {
    return jobs.filter(job => {
      // Search filter
      if (filters.search && 
          !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !job.company.toLowerCase().includes(filters.search.toLowerCase()) &&
          !job.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.category && job.category !== filters.category) {
        return false;
      }
      
      // Location filter
      if (filters.location && job.location !== filters.location) {
        return false;
      }
      
      // Type filter
      if (filters.type && job.type !== filters.type) {
        return false;
      }
      
      return true;
    });
  };
  
  useEffect(() => {
    const result = applyFilters(jobs, filters);
    setFilteredJobs(result);
  }, [filters]);
  
  const handleFilterChange = (newFilters: JobFilter) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Browse Jobs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover opportunities that match your skills and career goals
          </p>
        </div>
        
        <JobFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          className="mb-8"
        />
        
        <div className="mt-8">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  className={`animate-fade-in animation-delay-${Math.min(index * 100, 500)}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600">
                Try adjusting your search filters to find more opportunities
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
