'use client';
import { usePathname, useSearchParams } from 'next/navigation'
import { SessionProvider } from "next-auth/react";

export default function Provider({
  children,
  session
}) {
  const searchParams = useSearchParams();

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
