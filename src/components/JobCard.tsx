
import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  className?: string;
}

const JobCard: React.FC<JobCardProps> = ({ job, className }) => {
  const postedDate = new Date(job.postedDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return (
    <Link 
      to={`/jobs/${job.id}`} 
      className={cn(
        "block glass-card rounded-xl p-6 hover-lift transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
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
        <Badge variant="outline" className="bg-blue-50 text-primary border-blue-200">
          {job.type}
        </Badge>
      </div>
      
      <h3 className="text-xl font-semibold mb-1 transition-colors group-hover:text-primary">
        {job.title}
      </h3>
      
      <p className="text-gray-600 mb-3">{job.company}</p>
      
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{job.location}</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 3).map((skill, index) => (
          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 3 && (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            +{job.skills.length - 3}
          </Badge>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-primary font-medium">
          {job.salary}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{diffDays === 0 ? 'Today' : `${diffDays} days ago`}</span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
