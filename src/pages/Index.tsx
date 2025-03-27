
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Search, Building, Users } from 'lucide-react';
import { jobs } from '@/data/mockData';
import JobCard from '@/components/JobCard';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="block">Find Your Perfect</span>
            <span className="text-primary">Career Opportunity</span>
          </h1>
          <p className="text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            Connect with top employers and discover your dream job from our curated list of opportunities across various industries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/jobs">
              <Button className="px-8 py-6 text-lg rounded-full hover-lift subtle-ring-focus">
                <Search className="mr-2 h-5 w-5" />
                Explore Jobs
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/login">
                <Button variant="outline" className="px-8 py-6 text-lg rounded-full hover-lift subtle-ring-focus">
                  <Users className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl hover-lift animate-fade-in animation-delay-100 text-center">
              <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">1,000+</h3>
              <p className="text-gray-600">Active Job Listings</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift animate-fade-in animation-delay-200 text-center">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">500+</h3>
              <p className="text-gray-600">Top Companies</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-lift animate-fade-in animation-delay-300 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">10,000+</h3>
              <p className="text-gray-600">Happy Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Opportunities</h2>
            <Link to="/jobs" className="text-primary flex items-center hover:underline">
              View all jobs <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job, index) => (
              <JobCard 
                key={job.id} 
                job={job} 
                className={`animate-fade-in animation-delay-${index * 100}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl my-16 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take the Next Step in Your Career?</h2>
          <p className="text-xl mb-10 text-gray-600">
            Join thousands of professionals who have found their dream jobs through our platform.
          </p>
          <Link to="/jobs">
            <Button className="px-8 py-6 text-lg rounded-full hover-lift subtle-ring-focus">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
