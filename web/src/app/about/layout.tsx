import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | DevOps SRE Practice',
  description:
    'Learn about our team, mission, and how we deliver world-class DevOps and SRE solutions.',
  openGraph: {
    title: 'About | DevOps SRE Practice',
    description: 'Meet the team behind world-class DevOps and SRE solutions.',
    url: 'https://devopssrepractice.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
