interface Props {
  name: string;
}

export default function Footer({ name }: Props) {
  return (
    <footer className="border-t border-surface-lighter/30 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} {name}. Built with Astro, React & Tailwind CSS.
        </p>
        <p className="text-sm text-text-muted">
          Designed with 💜
        </p>
      </div>
    </footer>
  );
}
