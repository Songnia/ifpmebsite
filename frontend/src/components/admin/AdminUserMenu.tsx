import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  LogOut, 
  User, 
  CreditCard, 
  HelpCircle, 
  Languages, 
  ChevronDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminUserMenuProps {
  onLogout: () => void;
}

export function AdminUserMenu({ onLogout }: AdminUserMenuProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials = user ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() : 'A';
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Administrateur';
  const email = user?.email || 'admin@ifpmeb.tg';

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger: Avatar */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 border border-blue-300 flex items-center justify-center text-blue-700 font-bold text-xs lg:text-sm shadow-sm hover:ring-4 hover:ring-blue-50 transition-all focus:outline-none"
      >
        {initials}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
          {/* User Info Header */}
          <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-50 mb-1">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{fullName}</p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-2 space-y-0.5">
            <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <Languages className="w-4 h-4 text-gray-400" />
                <span>Français</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span>Mon abonnement</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <User className="w-4 h-4 text-gray-400" />
              <span>Mon Profil</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 pb-2 mb-1">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span>Centre d'aide</span>
            </button>

            <button 
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
