import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

interface Props {
  initials: string;
}

export default function Navbar({ initials }: Props) {
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop side nav */}
      <nav className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 flex-col items-start gap-0">
        {sections.map((section, i) => {
          const isActive = active === section.id;
          return (
            <div key={section.id} className="flex flex-col items-start">
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3 py-2.5"
              >
                {/* Dot */}
                <span
                  className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-accent shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                      : 'bg-surface-lighter group-hover:bg-primary-light'
                  }`}
                />
                {/* Label */}
                <span
                  className={`text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive ? 'text-accent' : 'text-text-muted/40 group-hover:text-text-muted'
                  }`}
                >
                  {section.label}
                </span>
              </a>
              {/* Connecting line */}
              {i < sections.length - 1 && (
                <div className="ml-[3px] w-px h-3 bg-surface-lighter/60" />
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile floating button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-surface-light/80 backdrop-blur-xl border border-surface-lighter/50 flex items-center justify-center text-text-muted hover:text-accent transition-colors"
      >
        {mobileOpen ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-xs font-bold bg-gradient-to-r from-primary-light to-accent text-transparent bg-clip-text">
            {initials}
          </span>
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:hidden fixed inset-0 z-40 bg-surface/90 backdrop-blur-xl flex items-center justify-center"
        >
          <nav className="flex flex-col items-start gap-0">
            {sections.map((section, i) => {
              const isActive = active === section.id;
              return (
                <div key={section.id} className="flex flex-col items-start">
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 py-3"
                  >
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-accent shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                          : 'bg-surface-lighter'
                      }`}
                    />
                    <span
                      className={`text-lg font-medium transition-colors ${
                        isActive ? 'text-accent' : 'text-text-muted'
                      }`}
                    >
                      {section.label}
                    </span>
                  </a>
                  {i < sections.length - 1 && (
                    <div className="ml-[3px] w-px h-2 bg-surface-lighter/60" />
                  )}
                </div>
              );
            })}
          </nav>
        </motion.div>
      )}
    </>
  );
}
