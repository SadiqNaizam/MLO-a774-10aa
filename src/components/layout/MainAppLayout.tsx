import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  // Basic state for mobile sidebar toggle. In a real app, this might come from context or a store.
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const toggleMobileSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  // This is a simplified example. A more robust solution might involve:
  // 1. Conditionally rendering Sidebar or applying transform classes based on isMobileSidebarOpen.
  // 2. Sidebar component itself could handle its mobile presentation.
  // 3. Using a global state management for sidebar state.
  // For this exercise, we'll pass the toggle function to Header and assume Sidebar might be adapted or overlaid.
  // The current Sidebar is always fixed left. Toggling would require more changes to Sidebar or how it's rendered.
  // For simplicity, current `MainAppLayout` will rely on CSS media queries for responsive positioning.

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header is fixed and spans top. On mobile, it's full-width. On desktop, it starts after sidebar. */}
      <Header onToggleMobileSidebar={toggleMobileSidebar} />
      
      {/* Sidebar is fixed to the left. On mobile, it might be overlaid or hidden based on `isMobileSidebarOpen` state. */}
      {/* For this example, Sidebar is statically rendered. Advanced toggling is beyond simple CSS for fixed elements */}
      {/* and would require JS to change classes/styles on Sidebar. */} 
      <Sidebar 
        className={cn({
          // Example: 'hidden md:flex': always show on md+, hide on mobile unless toggled
          // This requires Sidebar to be a flex container itself for 'md:flex' to work as expected.
          // Current Sidebar is 'fixed ... flex flex-col ...', so 'md:flex' is fine.
          // If isMobileSidebarOpen is true, show it; otherwise, hide it on small screens.
          'fixed top-0 left-0 z-20': true, // Base fixed positioning
          'max-md:hidden': !isMobileSidebarOpen, // Hide on mobile if not open
          'max-md:w-full': isMobileSidebarOpen, // Example: make it full width if open on mobile as an overlay
                                               // Or use transform: 'max-md:translate-x-0' : 'max-md:-translate-x-full'
        })}
      />
      
      {/* Main content area */}
      {/* Needs padding-top for the fixed header height (h-16 -> pt-16 -> 4rem) */}
      {/* Needs padding-left on medium screens and up for the fixed sidebar width (w-64 -> pl-64 -> 16rem) */}
      <main className="md:pl-64 pt-16 flex-1 overflow-y-auto p-6">
        {/* The "container: flex flex-col gap-6" from requirements is typically applied to the page content itself */}
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
