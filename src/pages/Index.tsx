import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import FunnelChart from '@/components/Dashboard/FunnelChart';
import PieChart from '@/components/Dashboard/PieChart';
import LineChart from '@/components/Dashboard/LineChart';
import StatsCards from '@/components/Dashboard/StatsCards';

/**
 * IndexPage serves as the main dashboard overview page.
 * It utilizes MainAppLayout for the overall structure (sidebar, header)
 * and arranges various dashboard-specific components like charts and stats cards.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* Container for the main content of the dashboard, following layout requirements */}
      <div className="flex flex-col gap-6">
        <PageHeader title="Dashboard" />
        
        {/* First row of charts: Funnel Chart and Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <FunnelChart />
          </div>
          <div className="lg:col-span-2">
            <PieChart />
          </div>
        </div>
        
        {/* Second row: Line Chart */}
        <LineChart />
        
        {/* Third row: Stats Cards */}
        <StatsCards />
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
