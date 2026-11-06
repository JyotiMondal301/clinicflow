import type { Invoice, Medicine, Patient } from './types';
export const patients: Patient[] = [
 {id:'PT-1042',name:'Olivia Rhye',age:32,gender:'Female',phone:'+1 (415) 555-0132',email:'olivia.rhye@email.com',blood:'A+',lastVisit:'Today, 9:42 AM',condition:'Hypertension',status:'Active',initials:'OR',color:'peach'},
 {id:'PT-1041',name:'Phoenix Baker',age:28,gender:'Male',phone:'+1 (415) 555-0184',email:'phoenix.b@email.com',blood:'O+',lastVisit:'Today, 9:15 AM',condition:'Seasonal allergy',status:'Follow-up',initials:'PB',color:'blue'},
 {id:'PT-1040',name:'Lana Steiner',age:41,gender:'Female',phone:'+1 (415) 555-0129',email:'lana.s@email.com',blood:'B+',lastVisit:'Yesterday',condition:'Type 2 diabetes',status:'Active',initials:'LS',color:'lavender'},
 {id:'PT-1039',name:'Demi Wilkinson',age:35,gender:'Female',phone:'+1 (415) 555-0171',email:'demi.w@email.com',blood:'AB+',lastVisit:'Nov 5, 2026',condition:'Migraine',status:'Follow-up',initials:'DW',color:'mint'},
 {id:'PT-1038',name:'Candice Wu',age:24,gender:'Female',phone:'+1 (415) 555-0146',email:'candice.w@email.com',blood:'O−',lastVisit:'Nov 5, 2026',condition:'Annual check-up',status:'New',initials:'CW',color:'rose'},
 {id:'PT-1037',name:'Natali Craig',age:52,gender:'Female',phone:'+1 (415) 555-0193',email:'natali.c@email.com',blood:'A−',lastVisit:'Nov 4, 2026',condition:'Hyperlipidemia',status:'Active',initials:'NC',color:'gold'},
 {id:'PT-1036',name:'Drew Cano',age:38,gender:'Male',phone:'+1 (415) 555-0168',email:'drew.c@email.com',blood:'B−',lastVisit:'Nov 4, 2026',condition:'Back pain',status:'Follow-up',initials:'DC',color:'blue'},
];
export const medicines: Medicine[] = [
 {id:'MED-001',name:'Amoxicillin 500mg',category:'Antibiotic',batch:'AMX-24108',stock:124,minStock:40,price:12.5,expiry:'Jun 18, 2027',supplier:'MedSupply Co.'},
 {id:'MED-002',name:'Lisinopril 10mg',category:'Cardiovascular',batch:'LIS-24092',stock:18,minStock:30,price:8,expiry:'Mar 12, 2027',supplier:'PharmaSource'},
 {id:'MED-003',name:'Metformin 850mg',category:'Diabetes care',batch:'MET-24115',stock:86,minStock:35,price:9.75,expiry:'Aug 30, 2027',supplier:'MedSupply Co.'},
 {id:'MED-004',name:'Cetirizine 10mg',category:'Allergy relief',batch:'CET-24076',stock:9,minStock:25,price:6.25,expiry:'Dec 02, 2026',supplier:'HealthBridge'},
 {id:'MED-005',name:'Ibuprofen 400mg',category:'Pain relief',batch:'IBU-24063',stock:203,minStock:50,price:4.5,expiry:'Sep 22, 2027',supplier:'WellCare Labs'},
 {id:'MED-006',name:'Atorvastatin 20mg',category:'Cardiovascular',batch:'ATO-24102',stock:54,minStock:30,price:11,expiry:'Jul 15, 2027',supplier:'PharmaSource'},
 {id:'MED-007',name:'Omeprazole 20mg',category:'Digestive health',batch:'OME-24031',stock:31,minStock:30,price:7.25,expiry:'Nov 28, 2026',supplier:'HealthBridge'},
 {id:'MED-008',name:'Amlodipine 5mg',category:'Cardiovascular',batch:'AML-24124',stock:67,minStock:30,price:8.5,expiry:'Jan 19, 2028',supplier:'MedSupply Co.'},
];
export const invoices: Invoice[] = [
 {id:'INV-2026-084',patient:'Olivia Rhye',date:'Nov 7, 2026',items:'Consultation + 2 items',amount:86.5,status:'Paid'},
 {id:'INV-2026-083',patient:'Phoenix Baker',date:'Nov 7, 2026',items:'Consultation + 1 item',amount:62.25,status:'Pending'},
 {id:'INV-2026-082',patient:'Lana Steiner',date:'Nov 6, 2026',items:'Consultation + 3 items',amount:104.75,status:'Paid'},
 {id:'INV-2026-081',patient:'Demi Wilkinson',date:'Nov 5, 2026',items:'Consultation',amount:55,status:'Overdue'},
];
