import type React from 'react';
import './globals.css';
import { Navbar } from '@/components/navbar';
import RadialGradient from '@/components/ui/radial-gradient';
import { Vortex } from '@/components/ui/vortex';

export const metadata = {
  title: 'Teyik0 - Portfolio 2025',
  description: 'Discover my portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className="relative m-0 overflow-x-hidden bg-black p-0 font-mono">
        <Vortex
          backgroundColor="black"
          baseHue={80}
          className="min-h-screen w-full"
          particleCount={200}
          rangeY={100}
        >
          <Navbar />
          {children}
        </Vortex>
        <RadialGradient size={700} />
      </body>
    </html>
  );
}
