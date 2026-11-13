import React, { useState, useEffect } from 'react';
import {
  Home,
  User,
  GraduationCap,
  Wrench,
  Cpu,
  Award,
  Heart,
  BookOpen,
  Image as ImageIcon,
  FolderHeart,
  Mail,
  Menu,
  X,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'tools', label: 'My Tools', icon: Cpu },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'journal', label: 'My Journal', icon: BookOpen },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'memories', label: 'Memories', icon: FolderHeart },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const Sidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const location = useLocation();
  const { isAdmin } = useAuth();
  const isHomePage = location.pathname === '/';

  // Intersection observer to track active section while scrolling on home page
  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 glass-panel border-b border-pastel-border px-4 flex items-center justify-between shadow-xs">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-pastel-deep text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-xs">
            TT
          </div>
          <span className="font-bold text-sm text-pastel-text tracking-tight">
            Cao Đức Tiến Thành
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="px-2.5 py-1 rounded-lg bg-pastel-light/60 text-pastel-deep text-xs font-semibold flex items-center gap-1 border border-pastel-primary/40"
            >
              <Shield className="w-3.5 h-3.5 text-pastel-accent" />
              <span>CMS</span>
            </Link>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-pastel-deep hover:bg-pastel-light/40 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-pastel-deep/40 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container: Fixed on Desktop, Drawer on Mobile */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white/90 lg:bg-white/80 backdrop-blur-xl border-r border-pastel-border flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header / Brand */}
        <div className="p-6 border-b border-pastel-border/80">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pastel-deep to-pastel-text text-white flex items-center justify-center font-extrabold text-lg shadow-soft group-hover:scale-105 transition-transform duration-300">
                TT
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-pastel-accent border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-base text-pastel-text leading-tight tracking-tight">
                Cao Đức Tiến Thành
              </h1>
              <p className="text-xs font-medium text-pastel-subtext font-mono mt-0.5">
                PORTFOLIO & TOOLS
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isHomePage && activeSection === item.id;

            return (
              <a
                key={item.id}
                href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }
                }}
                className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'text-pastel-deep bg-pastel-light/60 font-semibold shadow-xs'
                    : 'text-pastel-subtext hover:text-pastel-text hover:bg-pastel-bg/80'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-md bg-pastel-accent" />
                )}
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-pastel-accent' : 'text-pastel-subtext/80'
                  }`}
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Bottom Footer Area */}
        <div className="p-4 border-t border-pastel-border/80 bg-pastel-bg/40 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-pastel-subtext px-1">
            <span>TOEIC 600 • CAD</span>
            <span className="text-[10px] text-pastel-accent font-semibold">BK-HCMUT</span>
          </div>

          <Link
            to={isAdmin ? '/admin/dashboard' : '/admin/login'}
            className="w-full py-2.5 px-3 rounded-xl border border-pastel-border hover:border-pastel-primary bg-white hover:bg-pastel-light/30 text-pastel-deep text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Shield className="w-3.5 h-3.5 text-pastel-accent" />
            <span>{isAdmin ? 'Trang Quản trị CMS' : 'Quản trị viên (CMS)'}</span>
            <ExternalLink className="w-3 h-3 text-pastel-subtext" />
          </Link>
        </div>
      </aside>
    </>
  );
};
