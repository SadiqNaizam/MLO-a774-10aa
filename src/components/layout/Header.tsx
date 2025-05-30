import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Box, ChevronDown } from 'lucide-react'; // Plus icon removed as it's not used

interface HeaderProps {
  className?: string;
  onToggleMobileSidebar?: () => void; // Optional prop for mobile menu toggle
}

const Header: React.FC<HeaderProps> = ({ className, onToggleMobileSidebar }) => {
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 md:left-64 right-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        {/* Mobile menu button - shown only on screens smaller than md */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleMobileSidebar} aria-label="Toggle sidebar">
          <Menu className="h-6 w-6" />
        </Button>
        
        {/* Logo - hidden on md and up because it's assumed to be in the sidebar or this header is specific to content area */}
        {/* Based on layout, logo is in this header, to the left of Create button */}
        <div className="flex items-center space-x-1.5">
           <Box className="h-8 w-8 text-primary" /> 
           <span className="text-2xl font-bold text-foreground">BO</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Other header items like notifications, user profile can go here */}
      </div>
    </header>
  );
};

export default Header;
