import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JobFilter } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, locations, jobTypes } from '@/data/mockData';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';

interface JobFiltersProps {
  filters: JobFilter;
  onFilterChange: (filters: JobFilter) => void;
  className?: string;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFilterChange, className }) => {
  const [localFilters, setLocalFilters] = useState<JobFilter>(filters);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters({
      ...localFilters,
      search: e.target.value
    });
  };
  
  const handleCategoryChange = (value: string) => {
    setLocalFilters({
      ...localFilters,
      category: value === 'All Categories' ? '' : value
    });
  };
  
  const handleLocationChange = (value: string) => {
    setLocalFilters({
      ...localFilters,
      location: value === 'All Locations' ? '' : value
    });
  };
  
  const handleTypeChange = (value: string) => {
    setLocalFilters({
      ...localFilters,
      type: value === 'All Types' ? '' : value
    });
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onFilterChange(localFilters);
    setIsOpen(false);
  };
  
  const handleReset = () => {
    const resetFilters = {
      search: '',
      category: '',
      location: '',
      type: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Filters */}
      <form onSubmit={handleSubmit} className="hidden md:flex space-x-4 items-end">
        <div className="flex-1 space-y-2">
          <label htmlFor="search" className="text-sm font-medium">
            Search Jobs
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Job title, company, or keyword"
              value={localFilters.search}
              onChange={handleInputChange}
              className="pl-10 subtle-ring-focus"
            />
          </div>
        </div>
        
        <div className="w-44 space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select 
            value={localFilters.category || 'All Categories'} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="subtle-ring-focus">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-44 space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Select 
            value={localFilters.location || 'All Locations'} 
            onValueChange={handleLocationChange}
          >
            <SelectTrigger className="subtle-ring-focus">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-44 space-y-2">
          <label className="text-sm font-medium">Job Type</label>
          <Select 
            value={localFilters.type || 'All Types'} 
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="subtle-ring-focus">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2">
          <Button type="submit" className="subtle-ring-focus">
            Apply Filters
          </Button>
          {(localFilters.search || localFilters.category || localFilters.location || localFilters.type) && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="subtle-ring-focus"
            >
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </form>
      
      {/* Mobile Filters */}
      <div className="md:hidden space-y-4">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={localFilters.search}
              onChange={(e) => {
                handleInputChange(e);
                // Auto-apply search filter on mobile
                onFilterChange({
                  ...localFilters,
                  search: e.target.value
                });
              }}
              className="pl-10 subtle-ring-focus"
            />
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="px-3">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Filter Jobs</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={localFilters.category || 'All Categories'} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select 
                    value={localFilters.location || 'All Locations'} 
                    onValueChange={handleLocationChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Type</label>
                  <Select 
                    value={localFilters.type || 'All Types'} 
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1" onClick={() => handleSubmit()}>
                    Apply Filters
                  </Button>
                  {(localFilters.category || localFilters.location || localFilters.type) && (
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Mobile filter badges */}
        {(localFilters.category || localFilters.location || localFilters.type) && (
          <div className="flex flex-wrap gap-2">
            {localFilters.category && (
              <Badge variant="secondary" className="bg-blue-50 text-primary border-blue-200 flex items-center">
                {localFilters.category}
                <button
                  onClick={() => {
                    const newFilters = { ...localFilters, category: '' };
                    setLocalFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className="ml-1 hover:text-blue-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {localFilters.location && (
              <Badge variant="secondary" className="bg-blue-50 text-primary border-blue-200 flex items-center">
                {localFilters.location}
                <button
                  onClick={() => {
                    const newFilters = { ...localFilters, location: '' };
                    setLocalFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className="ml-1 hover:text-blue-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {localFilters.type && (
              <Badge variant="secondary" className="bg-blue-50 text-primary border-blue-200 flex items-center">
                {localFilters.type}
                <button
                  onClick={() => {
                    const newFilters = { ...localFilters, type: '' };
                    setLocalFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className="ml-1 hover:text-blue-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFilters;
