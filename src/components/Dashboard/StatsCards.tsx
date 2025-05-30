import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonLost {
  id: string;
  percentage: number;
  description: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'proposalUnclear1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, description: 'However venture pursuit' },
  { id: 'other', percentage: 10, description: 'Other' },
  { id: 'proposalUnclear2', percentage: 30, description: 'The proposal is unclear' }, // Repeated description, as in image
];

interface OtherDataStat {
  id: string;
  value: string | number;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherData: OtherDataStat[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' },
  { id: 'avgConversionTime', value: 12, label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: 30, label: 'inactive leads', hasInfo: true, infoText: 'Leads with no activity in the last 30 days.' },
];

interface StatsCardsProps {
  className?: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {reasonsLostData.map((reason) => (
              <div key={reason.id}>
                <p className="text-3xl font-bold text-foreground">{reason.percentage}%</p>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">
            {otherData.map((stat) => (
              <div key={stat.id}>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  {stat.hasInfo && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-white max-w-xs">
                          <p>{stat.infoText}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
