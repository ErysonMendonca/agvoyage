"use client";

import React from 'react';
import Sidebar from './Sidebar';
import { Search, Bell, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--primary-navy)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Premium Ambient Background */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(197, 160, 40, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(10, 25, 47, 0.8) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Sidebar />
      
      <main style={{ 
        flex: 1, 
        padding: '1rem 2rem 2rem 1rem', 
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Innovative Top Navigation */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          padding: '1rem 2rem',
          background: 'rgba(10, 25, 47, 0.4)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.03)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            AG VOYAGE <span style={{ color: 'var(--gold-main)', margin: '0 0.5rem' }}>/</span> WORKSPACE
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {/* Global Search */}
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.3)', 
              padding: '0.6rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' 
            }}>
              <Search size={16} color="var(--gold-main)" />
              <input 
                type="text" 
                placeholder="Buscar clientes, reservas..." 
                style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.85rem', width: '200px' }}
              />
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.6rem', color: '#fff' }}>⌘K</div>
            </div>

            <motion.button whileHover={{ scale: 1.1 }} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: 'var(--gold-main)', borderRadius: '50%' }} />
            </motion.button>
            
            <motion.button whileHover={{ scale: 1.1 }} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <Calendar size={20} />
            </motion.button>
          </div>
        </header>

        {/* Page Content Viewport */}
        <div style={{ flex: 1 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
