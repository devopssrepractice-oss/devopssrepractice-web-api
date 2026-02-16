import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | DevOps SRE Practice',
  description:
    'Insights, tutorials, and best practices for DevOps, SRE, Kubernetes, CI/CD, and cloud infrastructure.',
  openGraph: {
    title: 'Blog | DevOps SRE Practice',
    description: 'Deep dives into DevOps, SRE, and cloud-native engineering.',
    url: 'https://devopssrepractice.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
