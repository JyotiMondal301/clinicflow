'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Bell, CalendarDays, ChevronDown, ClipboardList, CreditCard, LayoutDashboard, LogOut, Package, Search, Settings, UserRound, Users, Plus, Stethoscope, X } from 'lucide-react';
import { useClinic } from '@/components/clinic-provider';
import { PrescriptionModal } from '@/components/prescription-modal';

const nav=[{label:'Overview',href:'/dashboard',icon:LayoutDashboard},{label:'Patients',href:'/patients',icon:Users},{label:'Appointments',href:'/dashboard#appointments',icon:CalendarDays},{label:'Prescriptions',href:'/dashboard#prescriptions',icon:ClipboardList},{label:'Pharmacy & POS',href:'/pharmacy',icon:Package},{label:'Billing',href:'/dashboard#billing',icon:CreditCard}];
type Role='Doctor'|'Pharmacist'|'Admin';

export function AppShell({children}:{children:React.ReactNode}){
  const path=usePathname();
  const {role,setRole}=useClinic();
  const [roleOpen,setRoleOpen]=useState(false);
  const [profileOpen,setProfileOpen]=useState(false);
  const [visitOpen,setVisitOpen]=useState(false);
  const [signedOut,setSignedOut]=useState(false);
  const [notice,setNotice]=useState('');
  const roleMenu=useRef<HTMLDivElement>(null);
  const profileMenu=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const close=(event:MouseEvent)=>{
      const target=event.target as Node;
      if(!roleMenu.current?.contains(target))setRoleOpen(false);
      if(!profileMenu.current?.contains(target))setProfileOpen(false);
    };
    document.addEventListener('mousedown',close);
    return()=>document.removeEventListener('mousedown',close);
  },[]);

  const chooseRole=(next:Role)=>{setRole(next);setRoleOpen(false);setNotice(`Workspace switched to ${next}.`);window.setTimeout(()=>setNotice(''),2400);};
  const logout=()=>{setProfileOpen(false);setSignedOut(true);};

  return <div className="min-h-screen bg-canvas">
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] flex-col border-r border-line bg-white lg:flex">
      <div className="flex h-[76px] items-center gap-3 border-b border-line px-6"><div className="grid h-9 w-9 place-items-center rounded-xl bg-teal text-white"><Activity size={20}/></div><div><div className="text-[16px] font-bold tracking-tight">care<span className="text-teal">well</span></div><div className="text-[10px] font-medium uppercase tracking-[.14em] text-muted">Clinic & Pharmacy</div></div></div>
      <div className="px-4 pt-6"><div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#9aa6aa]">Workspace</div><nav className="space-y-1">{nav.map(item=>{const active=path===item.href.split('#')[0];const Icon=item.icon;return <Link key={item.label} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${active?'bg-mint text-teal':'text-[#63737b] hover:bg-canvas hover:text-ink'}`}><Icon size={17}/>{item.label}{item.label==='Pharmacy & POS'&&<span className="ml-auto rounded-full bg-[#fff0dc] px-2 py-0.5 text-[10px] font-semibold text-[#bd7622]">2</span>}</Link>})}</nav></div>
      <div className="mt-8 px-4"><div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#9aa6aa]">Clinic</div><Link href="/doctor-schedule" className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium ${path==='/doctor-schedule'?'bg-mint text-teal':'text-[#63737b] hover:bg-canvas'}`}><Stethoscope size={17}/> Doctor schedule</Link><Link href="/settings" className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium ${path==='/settings'?'bg-mint text-teal':'text-[#63737b] hover:bg-canvas'}`}><Settings size={17}/> Settings</Link></div>
      <div className="mt-auto p-4"><div className="rounded-xl bg-[#f5f8f7] p-3"><div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-semibold">Today’s capacity</span><span className="text-[10px] font-medium text-teal">68%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#e4ebe8]"><div className="h-full w-[68%] rounded-full bg-teal"/></div><div className="mt-2 text-[10px] text-muted">17 of 25 appointments booked</div></div>
        <div className="relative mt-4 border-t border-line pt-4" ref={profileMenu}><button onClick={()=>setProfileOpen(v=>!v)} aria-expanded={profileOpen} aria-haspopup="menu" className="flex w-full items-center gap-3 rounded-lg text-left hover:bg-canvas"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#d9e9e5] text-xs font-bold text-teal">JD</div><div className="min-w-0 flex-1"><div className="truncate text-xs font-semibold">Dr. Jordan Davis</div><div className="text-[10px] text-muted">Clinic administrator</div></div><ChevronDown size={15} className={`text-muted transition ${profileOpen?'rotate-180':''}`}/></button>
          {profileOpen&&<div role="menu" className="absolute bottom-[calc(100%+10px)] left-0 z-30 w-full rounded-xl border border-line bg-white p-1.5 shadow-soft"><div className="border-b border-line px-3 py-2"><div className="text-xs font-semibold">Dr. Jordan Davis</div><div className="mt-0.5 text-[10px] text-muted">admin@carewell.demo</div></div><Link role="menuitem" href="/settings#profile" onClick={()=>setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-[#52636b] hover:bg-canvas"><UserRound size={14}/> Profile settings</Link><button role="menuitem" onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-[#b45e52] hover:bg-[#fff3f1]"><LogOut size={14}/> Log out</button></div>}
        </div>
      </div>
    </aside>
    <div className="lg:pl-[248px]">
      <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-line bg-white/95 px-5 backdrop-blur sm:px-8"><div className="flex items-center gap-3 text-xs text-muted"><span className="hidden sm:inline">Good morning, Dr. Davis</span><span className="h-1 w-1 rounded-full bg-[#c8d2ce]"/><span>Friday, November 7, 2026</span></div><div className="flex items-center gap-3"><label className="hidden h-9 w-56 items-center gap-2 rounded-lg border border-line bg-white px-3 md:flex"><Search size={15} className="text-[#99a5a8]"/><input className="w-full border-0 bg-transparent text-xs outline-none placeholder:text-[#a0abad]" placeholder="Search anything..."/><kbd className="rounded border border-line px-1 text-[9px] text-muted">⌘K</kbd></label><button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-lg border border-line text-muted"><Bell size={17}/><i className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#e28b62]"/></button><div className="hidden h-8 w-px bg-line sm:block"/>
        <div className="relative" ref={roleMenu}><button onClick={()=>setRoleOpen(v=>!v)} aria-haspopup="listbox" aria-expanded={roleOpen} className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-2.5 text-xs font-semibold"><span className="hidden text-muted sm:inline">Role</span>{role}<ChevronDown size={13} className={`text-muted transition ${roleOpen?'rotate-180':''}`}/></button>{roleOpen&&<div role="listbox" aria-label="Choose workspace role" className="absolute right-0 top-11 z-30 w-40 rounded-xl border border-line bg-white p-1.5 shadow-soft">{(['Admin','Pharmacist','Doctor'] as Role[]).map(option=><button key={option} role="option" aria-selected={role===option} onClick={()=>chooseRole(option)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs ${role===option?'bg-mint font-semibold text-teal':'text-[#52636b] hover:bg-canvas'}`}>{option}{role===option&&<span className="h-1.5 w-1.5 rounded-full bg-teal"/>}</button>)}</div>}</div>
        <button onClick={()=>setVisitOpen(true)} className="flex h-9 items-center gap-2 rounded-lg bg-teal px-3 text-xs font-semibold text-white hover:bg-[#0f6d64]"><Plus size={15}/> <span className="hidden sm:inline">New visit</span></button>
      </div></header>
      {notice&&<div role="status" className="fixed right-5 top-[88px] z-40 rounded-lg border border-[#dcebe5] bg-white px-4 py-3 text-xs font-medium text-teal shadow-soft">{notice}</div>}
      <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8">{children}</main>
    </div>
    {visitOpen&&<PrescriptionModal onClose={()=>setVisitOpen(false)}/>}
    {signedOut&&<div className="fixed inset-0 z-[60] grid place-items-center bg-[#12272e]/45 p-4"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[.15em] text-teal">Demo session</div><h2 className="mt-1 text-lg font-bold">You’re signed out</h2></div><button onClick={()=>setSignedOut(false)} aria-label="Close" className="rounded-lg p-1.5 text-muted hover:bg-canvas"><X size={16}/></button></div><p className="mt-2 text-xs leading-5 text-muted">This prototype has no authentication service connected. Close this message to continue in the demo workspace.</p><button onClick={()=>setSignedOut(false)} className="mt-5 h-9 w-full rounded-lg bg-teal text-xs font-semibold text-white">Return to demo</button></div></div>}
  </div>;
}
