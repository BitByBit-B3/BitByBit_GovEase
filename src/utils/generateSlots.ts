import { db } from '@/lib/firebase';
import { collection, doc, writeBatch, Timestamp } from 'firebase/firestore';

export async function generateRealisticSlots() {
  // ALL services from your database - complete list
  const demoServices = [
    // Demo services
    'demo-service-birth-certificate',
    'demo-service-death-certificate', 
    'demo-service-driving-license',
    'demo-service-license-renewal',
    'demo-service-marriage-certificate',
    'demo-service-passport-application',
    'demo-service-passport-renewal',
    'demo-service-tax-clearance',
    'demo-service-tax-filing',
    'demo-service-tax-registration',
    'demo-service-vehicle-registration',
    'demo-service-visa-extension',
    
    // Regular services
    'service-birth-certificate',
    'service-character-certificate',
    'service-grama-certificate',
    'service-income-certificate',
    'service-land-permit',
    'service-marriage-certificate',
    'service-passport-application',
    'service-passport-renewal',
    'service-police-clearance',
    'service-samurdhi-application'
  ];

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 14); // Next 2 weeks

  let totalSlots = 0;
  let batch = writeBatch(db);
  let batchCount = 0;

  // Just create simple slots for next 7 days, 9am-5pm
  for (const serviceId of demoServices) {
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + day);
      
      // Skip weekends
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;
      
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Create slots from 9am to 5pm
      for (let hour = 9; hour < 17; hour++) {
        const slotTime = `${hour.toString().padStart(2, '0')}:00`;
        const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
        const slotId = `${serviceId}-${dateStr}-${hour.toString().padStart(2, '0')}00`;
        const timeSlot = `${slotTime}-${endTime}`;
        
        // Random capacity and bookings for demo
        const capacity = Math.floor(Math.random() * 8) + 3; // 3-10 capacity
        const booked = Math.floor(Math.random() * (capacity - 1)); // Keep at least 1 slot free
        
        // Assign appropriate department based on service type
        let departmentId = 'demo-dept-registrar-general'; // Default
        if (serviceId.includes('passport') || serviceId.includes('visa')) {
          departmentId = 'demo-dept-immigration';
        } else if (serviceId.includes('driving') || serviceId.includes('vehicle') || serviceId.includes('license')) {
          departmentId = 'demo-dept-motor-traffic';
        } else if (serviceId.includes('tax')) {
          departmentId = 'demo-dept-inland-revenue';
        } else if (serviceId.includes('police')) {
          departmentId = 'demo-dept-police';
        }

        const slotData = {
          serviceId: serviceId,
          departmentId: departmentId,
          date: dateStr,
          time: slotTime,
          timeSlot,
          capacity,
          booked,
          createdAt: Timestamp.fromDate(new Date()),
        };
        
        batch.set(doc(db, 'slots', slotId), slotData);
        batchCount++;
        totalSlots++;
        
        // Batch commit every 100 slots
        if (batchCount >= 100) {
          await batch.commit();
          batch = writeBatch(db);
          batchCount = 0;
        }
      }
    }
  }

  // Commit remaining slots
  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`Generated ${totalSlots} time slots across all services`);
  return totalSlots;
}