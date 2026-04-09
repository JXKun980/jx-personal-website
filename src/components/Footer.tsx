interface Props {
  name: string;
}

export default function Footer({ name }: Props) {
  return (
    <footer className="border-t border-surface-lighter/30 py-8 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} {name}. Built with Astro, React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
