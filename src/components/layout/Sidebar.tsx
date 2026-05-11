"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Map, Ticket, Users, FileText, Settings, 
  LogOut, ChevronLeft, ChevronRight, Plane, Search, Bell
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Painel Central', path: '/dashboard' },
  { icon: Map, label: 'Destinos & Rotas', path: '/dashboard/destinos' },
  { icon: Ticket, label: 'Reservas High-End', path: '/dashboard/reservas' },
  { icon: FileText, label: 'Consultoria Vistos', path: '/dashboard/vistos' },
  { icon: Users, label: 'Membros VIP', path: '/dashboard/clientes' },
  { icon: Settings, label: 'Sistema', path: '/dashboard/configuracoes' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside 
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 90 : 280 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{
        height: 'calc(100vh - 2rem)',
        margin: '1rem 0 1rem 1rem',
        background: 'rgba(4, 13, 27, 0.6)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: '1rem',
        zIndex: 50,
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(197, 160, 40, 0.1)'
      }}
    >
      {/* Brand */}
      <div style={{ 
        height: '100px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isCollapsed ? 'center' : 'space-between',
        padding: isCollapsed ? '0' : '0 2rem',
        position: 'relative'
      }}>
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div 
              key="logo-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
            >
              <div style={{ background: 'linear-gradient(135deg, var(--gold-main), #fff)', padding: '8px', borderRadius: '12px' }}>
                <Plane size={20} color="#000" style={{ transform: 'rotate(-45deg)' }} />
              </div>
              <span className="font-serif" style={{ fontSize: '1.2rem', fontWeight: '700', letterSpacing: '2px' }}>AG VOYAGE</span>
            </motion.div>
          ) : (
            <motion.div 
              key="logo-icon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{ background: 'var(--gold-main)', padding: '10px', borderRadius: '14px', boxShadow: '0 0 20px rgba(197, 160, 40, 0.4)' }}
            >
              <Plane size={24} color="#000" style={{ transform: 'rotate(-45deg)' }} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button 
          onClick={() => setIsCollapsed(false)}
          style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', paddingBottom: '1rem' }}
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
          return (
            <Link href={item.path} key={item.path} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '16px',
                  position: 'relative',
                  color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                  transition: 'color 0.3s ease',
                  justifyContent: isCollapsed ? 'center' : 'flex-start'
                }}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(197, 160, 40, 0.15), transparent)', borderRadius: '16px', borderLeft: '2px solid var(--gold-main)' }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon size={22} style={{ position: 'relative', zIndex: 1, color: isActive ? 'var(--gold-main)' : 'inherit' }} />
                {!isCollapsed && (
                  <span style={{ position: 'relative', zIndex: 1, fontSize: '0.9rem', fontWeight: isActive ? '500' : '400', letterSpacing: '0.5px' }}>
                    {item.label}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div style={{ padding: '1.5rem', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'url(/images/hero-premium.png) center/cover', border: '1px solid var(--gold-main)' }} />
          {!isCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>Diretoria</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-main)' }}>Premium Access</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
