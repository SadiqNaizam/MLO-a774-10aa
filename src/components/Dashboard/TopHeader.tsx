import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Box, Plus, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 md:left-64 right-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        {/* Logo placeholder based on image. BO logo. */}
        <div className="flex items-center space-x-1.5">
           <Box className="h-8 w-8 text-primary" /> {/* Generic icon like 'BO' */} 
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
