import Link from 'next/link';
import type { ReactNode } from 'react';

const links = [
  ['/', 'Home'],
  ['/things', 'Things'],
  ['/orders', 'Orders'],
  ['/profile', 'Profile'],
];

export const Layout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <>
    <nav>
      {links.map(([href, label]) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
      <a href="/auth/logout">Sign out</a>
    </nav>
    <main>
      <h1>{title}</h1>
      {children}
    </main>
  </>
);
