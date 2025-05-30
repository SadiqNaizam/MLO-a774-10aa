import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutGrid, Users, UserCircle2, FileText, FileSpreadsheet, ShoppingBag, Mail, Archive, CalendarDays, HelpCircle, Settings, LifeBuoy } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#', isActive: true },
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
  { id: 'helpOld', label: 'Help', icon: HelpCircle, href: '#' }, // This icon matches the top 'Help' in the image
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'helpNew', label: 'Help', icon: LifeBuoy, href: '#' }, // This icon matches the bottom 'Help' (life buoy)
];

const SidebarNav: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  const renderNavItem = (item: NavItem) => {
    const IconComponent = item.icon;
    const isActive = item.id === activeItem;
    return (
      <a
        key={item.id}
        href={item.href}
        onClick={() => setActiveItem(item.id)}
        className={cn(
          'flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-sidebar-foreground'
        )}
      >
        <IconComponent className="h-5 w-5" />
        <span>{item.label}</span>
      </a>
    );
  };

  return (
    <aside className="fixed top-0 left-0 z-20 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground p-4 space-y-2">
      {/* Placeholder for Logo and Menu toggle, assuming they are in TopHeader or part of a global layout context */}
      {/* For this component, we focus on the nav links themselves */}
      {/* Margin/padding might be needed if a logo is added above nav items inside sidebar */}
      <nav className="flex-grow space-y-1 pt-16"> {/* Added pt-16 to account for TopHeader height if sidebar was under it, or for a logo space */} 
        {mainNavItems.map(renderNavItem)}
      </nav>
      <div className="space-y-1 pb-4">
        {secondaryNavItems.map(renderNavItem)}
      </div>
    </aside>
  );
};

export default SidebarNav;
