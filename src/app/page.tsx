"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Diamond, Globe, ShieldCheck, Plane, CheckCircle, ArrowRight, Play, Heart, MapPin, ChevronRight, ChevronLeft, Star } from "lucide-react";
import Link from 'next/link';

// ==========================================
// 1. NAVBAR COMPONENT
// ==========================================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10, 20, 40, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.1)' : '1px solid transparent',
        transition: 'all 0.3s ease', padding: '1rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
        <div style={{ position: 'relative' }}>
          <span className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--gold-main)', fontWeight: 'bold' }}>AG</span>
          <motion.div animate={{ x: [0, 10, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', top: '-5px', right: '-15px' }}>
            <Plane size={12} color="var(--gold-main)" style={{ transform: 'rotate(45deg)' }} />
          </motion.div>
        </div>
        <span style={{ fontSize: '1.2rem', color: '#fff', letterSpacing: '2px', fontWeight: '500' }}>VOYAGE</span>
      </div>

      <div style={{ gap: '2rem' }} className="desktop-only-flex">
        {['Destinos', 'Experiências', 'Vistos & Imigração', 'Lazer', 'Negócios', 'Personalizados'].map(item => (
          <span key={item} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
            {item}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', cursor: 'pointer' }}>PT-BR</span>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }} whileTap={{ scale: 0.95 }}
          style={{ background: 'var(--gold-main)', color: '#0A1428', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Fale Conosco
        </motion.button>
      </div>
    </motion.nav>
  );
};

// ==========================================
// 2. DREAM PATH ENGINE (Global Effect)
// ==========================================
const DreamPathEngine = () => {
  const [trails, setTrails] = useState<{ id: number, x: number, y: number, size: number }[]>([]);
  let idCounter = 0;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gera partículas com muito mais frequência (80% das vezes que o mouse move)
      if (Math.random() > 0.2) {
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        const size = Math.random() * 4 + 2; // Tamanho entre 2px e 6px
        
        setTrails(prev => [...prev, { 
          id: idCounter++, 
          x: e.clientX + offsetX, 
          y: e.clientY + offsetY,
          size 
        }].slice(-60)); // Mantém até 60 partículas na tela
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <AnimatePresence>
        {trails.map(trail => (
          <motion.div 
            key={trail.id} 
            initial={{ opacity: 1, scale: 1 }} 
            animate={{ opacity: 0, scale: 0.5, y: -40, x: (Math.random() - 0.5) * 50 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ 
              position: 'absolute', left: trail.x, top: trail.y, 
              width: `${trail.size}px`, height: `${trail.size}px`, 
              background: 'var(--gold-light)', borderRadius: '50%', 
              boxShadow: '0 0 15px 2px var(--gold-main)' 
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function UltraPremiumPage() {
  const { scrollYProgress } = useScroll();
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main style={{ background: 'var(--primary-navy)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <DreamPathEngine />

      {/* HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Background Visuals */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="/images/hero-premium.png" alt="AG Voyage Global" fill sizes="100vw" style={{ objectFit: 'cover', filter: 'brightness(0.6) contrast(1.2)' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--primary-navy) 100%)' }} />
          {/* Cyber-luxury Grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        {/* Massive Glass Viewport */}
        <div style={{ position: 'absolute', inset: '5%', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '40px', background: 'rgba(10, 20, 40, 0.2)', backdropFilter: 'blur(5px)', pointerEvents: 'none', zIndex: 1, boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }} />

        {/* Hero Content */}
        <motion.div style={{ position: 'relative', zIndex: 10, textAlign: 'center', y: yHeroText, opacity: opacityHeroText, maxWidth: '1000px', padding: '0 2rem' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          >
            Destinos Incríveis. <br/>
            <span style={{ background: 'linear-gradient(to right, var(--gold-light), var(--gold-main))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Experiências que Transformam.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '2px', marginBottom: '3rem', textTransform: 'uppercase' }}
          >
            Você sonha. A gente realiza.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }} style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <button style={{ background: 'var(--gold-main)', color: '#0A1428', border: 'none', padding: '1.2rem 3rem', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }}>
              Explorar Destinos
            </button>
            <button style={{ background: 'transparent', color: 'var(--cyan-accent)', border: '1px solid var(--cyan-accent)', padding: '1.2rem 3rem', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px rgba(0, 230, 204, 0.1)' }}>
              Iniciar Consultoria
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', bottom: '2rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--gold-main)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold-main), transparent)' }} />
          <Plane size={16} color="var(--gold-main)" style={{ transform: 'rotate(180deg)' }} />
        </motion.div>
      </section>

      {/* DESTINOS EM DESTAQUE (Carousel) */}
      <section style={{ padding: '8rem 4rem', position: 'relative' }}>
        <h2 className="font-serif" style={{ fontSize: '3rem', color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>
          Nossos Destinos em <span style={{ color: 'var(--gold-main)' }}>Destaque</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem', scrollbarWidth: 'none' }}>
          {[
            { name: "Dubai", price: "R$ 15.000" },
            { name: "Santorini", price: "R$ 12.500" },
            { name: "Maldivas", price: "R$ 25.000" },
            { name: "Paris", price: "R$ 10.000" }
          ].map((dest, i) => (
            <motion.div 
              key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              style={{ minWidth: '350px', height: '500px', borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)', cursor: 'pointer' }}
            >
              <Image src="/images/hero-premium.png" alt={dest.name} fill sizes="(max-width: 768px) 100vw, 350px" style={{ objectFit: 'cover', filter: 'brightness(0.7)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--primary-navy), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
                <h3 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--gold-main)', marginBottom: '0.5rem' }}>{dest.name}</h3>
                <p style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.5rem' }}>A partir de {dest.price}</p>
                <button style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Ver Roteiro <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIÊNCIAS QUE TRANSFORMAM */}
      <section style={{ padding: '8rem 4rem', background: 'var(--secondary-navy)', position: 'relative' }}>
        <h2 className="font-serif" style={{ fontSize: '3rem', color: '#fff', marginBottom: '1rem', textAlign: 'center' }}>
          Experiências que <span style={{ color: 'var(--cyan-accent)' }}>Transformam</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '4rem', fontSize: '1.2rem' }}>Curadoria especializada para cada momento da sua vida.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {[
            { title: "Românticas", icon: Heart },
            { title: "Corporativas", icon: Globe },
            { title: "Aventuras", icon: MapPin },
            { title: "Famílias", icon: ShieldCheck },
            { title: "Culturais", icon: Diamond },
            { title: "Bem-Estar", icon: Star }
          ].map((exp, i) => (
            <motion.div 
              key={i}
              animate={{ boxShadow: ['0 0 0px rgba(212,175,55,0)', '0 0 20px rgba(212,175,55,0.2)', '0 0 0px rgba(212,175,55,0)'] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
              style={{ height: '250px', background: 'rgba(10,20,40,0.8)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url(/images/hero-premium.png)', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'all 0.5s ease' }} className="hover-bg-zoom" />
              <exp.icon size={40} color="var(--gold-main)" style={{ marginBottom: '1rem', position: 'relative', zIndex: 2 }} />
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', position: 'relative', zIndex: 2 }}>{exp.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONSULTORIA VISTO EXPRESS */}
      <section style={{ padding: '8rem 10vw', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '2rem' }}>
              Consultoria Visto Express <br/> <span style={{ color: 'var(--gold-main)' }}>Simples e Eficiente</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { title: "Análise de Perfil", desc: "Avaliação completa para o melhor tipo de visto." },
                { title: "Dossiê Completo", desc: "Montagem da pasta documental exigida." },
                { title: "Assessoria Jurídica", desc: "Acompanhamento até a emissão." }
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                    <CheckCircle size={24} color="var(--gold-main)" />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ background: 'var(--gold-main)', color: '#0A1428', border: 'none', padding: '1rem 2.5rem', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }}>
              Fale Conosco Agora
            </button>
          </div>
          <div style={{ position: 'relative', height: '600px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
             <Image src="/images/hero-premium.png" alt="Portugal Visto" fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
             <div style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(10,20,40,0.9)', backdropFilter: 'blur(10px)', border: '1px solid var(--gold-main)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                <span style={{ color: 'var(--gold-main)', fontSize: '2rem', fontWeight: 'bold', display: 'block' }}>10% OFF</span>
                <span style={{ color: '#fff', fontSize: '0.8rem', textTransform: 'uppercase' }}>Nas Primeiras Consultas</span>
             </div>
          </div>
        </div>
      </section>

      {/* POR QUE ESCOLHER */}
      <section style={{ padding: '6rem 4rem', background: 'var(--secondary-navy)' }}>
        <h2 className="font-serif" style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '4rem', textAlign: 'center' }}>Por Que Escolher a AG Voyage</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {[
            { icon: Diamond, title: "Exclusividade em Cada Detalhe" },
            { icon: Globe, title: "Destinos ao Redor do Mundo" },
            { icon: Star, title: "Atendimento Personalizado" },
            { icon: ShieldCheck, title: "Segurança e Confiança" }
          ].map((feat, i) => (
            <motion.div 
              key={i} 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 + i * 0.2, ease: "easeInOut" }}
              whileHover={{ y: -20, scale: 1.02 }} 
              style={{ background: 'rgba(10,20,40,0.5)', border: '1px solid rgba(255,255,255,0.05)', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                <feat.icon size={40} color="var(--gold-main)" style={{ margin: '0 auto 1.5rem auto' }} />
              </motion.div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>{feat.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#050a14', padding: '6rem 4rem 2rem 4rem', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--gold-main)', fontWeight: 'bold' }}>AG</span>
              <span style={{ fontSize: '1rem', color: '#fff', letterSpacing: '2px', fontWeight: '500' }}>VOYAGE</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6 }}>Viagens Nacionais e Internacionais | Lazer | Negócios | Experiências Personalizadas.</p>
          </div>
          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Links Rápidos</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                <li>Destinos</li>
                <li>Experiências</li>
                <li>Vistos</li>
                <li>Contato</li>
              </ul>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Newsletter</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="email" placeholder="Seu e-mail" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', padding: '0.8rem', borderRadius: '4px', color: '#fff', width: '100%' }} />
              <button style={{ background: 'var(--gold-main)', border: 'none', padding: '0 1rem', borderRadius: '4px', cursor: 'pointer' }}><ChevronRight size={20} color="#000" /></button>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
          © 2026 AG Voyage. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}
