import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiChevronDown, FiGlobe } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  twitter: FaXTwitter,
  website: FiGlobe,
};

interface Social {
  platform: string;
  url: string;
  label: string;
}

interface Props {
  name: string;
  tagline: string;
  heroGreeting: string;
  heroBadge: string;
  scrollPrompt: string;
  socials: Social[];
}

export default function Hero({ name, tagline, heroGreeting, heroBadge, scrollPrompt, socials }: Props) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px]"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-neon-purple/10 blur-[100px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary-light/40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary-light text-sm font-medium mb-6">
            {heroBadge}
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
        >
          {heroGreeting}{' '}
          <span className="bg-gradient-to-r from-primary-light via-accent to-neon-purple text-transparent bg-clip-text">
            {name}
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
        >
          {tagline}
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
        >
          {socials.map((s) => {
            const Icon = iconMap[s.platform] || FiMail;
            return (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-surface-light/60 border border-surface-lighter/50 text-text-muted hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <motion.a
            href="#about"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm">{scrollPrompt}</span>
            <FiChevronDown size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
