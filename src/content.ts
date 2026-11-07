// The only file you need to edit.
export const content = {
  name: 'Brandon Wong',

  intro: 'I love solving problems and seeing the results take shape.',
  facts: [
    { label: 'now', value: 'Software engineer in Seattle' },
    { label: 'from', value: 'Queens, New York' },
    { label: 'studied', value: 'Computer science at Stony Brook University' },
  ],

  dayOff: {
    lead: "On a day off, you'll find me",
    activities: ['at the gym', 'playing with my dog', 'out hiking', 'with friends'],
  },

  projects: [
    {
      name: 'Monarch Lite',
      note: 'Self-hosted personal finance app synced via SimpleFIN, built with FastAPI, SQLite, and React.',
      year: '2026',
      href: 'https://github.com/brandon0719/monarch-lite',
    },
    {
      name: 'Smart Parking',
      note: 'Stony Brook campus parking app with an interactive map, parking suggestions, reservations, and an admin dashboard.',
      year: '2025',
      href: 'https://github.com/brandon0719/CSE416-SBU12-P4SBU',
    },
    {
      name: 'Phreddit',
      note: 'Full-stack Reddit-style platform with communities, threaded comments, voting, search, and reputation.',
      year: '2024',
      href: 'https://github.com/brandon0719/reddit-clone',
    },
  ],

  // Newest first. The note is optional.
  experience: [
    {
      company: 'Amazon Web Services',
      role: 'Software Development Engineer',
      dates: 'Sep 2026 – Present',
      location: 'Seattle, WA',
    },
    {
      company: 'Amazon Web Services',
      role: 'Software Development Engineer Intern',
      dates: 'May 2025 – Aug 2025',
      location: 'Seattle, WA',
      note: 'Built serverless permission set analysis across 170+ AWS organizations with Lambda, Step Functions, and EventBridge, making processing 4x faster and cutting related technical debt by over 50%.',
    },
    {
      company: 'Google',
      role: 'Basta G-SWEP Fellow',
      dates: 'Feb 2025 – May 2025',
      location: 'Remote',
      note: 'Completed 10 weeks of pair programming and mentorship with a Google software engineer.',
    },
    {
      company: 'Stony Brook University',
      role: 'Undergraduate Researcher',
      dates: 'Aug 2023 – May 2025',
      location: 'Stony Brook, NY',
      note: 'Built and deployed a health data web app that combines 4 APIs into 8 interactive charts and heatmaps, and analyzed 40+ datasets across 127 districts to find health trends.',
    },
  ],

  email: 'brandonwong.0719@gmail.com',
  socials: [
    { label: 'github', href: 'https://github.com/brandon0719' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/brandon0719/' },
  ],
}
