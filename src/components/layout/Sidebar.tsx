import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutGrid, Users, UserCircle2, FileText, FileSpreadsheet, ShoppingBag, Mail, Archive, CalendarDays, HelpCircle, Settings, LifeBuoy } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean; // isActive is managed by activeItem state, not part of static data
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#' },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: UserCircle2, href: '#' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#' },
  { id: 'invoices', label: 'Invoices', icon: FileSpreadsheet, href: '#' },
  { id: 'items', label: 'Items', icon: ShoppingBag, href: '#' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const secondaryNavItems: NavItem[] = [
  // The image shows two 'Help' items, one with HelpCircle (top, seems older style), one with LifeBuoy (bottom)
  // For simplicity, we can use one or distinguish them if needed. The context code has both.
  { id: 'helpOld', label: 'Help', icon: HelpCircle, href: '#' }, 
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'helpNew', label: 'Help', icon: LifeBuoy, href: '#' }, 
];

interface SidebarProps {
  className?: string;
  // Add props for mobile toggle if needed, e.g., onToggleMobileSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  const renderNavItem = (item: NavItem) => {
    const IconComponent = item.icon;
    const isActive = item.id === activeItem;
    return (
      <a
        key={item.id}
        href={item.href}
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation for demo purposes
          setActiveItem(item.id);
        }}
        className={cn(
          'flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isActive
            ? 'bg-primary text-primary-foreground' // Uses main primary colors for active state as per existing component
            : 'text-sidebar-foreground'
        )}
      >
        <IconComponent className="h-5 w-5" />
        <span>{item.label}</span>
      </a>
    );
  };

  return (
    <aside className={cn(
      "fixed top-0 left-0 z-20 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground p-4 space-y-2",
      className
      // On mobile, this sidebar might be controlled by a state (e.g., translated out of view or width set to 0)
      // For example: `isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'`, `md:translate-x-0`
      // This logic would typically be handled by MainAppLayout or a global state.
    )}>
      {/* Optional: Space for a logo or app name if it were part of the sidebar itself */}
      {/* <div className="h-16 flex items-center px-4"> <YourLogo /> </div> */}
      
      <nav className="flex-grow space-y-1">
        {mainNavItems.map(renderNavItem)}
      </nav>
      <div className="space-y-1 pb-4">
        {secondaryNavItems.map(renderNavItem)}
      </div>
    </aside>
  );
};

export default Sidebar;
