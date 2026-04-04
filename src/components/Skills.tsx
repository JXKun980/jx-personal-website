import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillCategory {
  title: string;
  color: string;
  skills: string[];
}

interface Props {
  categories: SkillCategory[];
}

export default function Skills({ categories }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-primary-light to-accent text-transparent bg-clip-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-light to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-2xl bg-surface-light/40 border border-surface-lighter/30"
            >
              <h3 className={`text-lg font-bold mb-4 bg-gradient-to-r ${cat.color} text-transparent bg-clip-text`}>{cat.title}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + j * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-4 py-2 rounded-xl bg-surface/80 border border-surface-lighter/50 text-sm text-text-muted hover:text-text hover:border-primary/50 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
