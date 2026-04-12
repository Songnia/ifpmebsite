import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activeView: 'dashboard' | 'builder';
  onViewChange: (view: 'dashboard' | 'builder') => void;
  onLogout: () => void;
  siteName: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ activeView, onViewChange, onLogout, siteName, isOpen, onClose }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'builder', label: 'Mon Site (Builder)', icon: Globe },
    /* { id: 'inscriptions', label: 'Inscriptions', icon: Users, disabled: true }, */
    /* { id: 'settings', label: 'Paramètres', icon: Settings, disabled: true }, */
  ];

  return (
    <aside className={cn(
      "w-64 bg-white border-r h-screen fixed lg:sticky top-0 left-0 flex flex-col z-50 transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Brand & Close button */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-bold text-gray-900 truncate text-sm">{siteName || 'Mon Institut'}</h2>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Admin</p>
          </div>
        </div>
        
        {/* Close button - Mobile only */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>


      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && onViewChange(item.id as any)}
            disabled={item.disabled}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium",
              activeView === item.id 
                ? "bg-blue-50 text-blue-600 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50",
              item.disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn(
                "w-5 h-5",
                activeView === item.id ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
              )} />
              <span>{item.label}</span>
            </div>
            {activeView === item.id && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>


    </aside>
  );
}
