import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiAward } from 'react-icons/fi';

interface EducationItem {
  degree: string;
  school: string;
  period: string;
  details: string[];
}

interface Props {
  items: EducationItem[];
}

export default function Education({ items }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple/60 via-neon-pink/40 to-transparent" />

          {items.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-neon-purple border-4 border-surface z-10 mt-8" />

              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className="p-6 rounded-2xl bg-surface-light/50 border border-surface-lighter/30 hover:border-neon-purple/40 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                      <FiAward className="text-neon-purple" size={20} />
                    </div>
                    <span className="text-sm text-neon-purple font-medium">{edu.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-1">{edu.degree}</h3>
                  <p className="text-text-muted mb-4">{edu.school}</p>
                  <ul className="space-y-2">
                    {edu.details.map((d, j) => (
                      <li key={j} className="text-sm text-text-muted flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-purple/60 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
