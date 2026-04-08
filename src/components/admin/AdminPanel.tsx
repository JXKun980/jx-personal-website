import { useState, useEffect, useCallback } from 'react';
import { TextField, SelectField, StringArrayField, ObjectArrayField } from './fields';

const platformOptions = [
  { label: 'GitHub', value: 'github' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Email', value: 'email' },
  { label: 'Twitter/X', value: 'twitter' },
  { label: 'Website', value: 'website' },
];

const iconOptions = [
  { label: 'Code', value: 'code' },
  { label: 'CPU/Tech', value: 'cpu' },
  { label: 'Users/Teaching', value: 'users' },
  { label: 'Book/Learning', value: 'book' },
  { label: 'Zap/Energy', value: 'zap' },
  { label: 'Globe/World', value: 'globe' },
];

const categoryOptions = [
  { label: 'Code Project', value: 'code' },
  { label: 'Non-Code Project', value: 'other' },
];

const colorOptions = [
  { label: 'Indigo → Light Indigo', value: 'from-primary to-primary-light' },
  { label: 'Cyan → Light Cyan', value: 'from-accent to-accent-light' },
  { label: 'Purple → Pink', value: 'from-neon-purple to-neon-pink' },
  { label: 'Blue → Cyan', value: 'from-neon-blue to-accent' },
];

interface Section {
  key: string;
  label: string;
}

const sections: Section[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'about', label: 'About' },
  { key: 'socials', label: 'Socials' },
  { key: 'highlights', label: 'Highlights' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
];

export default function AdminPanel() {
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const update = useCallback((key: string, value: any) => {
    setData((prev: any) => ({ ...prev, [key]: value }));
  }, []);

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Saved successfully' });
      } else {
        setStatus({ type: 'error', msg: 'Failed to save' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error' });
    }
    setSaving(false);
    setTimeout(() => setStatus(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-text-muted">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-red-400">
        Failed to load content
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-text font-sans flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-surface-light border-r border-surface-lighter/50 flex flex-col h-screen sticky top-0">
        <div className="p-5 border-b border-surface-lighter/50">
          <a href="/" className="text-lg font-bold bg-gradient-to-r from-primary-light to-accent text-transparent bg-clip-text">
            Admin Panel
          </a>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                active === s.key
                  ? 'bg-primary/15 text-primary-light font-medium'
                  : 'text-text-muted hover:text-text hover:bg-surface-lighter/30'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-surface-lighter/50">
          <a href="/" className="block text-xs text-text-muted hover:text-accent text-center transition-colors">
            ← Back to site
          </a>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl border-b border-surface-lighter/50 px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-text">
            {sections.find((s) => s.key === active)?.label}
          </h1>
          <div className="flex items-center gap-3">
            {status && (
              <span className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {status.msg}
              </span>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-light text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </header>

        {/* Form content */}
        <div className="p-8 max-w-3xl">
          {active === 'profile' && <ProfileSection data={data} update={update} />}
          {active === 'about' && <AboutSection data={data} update={update} />}
          {active === 'socials' && <SocialsSection data={data} update={update} />}
          {active === 'highlights' && <HighlightsSection data={data} update={update} />}
          {active === 'education' && <EducationSection data={data} update={update} />}
          {active === 'experience' && <ExperienceSection data={data} update={update} />}
          {active === 'projects' && <ProjectsSection data={data} update={update} />}
          {active === 'skills' && <SkillsSection data={data} update={update} />}
        </div>
      </main>
    </div>
  );
}

interface SectionProps {
  data: any;
  update: (key: string, value: any) => void;
}

function ProfileSection({ data, update }: SectionProps) {
  return (
    <>
      <TextField label="Full Name" value={data.name || ''} onChange={(v) => update('name', v)} />
      <TextField label="Initials (navbar)" value={data.initials || ''} onChange={(v) => update('initials', v)} />
      <TextField label="Tagline" value={data.tagline || ''} onChange={(v) => update('tagline', v)} multiline />
      <TextField label="Hero Greeting" value={data.heroGreeting || ''} onChange={(v) => update('heroGreeting', v)} placeholder="Hi, I'm" />
      <TextField label="Hero Badge Text" value={data.heroBadge || ''} onChange={(v) => update('heroBadge', v)} />
      <TextField label="Scroll Prompt" value={data.scrollPrompt || ''} onChange={(v) => update('scrollPrompt', v)} />
    </>
  );
}

function AboutSection({ data, update }: SectionProps) {
  return (
    <>
      <TextField label="Bio" value={data.bio || ''} onChange={(v) => update('bio', v)} multiline />
      <TextField label="Location" value={data.location || ''} onChange={(v) => update('location', v)} />
      <TextField label="Contact Message" value={data.contactMessage || ''} onChange={(v) => update('contactMessage', v)} multiline />
    </>
  );
}

function SocialsSection({ data, update }: SectionProps) {
  return (
    <ObjectArrayField
      label="Social Links"
      items={data.socials || []}
      onChange={(v) => update('socials', v)}
      itemLabel={(item) => item.label || item.url || 'New Link'}
      defaultItem={{ platform: 'github', url: '', label: '' }}
      renderFields={(item, _i, updateItem) => (
        <>
          <SelectField label="Platform" value={item.platform} onChange={(v) => updateItem({ ...item, platform: v })} options={platformOptions} />
          <TextField label="URL" value={item.url} onChange={(v) => updateItem({ ...item, url: v })} />
          <TextField label="Display Label" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
        </>
      )}
    />
  );
}

function HighlightsSection({ data, update }: SectionProps) {
  return (
    <ObjectArrayField
      label="Highlight Cards"
      items={data.highlights || []}
      onChange={(v) => update('highlights', v)}
      itemLabel={(item) => item.title || 'New Card'}
      defaultItem={{ icon: 'code', title: '', description: '' }}
      renderFields={(item, _i, updateItem) => (
        <>
          <SelectField label="Icon" value={item.icon} onChange={(v) => updateItem({ ...item, icon: v })} options={iconOptions} />
          <TextField label="Title" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
          <TextField label="Description" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} multiline />
        </>
      )}
    />
  );
}

function EducationSection({ data, update }: SectionProps) {
  return (
    <ObjectArrayField
      label="Education"
      items={data.education || []}
      onChange={(v) => update('education', v)}
      itemLabel={(item) => item.degree || 'New Entry'}
      defaultItem={{ degree: '', school: '', period: '', details: [] }}
      renderFields={(item, _i, updateItem) => (
        <>
          <TextField label="Degree" value={item.degree} onChange={(v) => updateItem({ ...item, degree: v })} />
          <TextField label="School" value={item.school} onChange={(v) => updateItem({ ...item, school: v })} />
          <TextField label="Time Period" value={item.period} onChange={(v) => updateItem({ ...item, period: v })} />
          <StringArrayField label="Details / Bullet Points" items={item.details || []} onChange={(v) => updateItem({ ...item, details: v })} placeholder="Detail..." />
        </>
      )}
    />
  );
}

function ExperienceSection({ data, update }: SectionProps) {
  return (
    <ObjectArrayField
      label="Work Experience"
      items={data.experience || []}
      onChange={(v) => update('experience', v)}
      itemLabel={(item) => (item.title && item.company ? `${item.title} @ ${item.company}` : item.title || 'New Entry')}
      defaultItem={{ title: '', company: '', period: '', description: '', tech: [] }}
      renderFields={(item, _i, updateItem) => (
        <>
          <TextField label="Job Title" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
          <TextField label="Company" value={item.company} onChange={(v) => updateItem({ ...item, company: v })} />
          <TextField label="Time Period" value={item.period} onChange={(v) => updateItem({ ...item, period: v })} />
          <TextField label="Description" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} multiline />
          <StringArrayField label="Technologies" items={item.tech || []} onChange={(v) => updateItem({ ...item, tech: v })} placeholder="Technology..." />
        </>
      )}
    />
  );
}

function ProjectsSection({ data, update }: SectionProps) {
  return (
    <ObjectArrayField
      label="Projects"
      items={data.projects || []}
      onChange={(v) => update('projects', v)}
      itemLabel={(item) => item.title || 'New Project'}
      defaultItem={{ title: '', description: '', category: 'code', github: '', live: '', tech: [] }}
      renderFields={(item, _i, updateItem) => (
        <>
          <TextField label="Project Title" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
          <TextField label="Description" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} multiline />
          <SelectField label="Category" value={item.category} onChange={(v) => updateItem({ ...item, category: v })} options={categoryOptions} />
          <TextField label="GitHub URL" value={item.github} onChange={(v) => updateItem({ ...item, github: v })} placeholder="https://github.com/..." />
          <TextField label="Live Demo URL" value={item.live} onChange={(v) => updateItem({ ...item, live: v })} placeholder="https://..." />
          <StringArrayField label="Technologies" items={item.tech || []} onChange={(v) => updateItem({ ...item, tech: v })} placeholder="Technology..." />
        </>
      )}
    />
  );
}

function SkillsSection({ data, update }: SectionProps) {
  return (
    <ObjectArrayField
      label="Skill Categories"
      items={data.skills || []}
      onChange={(v) => update('skills', v)}
      itemLabel={(item) => item.title || 'New Category'}
      defaultItem={{ title: '', color: 'from-primary to-primary-light', skills: [] }}
      renderFields={(item, _i, updateItem) => (
        <>
          <TextField label="Category Title" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
          <SelectField label="Gradient Color" value={item.color} onChange={(v) => updateItem({ ...item, color: v })} options={colorOptions} />
          <StringArrayField label="Skills" items={item.skills || []} onChange={(v) => updateItem({ ...item, skills: v })} placeholder="Skill name..." />
        </>
      )}
    />
  );
}
