import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  amount: number;
  duration: string;
  color: string; // Tailwind background color class e.g., 'bg-red-500'
  textColor?: string; // Tailwind text color class e.g., 'text-white'
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, amount: 200, duration: '2 days', color: 'bg-chart-red' },
  { id: 'qualified', name: 'Qualified', count: 100, amount: 100, duration: '2 days', color: 'bg-yellow-400' },
  { id: 'inConversation', name: 'In conversation', count: 50, amount: 100, duration: 'average time on this stage', color: 'bg-indigo-600', textColor: 'text-white' },
  { id: 'negotiations', name: 'Negotiations', count: 20, amount: 50, duration: '8 days', color: 'bg-teal-400' },
  { id: 'closedWon', name: 'Closed won', count: 20, amount: 50, duration: '10 days', color: 'bg-purple-500', textColor: 'text-white' },
];

const totalActiveLeads = 600;

interface FunnelChartProps {
  className?: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ className }) => {
  const maxCount = Math.max(...funnelData.map(stage => stage.count), 0);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
        <div className="text-3xl font-bold text-foreground">
          {totalActiveLeads} <span className="text-sm font-normal text-muted-foreground">active leads</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Overall progress bar representation */} 
          <div className="flex h-3 w-full rounded-full overflow-hidden">
            {funnelData.map(stage => (
              <div 
                key={`${stage.id}-bar`}
                className={cn('h-full', stage.color)}
                style={{ width: `${(stage.count / totalActiveLeads) * 100}%` }}
              />
            ))}
          </div>

          {/* Detailed list */} 
          <ul className="space-y-2.5 text-sm">
            {funnelData.map((stage) => (
              <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3">
                <div className={cn('h-3 w-3 rounded-sm', stage.color)} />
                <span className="text-foreground whitespace-nowrap truncate">{stage.name}</span>
                <span className="text-muted-foreground justify-self-end tabular-nums">{stage.count}</span>
                <span className="text-muted-foreground justify-self-end tabular-nums w-20 text-right">$ {stage.amount}</span>
                {stage.id === 'inConversation' ? (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-muted-foreground justify-self-end tabular-nums w-20 text-right cursor-help underline decoration-dotted">{stage.duration.split(' ')[0]} days</span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 text-white">
                                <p>{stage.duration}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <span className="text-muted-foreground justify-self-end tabular-nums w-20 text-right">{stage.duration}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;
