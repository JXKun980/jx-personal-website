import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiGlobe } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  email: FiMail,
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FaXTwitter,
  website: FiGlobe,
  location: FiMapPin,
};

interface Social {
  platform: string;
  url: string;
  label: string;
}

interface Props {
  contactMessage: string;
  socials: Social[];
  location: string;
}

export default function Contact({ contactMessage, socials, location }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const contactLinks = [
    ...socials.map((s) => ({
      icon: s.platform,
      label: s.url.replace('mailto:', '').replace('https://', ''),
      href: s.url,
    })),
    { icon: 'location', label: location, href: '#' },
  ];

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's{' '}
            <span className="bg-gradient-to-r from-accent to-primary-light text-transparent bg-clip-text">Connect</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full mb-8" />
          <p className="text-text-muted text-lg max-w-xl mx-auto mb-12">{contactMessage}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-16">
          {contactLinks.map((link, i) => {
            const Icon = iconMap[link.icon] || FiMail;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-surface-light/50 border border-surface-lighter/30 hover:border-accent/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon className="text-accent" size={18} />
                </div>
                <span className="text-sm text-text-muted group-hover:text-text transition-colors">{link.label}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
