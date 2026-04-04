import { motion } from 'framer-motion';

interface Props {
  name: string;
}

export default function Footer({ name }: Props) {
  return (
    <footer className="border-t border-surface-lighter/30 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          className="text-sm text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} {name}. Built with Astro, React & Tailwind CSS.
        </motion.p>
        <motion.p
          className="text-sm text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Designed with 💜
        </motion.p>
      </div>
    </footer>
  );
}
