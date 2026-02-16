import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News | DevOps SRE Practice',
  description:
    'Latest news, announcements, and updates from DevOps SRE Practice.',
  openGraph: {
    title: 'News | DevOps SRE Practice',
    description: 'Announcements, milestones, and stories from DevOps SRE Practice.',
    url: 'https://devopssrepractice.com/news',
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
