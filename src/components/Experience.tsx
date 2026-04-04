import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBriefcase } from 'react-icons/fi';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

interface Props {
  items: ExperienceItem[];
}

export default function Experience({ items }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work{' '}
            <span className="bg-gradient-to-r from-accent to-neon-blue text-transparent bg-clip-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-neon-blue mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {items.map((exp, i) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative p-8 rounded-2xl bg-surface-light/50 border border-surface-lighter/30 hover:border-accent/40 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <FiBriefcase className="text-accent" size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text">{exp.title}</h3>
                      <p className="text-text-muted">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-sm text-accent font-medium bg-accent/10 px-3 py-1 rounded-full">{exp.period}</span>
                </div>
                <p className="text-text-muted leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-surface-lighter/50 text-text-muted border border-surface-lighter/50">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
