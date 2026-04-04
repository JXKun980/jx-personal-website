import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    profile: singleton({
      label: 'Profile',
      path: 'src/content/profile',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Full Name' }),
        initials: fields.text({ label: 'Initials (for navbar)' }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
        heroGreeting: fields.text({ label: 'Hero Greeting' }),
        heroBadge: fields.text({ label: 'Hero Badge Text' }),
        scrollPrompt: fields.text({ label: 'Scroll Prompt Text' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        location: fields.text({ label: 'Location' }),
        contactMessage: fields.text({ label: 'Contact Section Message', multiline: true }),
        socials: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Platform',
              options: [
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Email', value: 'email' },
                { label: 'Twitter/X', value: 'twitter' },
                { label: 'Website', value: 'website' },
              ],
              defaultValue: 'github',
            }),
            url: fields.text({ label: 'URL' }),
            label: fields.text({ label: 'Display Label' }),
          }),
          {
            label: 'Social Links',
            itemLabel: (props) => props.fields.label.value || 'Social Link',
          }
        ),
        highlights: fields.array(
          fields.object({
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Code', value: 'code' },
                { label: 'CPU/Tech', value: 'cpu' },
                { label: 'Users/Teaching', value: 'users' },
                { label: 'Book/Learning', value: 'book' },
                { label: 'Zap/Energy', value: 'zap' },
                { label: 'Globe/World', value: 'globe' },
              ],
              defaultValue: 'code',
            }),
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          {
            label: 'Highlight Cards',
            itemLabel: (props) => props.fields.title.value || 'Highlight',
          }
        ),
        education: fields.array(
          fields.object({
            degree: fields.text({ label: 'Degree' }),
            school: fields.text({ label: 'School' }),
            period: fields.text({ label: 'Time Period' }),
            details: fields.array(fields.text({ label: 'Detail' }), {
              label: 'Details / Bullet Points',
              itemLabel: (props) => props.value || 'Detail',
            }),
          }),
          {
            label: 'Education',
            itemLabel: (props) => props.fields.degree.value || 'Degree',
          }
        ),
        experience: fields.array(
          fields.object({
            title: fields.text({ label: 'Job Title' }),
            company: fields.text({ label: 'Company' }),
            period: fields.text({ label: 'Time Period' }),
            description: fields.text({ label: 'Description', multiline: true }),
            tech: fields.array(fields.text({ label: 'Technology' }), {
              label: 'Technologies',
              itemLabel: (props) => props.value || 'Tech',
            }),
          }),
          {
            label: 'Work Experience',
            itemLabel: (props) => props.fields.title.value || 'Position',
          }
        ),
        projects: fields.array(
          fields.object({
            title: fields.text({ label: 'Project Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
            category: fields.select({
              label: 'Category',
              options: [
                { label: 'Code Project', value: 'code' },
                { label: 'Non-Code Project', value: 'other' },
              ],
              defaultValue: 'code',
            }),
            github: fields.text({ label: 'GitHub URL' }),
            live: fields.text({ label: 'Live Demo URL' }),
            tech: fields.array(fields.text({ label: 'Technology' }), {
              label: 'Technologies',
              itemLabel: (props) => props.value || 'Tech',
            }),
          }),
          {
            label: 'Projects',
            itemLabel: (props) => props.fields.title.value || 'Project',
          }
        ),
        skills: fields.array(
          fields.object({
            title: fields.text({ label: 'Category Title' }),
            color: fields.select({
              label: 'Gradient Color',
              options: [
                { label: 'Indigo → Light Indigo', value: 'from-primary to-primary-light' },
                { label: 'Cyan → Light Cyan', value: 'from-accent to-accent-light' },
                { label: 'Purple → Pink', value: 'from-neon-purple to-neon-pink' },
                { label: 'Blue → Cyan', value: 'from-neon-blue to-accent' },
              ],
              defaultValue: 'from-primary to-primary-light',
            }),
            skills: fields.array(fields.text({ label: 'Skill' }), {
              label: 'Skills',
              itemLabel: (props) => props.value || 'Skill',
            }),
          }),
          {
            label: 'Skill Categories',
            itemLabel: (props) => props.fields.title.value || 'Category',
          }
        ),
      },
    }),
  },
});
