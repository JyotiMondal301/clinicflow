import type { Metadata } from 'next';
import './globals.css';
import { ClinicProvider } from '@/components/clinic-provider';
import { AppShell } from '@/components/app-shell';
export const metadata: Metadata = { title: 'ClinicFlow — Clinic & Pharmacy', description: 'A connected clinic and pharmacy workspace.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><ClinicProvider><AppShell>{children}</AppShell></ClinicProvider></body></html>; }
