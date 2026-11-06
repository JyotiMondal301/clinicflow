import { PrismaClient, Role, PatientStatus, InvoiceStatus } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({ where:{email:'admin@carewell.demo'}, update:{}, create:{email:'admin@carewell.demo',name:'Dr. Jordan Davis',role:Role.ADMIN,authUserId:'demo-admin'} });
  const doctor = await prisma.user.upsert({ where:{email:'doctor@carewell.demo'}, update:{}, create:{email:'doctor@carewell.demo',name:'Dr. Amina Rahman',role:Role.DOCTOR,authUserId:'demo-doctor'} });
  const supplier = await prisma.supplier.upsert({where:{name:'MedSupply Co.'},update:{},create:{name:'MedSupply Co.',phone:'+1 415 555 0110'}});
  const patients = [
    {recordNumber:'PT-1042',firstName:'Olivia',lastName:'Rhye',dateOfBirth:new Date('1994-04-12'),gender:'Female',phone:'+1 (415) 555-0132',email:'olivia.rhye@email.com',bloodType:'A+',status:PatientStatus.ACTIVE},
    {recordNumber:'PT-1041',firstName:'Phoenix',lastName:'Baker',dateOfBirth:new Date('1998-09-22'),gender:'Male',phone:'+1 (415) 555-0184',email:'phoenix.b@email.com',bloodType:'O+',status:PatientStatus.FOLLOW_UP},
    {recordNumber:'PT-1040',firstName:'Lana',lastName:'Steiner',dateOfBirth:new Date('1985-02-18'),gender:'Female',phone:'+1 (415) 555-0129',email:'lana.s@email.com',bloodType:'B+',status:PatientStatus.ACTIVE},
  ];
  for (const p of patients) await prisma.patient.upsert({where:{recordNumber:p.recordNumber},update:{},create:p});
  const products = [
    {sku:'MED-001',name:'Amoxicillin 500mg',genericName:'Amoxicillin',category:'Antibiotic',sellingPrice:'12.50',reorderLevel:40,batchNumber:'AMX-24108',quantity:124,expiresAt:new Date('2027-06-18')},
    {sku:'MED-002',name:'Lisinopril 10mg',genericName:'Lisinopril',category:'Cardiovascular',sellingPrice:'8.00',reorderLevel:30,batchNumber:'LIS-24092',quantity:18,expiresAt:new Date('2027-03-12')},
    {sku:'MED-003',name:'Metformin 850mg',genericName:'Metformin',category:'Diabetes care',sellingPrice:'9.75',reorderLevel:35,batchNumber:'MET-24115',quantity:86,expiresAt:new Date('2027-08-30')},
    {sku:'MED-004',name:'Cetirizine 10mg',genericName:'Cetirizine',category:'Allergy relief',sellingPrice:'6.25',reorderLevel:25,batchNumber:'CET-24076',quantity:9,expiresAt:new Date('2026-12-02')},
    {sku:'MED-005',name:'Ibuprofen 400mg',genericName:'Ibuprofen',category:'Pain relief',sellingPrice:'4.50',reorderLevel:50,batchNumber:'IBU-24063',quantity:203,expiresAt:new Date('2027-09-22')},
  ];
  for (const p of products) {
    const medicine = await prisma.medicine.upsert({where:{sku:p.sku},update:{},create:{sku:p.sku,name:p.name,genericName:p.genericName,category:p.category,sellingPrice:p.sellingPrice,reorderLevel:p.reorderLevel}});
    await prisma.medicineBatch.upsert({where:{medicineId_batchNumber:{medicineId:medicine.id,batchNumber:p.batchNumber}},update:{},create:{medicineId:medicine.id,supplierId:supplier.id,batchNumber:p.batchNumber,quantity:p.quantity,unitCost:'4.00',expiresAt:p.expiresAt}});
  }
  const olivia = await prisma.patient.findUniqueOrThrow({where:{recordNumber:'PT-1042'}});
  await prisma.invoice.upsert({where:{invoiceNumber:'INV-2026-084'},update:{},create:{invoiceNumber:'INV-2026-084',patientId:olivia.id,issuedAt:new Date('2026-11-07T09:42:00Z'),consultationFee:'55.00',subtotal:'31.50',total:'86.50',status:InvoiceStatus.PAID,paidAt:new Date('2026-11-07T09:50:00Z'),items:{create:[{description:'Amoxicillin 500mg',quantity:2,unitPrice:'12.50',lineTotal:'25.00'},{description:'Lisinopril 10mg',quantity:1,unitPrice:'6.50',lineTotal:'6.50'}]}}});
  console.log(`Seeded clinic demo. Admin ${admin.email}; clinician ${doctor.email}.`);
}
main().catch(error=>{console.error(error);process.exit(1)}).finally(()=>prisma.$disconnect());
