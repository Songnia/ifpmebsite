import React from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  MessageCircle,
  MoreVertical,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import './AdminDashboard.css';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useConfig } from '@/context/ConfigContext';

interface Inscription {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  formation: string;
  status: string;
  created_at: string;
}

export function AdminDashboard() {
  const { token, user } = useAuth();
  const { config } = useConfig();
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        const response = await fetch('/api/inscriptions/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setInscriptions(data);
        }
      } catch (error) {
        console.error('Failed to fetch inscriptions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchInscriptions();
    }
  }, [token]);

  // Derived Stats
  const totalVisitors = config.total_visitors || 0;
  const conversionRate = totalVisitors > 0 
    ? Math.round((inscriptions.length / totalVisitors) * 100) 
    : 0;

  const stats = [
    { label: 'Total Inscriptions', value: inscriptions.length.toString(), icon: Users, color: 'blue', change: '+12%' },
    { label: 'En attente', value: inscriptions.filter(i => i.status === 'En attente').length.toString(), icon: Clock, color: 'orange', change: 'À traiter' },
    { label: 'Formations actives', value: (config.formations?.length || 0).toString(), icon: BookOpen, color: 'green', change: 'En ligne' },
    { label: 'Taux de conversion', value: `${conversionRate}%`, icon: TrendingUp, color: 'purple', change: totalVisitors > 0 ? '+2.4%' : 'En attente de trafic' },
  ];

  const handleWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Bonjour ${name}, nous avons bien reçu votre demande d'inscription à l'IFPMEB. Souhaitez-vous échanger à ce sujet ?`);
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="admin-dashboard space-y-8 p-8 max-w-7xl mx-auto">
      {/* Introduction */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          Bonjour {user?.first_name || 'Administrateur'} 👋
        </h1>
        <p className="text-gray-500">Voici ce qui se passe aujourd'hui dans votre établissement.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 group-hover:scale-110 transition-transform bg-${stat.color}-600`}></div>
            <div className="flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <span className="text-[11px] text-green-600 font-semibold mb-1">{stat.change}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Section: Registrations */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Toutes les inscriptions</h3>
            <p className="text-xs text-gray-500">Liste complète des demandes reçues via le formulaire</p>
          </div>
          {/* <Button variant="outline" size="sm" className="gap-2 text-xs font-semibold">
            Tout voir
            <ArrowRight size={14} />
          </Button> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Candidat</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Téléphone</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Formation</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                      <p className="text-sm text-gray-500 font-medium">Chargement des dossiers...</p>
                    </div>
                  </td>
                </tr>
              ) : inscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Users size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium">Aucune inscription pour le moment</p>
                    <p className="text-sm">Les nouvelles demandes apparaîtront ici.</p>
                  </td>
                </tr>
              ) : inscriptions.map((reg) => (
                <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
                        {(reg.first_name?.[0] || '') + (reg.last_name?.[0] || '')}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm leading-none mb-1">{reg.first_name} {reg.last_name}</p>
                        <p className="text-xs text-gray-500">{reg.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                    {reg.phone}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {reg.formation}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(reg.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      reg.status === 'Inscrit' ? 'bg-green-100 text-green-700' : 
                      reg.status === 'Contacté' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50 gap-2"
                        onClick={() => handleWhatsApp(reg.phone, `${reg.first_name} ${reg.last_name}`)}
                      >
                        <MessageCircle size={14} />
                        <span className="text-xs font-bold">Écrire au client</span>
                      </Button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
