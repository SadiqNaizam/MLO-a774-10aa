import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const chartData = [
  { name: 'March', closedWon: 65, closedLost: 42 },
  { name: 'April', closedWon: 52, closedLost: 28 },
  { name: 'May', closedWon: 78, closedLost: 35 },
  { name: 'June', closedWon: 60, closedLost: 8 }, // Significant drop for closedLost
  { name: 'July', closedWon: 85, closedLost: 45 },
  { name: 'August', closedWon: 95, closedLost: 30 }, // Highest closedWon
];

const totalClosed = 680;
const totalLost = 70;

// Colors from PRD
const closedWonColor = '#299CDB'; // --prd-chart-blue
const closedLostColor = '#F06548'; // --prd-chart-red

interface LineChartComponentProps {
  className?: string;
}

const LineChart: React.FC<LineChartComponentProps> = ({ className }) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('Last 6 months');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    <span className="text-2xl font-bold text-foreground">{totalClosed}</span> total closed&nbsp;&nbsp;
                    <span className="text-2xl font-bold text-foreground">{totalLost}</span> total lost
                </CardDescription>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full mt-2 sm:mt-0 sm:w-auto flex items-center justify-center text-muted-foreground">
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
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={closedWonColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={closedWonColor} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={closedLostColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={closedLostColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                dx={-5}
                domain={[0, 100]} // Match image y-axis
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}} 
                itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                cursor={{ stroke: 'hsl(var(--muted))', strokeWidth: 1, strokeDasharray: '3 3' }}
              />
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke={closedWonColor} fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2.5} dot={{ r: 4, fill: closedWonColor, strokeWidth: 2, stroke: 'hsl(var(--card))' }} activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke={closedLostColor} fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2.5} dot={{ r: 4, fill: closedLostColor, strokeWidth: 2, stroke: 'hsl(var(--card))' }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-sm mr-2" style={{ backgroundColor: closedWonColor }} />
            <span className="text-muted-foreground">Closed won</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-sm mr-2" style={{ backgroundColor: closedLostColor }} />
            <span className="text-muted-foreground">Closed lost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
