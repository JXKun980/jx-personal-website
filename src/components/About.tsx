import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCode, FiCpu, FiBookOpen, FiUsers, FiZap, FiGlobe } from 'react-icons/fi';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  code: FiCode,
  cpu: FiCpu,
  users: FiUsers,
  book: FiBookOpen,
  zap: FiZap,
  globe: FiGlobe,
};

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  bio: string;
  highlights: Highlight[];
}

export default function About({ bio, highlights }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-accent to-primary-light text-transparent bg-clip-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative p-8 md:p-12 rounded-2xl bg-surface-light/50 border border-surface-lighter/30 backdrop-blur-sm mb-16"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5" />
          <p className="relative text-lg text-text-muted leading-relaxed">{bio}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => {
            const Icon = iconMap[item.icon] || FiCode;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="group p-6 rounded-2xl bg-surface-light/40 border border-surface-lighter/30 hover:border-accent/40 transition-all duration-300 hover:bg-surface-light/60"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="text-accent" size={24} />
                </div>
                <h3 className="font-semibold text-text mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
