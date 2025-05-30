import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';

interface PieChartDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string; // Hex color string
}

const chartData: PieChartDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F06548' }, // chart-red
  { name: 'Behance', value: 1000, percentage: 40, color: '#FBBF24' }, // yellow-400
  { name: 'Instagram', value: 1000, percentage: 10, color: '#299CDB' }, // chart-blue
  { name: 'Dribbble', value: 1000, percentage: 10, color: '#34D399' }, // green-400 (using a lighter green for Dribbble)
];

interface PieChartComponentProps {
  className?: string;
}

const PieChart: React.FC<PieChartComponentProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:space-x-6">
          <div className="w-full md:w-1/2 h-52 md:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}} 
                    itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50} // For Donut chart effect
                  fill="#8884d8"
                  dataKey="value"
                  stroke="hsl(var(--card))" // Border between slices, same as card background
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <ul className="space-y-2 text-sm">
              {chartData.map((source) => (
                <li key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span style={{ backgroundColor: source.color }} className="mr-2 h-3 w-3 rounded-sm" />
                    <span className="text-foreground">{source.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-muted-foreground tabular-nums">$ {source.value.toLocaleString()}</span>
                    {source.name === 'Dribbble' ? (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="text-muted-foreground tabular-nums w-10 text-right cursor-help underline decoration-dotted">{source.percentage}%</span>
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-800 text-white">
                                    <p>from leads total</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <span className="text-muted-foreground tabular-nums w-10 text-right">{source.percentage}%</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-md">
              <TabsTrigger value="leadsCame" className={cn('px-3 py-1 text-xs sm:text-sm', activeTab === 'leadsCame' ? 'bg-card text-primary shadow-sm rounded-sm' : 'text-muted-foreground hover:bg-card/50')}>Leads came</TabsTrigger>
              <TabsTrigger value="leadsConverted" className={cn('px-3 py-1 text-xs sm:text-sm', activeTab === 'leadsConverted' ? 'bg-card text-primary shadow-sm rounded-sm' : 'text-muted-foreground hover:bg-card/50')}>Leads Converted</TabsTrigger>
              <TabsTrigger value="totalDealsSize" className={cn('px-3 py-1 text-xs sm:text-sm', activeTab === 'totalDealsSize' ? 'bg-card text-primary shadow-sm rounded-sm' : 'text-muted-foreground hover:bg-card/50')}>Total deals size</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
