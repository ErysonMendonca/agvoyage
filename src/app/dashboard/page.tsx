"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Users, TrendingUp, CalendarCheck, MapPin, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import Image from 'next/image';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } }
};

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-white)' }}>
            Overview Executivo
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>Métricas em tempo real da AG Voyage.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ background: 'var(--gold-main)', color: '#000', border: 'none', padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 20px rgba(197, 160, 40, 0.2)' }}
        >
          Gerar Relatório
        </motion.button>
      </div>

      {/* Advanced Bento Grid */}
      <div className="bento-grid">
        
        {/* Main Revenue Card */}
        <motion.div variants={itemVariants} className="glass-panel premium-border" style={{ gridColumn: 'span 2', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Faturamento Mensal</div>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', lineHeight: 1 }}>R$ 1.2M</div>
            </div>
            <div style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', padding: '0.5rem 1rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
              <ArrowUpRight size={18} /> +24.5%
            </div>
          </div>
          <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '4px', marginTop: '2rem' }}>
            {/* Mock Chart Bars */}
            {[40, 60, 45, 80, 50, 90, 75, 100, 85, 120].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                style={{ flex: 1, background: i === 9 ? 'var(--gold-main)' : 'rgba(255,255,255,0.1)', borderRadius: '4px 4px 0 0' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Highlight Service Card */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: 0, position: 'relative' }}>
          <Image src="/images/hero-premium.png" alt="Visto" fill style={{ objectFit: 'cover', opacity: 0.4 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--primary-navy), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 10, padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ background: 'var(--gold-main)', color: '#000', padding: '0.3rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '1rem' }}>EM ALTA</div>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Visto Express Portugal</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>45 novas solicitações nesta semana.</p>
          </div>
        </motion.div>

        {/* Stats */}
        <StatCard title="Clientes Ativos" value="1,284" icon={Users} trend="+12%" positive={true} />
        <StatCard title="Taxa de Conversão" value="68%" icon={Activity} trend="-2%" positive={false} />

        {/* Recent Activity List */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ gridColumn: 'span 2', padding: '2rem' }}>
          <h3 className="gold-text" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Últimas Movimentações</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ActivityRow user="João Silva" action="Pagamento Confirmado" target="Reserva Maldivas" time="10 min atrás" amount="R$ 45.000" status="approved" />
            <ActivityRow user="Maria Eduarda" action="Solicitação Iniciada" target="Visto Express PT" time="1h atrás" amount="R$ 2.500" status="pending" />
            <ActivityRow user="Roberto Carlos" action="Contrato Assinado" target="Cruzeiro Dubai" time="3h atrás" amount="R$ 82.000" status="approved" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function StatCard({ title, value, icon: Icon, trend, positive }: { title: string, value: string, icon: any, trend: string, positive: boolean }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="glass-panel" 
      style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
          <Icon size={24} className="gold-text" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: positive ? '#4ade80' : '#f87171', fontSize: '0.9rem', fontWeight: 'bold' }}>
          {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#fff', fontWeight: '800', lineHeight: 1.2 }}>{value}</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{title}</p>
      </div>
    </motion.div>
  );
}

function ActivityRow({ user, action, target, time, amount, status }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.3s ease', cursor: 'pointer' }}
         onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
         onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-main), #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '0.8rem' }}>
          {user.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.95rem' }}>{user}</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{action} • <span style={{ color: 'var(--gold-main)' }}>{target}</span></div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>{amount}</div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>{time}</div>
      </div>
    </div>
  );
}
