import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface PageHeaderProps {
  title?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title = 'Dashboard',
  className 
}) => {
  const [activeTab, setActiveTab] = React.useState<'sales' | 'leads'>('leads');
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('Last 6 months');

  return (
    <div className={cn('flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0', className)}>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'sales' | 'leads')} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto bg-muted p-1 rounded-md">
            <TabsTrigger 
              value="sales" 
              className={cn(
                'px-4 py-1.5 text-sm font-medium rounded-sm',
                activeTab === 'sales' 
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-card/50'
              )}
            >
              Sales
            </TabsTrigger>
            <TabsTrigger 
              value="leads" 
              className={cn(
                'px-4 py-1.5 text-sm font-medium rounded-sm',
                activeTab === 'leads' 
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-card/50'
              )}
            >
              Leads
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>{selectedPeriod}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 30 days')}>Last 30 days</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 3 months')}>Last 3 months</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 6 months')}>Last 6 months</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 12 months')}>Last 12 months</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PageHeader;
