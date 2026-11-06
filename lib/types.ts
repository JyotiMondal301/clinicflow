export type Patient = { id:string; name:string; age:number; gender:string; phone:string; email:string; blood:string; lastVisit:string; condition:string; status:'Active'|'Follow-up'|'New'; initials:string; color:string };
export type Medicine = { id:string; name:string; category:string; batch:string; stock:number; minStock:number; price:number; expiry:string; supplier:string };
export type RxItem = { medicineId:string; name:string; dosage:string; frequency:string; duration:string; quantity:number; price:number };
export type Invoice = { id:string; patient:string; date:string; items:string; amount:number; status:'Paid'|'Pending'|'Overdue' };
