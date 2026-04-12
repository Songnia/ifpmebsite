import { Search, Bell, ExternalLink, Copy, Check, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AdminUserMenu } from './AdminUserMenu';
import { useAuth } from '@/context/AuthContext';

interface AdminHeaderProps {
  title: string;
  siteUrl: string;
  onMenuClick?: () => void;
  onLogout: () => void;
}

export function AdminHeader({ title, siteUrl, onMenuClick, onLogout }: AdminHeaderProps) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Toggle Menu - Mobile only */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="text-lg lg:text-xl font-bold text-gray-800 line-clamp-1">{title}</h2>
        
        <div className="h-4 w-px bg-gray-200 mx-2 hidden sm:block"></div>
        
        <div className="relative group hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="pl-10 pr-4 py-1.5 bg-gray-50 border-transparent border focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 rounded-full text-sm w-32 lg:w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden sm:flex items-center bg-gray-50 rounded-lg p-1 mr-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 gap-2 h-8 px-2 lg:px-3"
            onClick={() => window.open('/', '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-xs font-semibold hidden md:inline">Voir le site</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 gap-2 h-8 px-2 lg:px-3"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span className="text-xs font-semibold hidden md:inline">{copied ? 'Copié !' : 'Lien'}</span>
          </Button>
        </div>

        <button className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 lg:gap-4 pl-2 lg:pl-4 border-l">
          <div className="text-right hidden xl:block">
            <p className="text-[12px] font-bold text-gray-900 leading-none">
              {user ? `${user.first_name} ${user.last_name}` : 'Administrateur'}
            </p>
            <p className="text-[10px] text-gray-400">Gérant</p>
          </div>
          <AdminUserMenu onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}


