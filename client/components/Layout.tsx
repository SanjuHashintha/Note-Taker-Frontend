import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-Premium Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-gold-900/15 via-purple-900/5 to-gold-800/10"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-navy-800/50 to-navy-950"></div>

      {/* Premium Animated Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-gold-400/8 via-gold-500/4 to-transparent rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/6 via-blue-500/4 to-transparent rounded-full blur-3xl animate-float delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-gold-400/4 via-transparent to-purple-400/4 rounded-full blur-2xl animate-float delay-2000"></div>

      {/* Sophisticated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, white 1px, transparent 0),
            linear-gradient(45deg, transparent 40%, rgba(212, 175, 55, 0.1) 50%, transparent 60%)
          `,
          backgroundSize: '40px 40px, 200px 200px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-gold-400/40 rounded-full animate-sparkle"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-sparkle delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-gold-300/50 rounded-full animate-sparkle delay-2000"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-sparkle delay-3000"></div>
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-gold-400/40 rounded-full animate-wave"></div>
        <div className="absolute top-40 left-20 w-1 h-1 bg-purple-300/40 rounded-full animate-wave delay-1000"></div>
      </div>

      {/* Premium Mesh Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-conic from-gold-400/10 via-transparent to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-conic from-blue-400/10 via-transparent to-gold-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Subtle Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-[120vh] bg-gradient-to-b from-gold-400/5 to-transparent rotate-12 blur-sm"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-[120vh] bg-gradient-to-t from-purple-400/5 to-transparent -rotate-12 blur-sm"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <main className="flex-1 relative">
          {/* Content Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/5 to-navy-950/10 pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
