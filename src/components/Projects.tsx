import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  category: string;
}

interface Props {
  items: Project[];
}

type Category = 'all' | 'code' | 'other';

export default function Projects({ items }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<Category>('all');

  const filtered = filter === 'all' ? items : items.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-neon-pink to-neon-purple text-transparent bg-clip-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-pink to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 mb-12"
        >
          {[
            { value: 'all' as const, label: 'All' },
            { value: 'code' as const, label: 'Code Projects' },
            { value: 'other' as const, label: 'Non-Code' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tab.value
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-surface-light/50 text-text-muted hover:text-text border border-surface-lighter/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col p-6 rounded-2xl bg-surface-light/40 border border-surface-lighter/30 hover:border-neon-purple/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                  <FiFolder className="text-neon-purple" size={24} />
                </div>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
                      <FiGithub size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-text mb-2 group-hover:text-neon-purple transition-colors">{project.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-surface/80 text-text-muted border border-surface-lighter/50">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
