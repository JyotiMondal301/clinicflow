'use client';
import { createContext, useContext, useState } from 'react';
import { medicines as initialMedicines, patients as initialPatients, invoices as initialInvoices } from '@/lib/demo-data';
import type { Invoice, Medicine, Patient } from '@/lib/types';
type ContextType = { patients:Patient[]; medicines:Medicine[]; invoices:Invoice[]; addInvoice:(invoice:Invoice, deductions:{id:string;quantity:number}[])=>void; role:'Doctor'|'Pharmacist'|'Admin'; setRole:(role:'Doctor'|'Pharmacist'|'Admin')=>void };
const Context = createContext<ContextType|null>(null);
export function ClinicProvider({children}:{children:React.ReactNode}) { const [medicines,setMedicines]=useState(initialMedicines); const [invoices,setInvoices]=useState(initialInvoices); const [role,setRole]=useState<'Doctor'|'Pharmacist'|'Admin'>('Admin'); const addInvoice=(invoice:Invoice,deductions:{id:string;quantity:number}[])=>{setInvoices(v=>[invoice,...v]);setMedicines(v=>v.map(m=>({...m,stock:Math.max(0,m.stock-(deductions.find(d=>d.id===m.id)?.quantity??0))})));}; return <Context.Provider value={{patients:initialPatients,medicines,invoices,addInvoice,role,setRole}}>{children}</Context.Provider>; }
export function useClinic(){const value=useContext(Context);if(!value)throw new Error('useClinic must be used within ClinicProvider');return value;}
