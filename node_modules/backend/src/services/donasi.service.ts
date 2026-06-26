import { db } from '../db';
import { donationRequests, dropoffLocations } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const getStats = async () => {
  // Mock aggregation for now
  return {
    bukuTerkumpul: 1250,
    tamanBaca: 15,
    donaturAktif: 85,
    perpustakaan: 33
  };
};

export const getDropoffLocations = async () => {
  return await db.select().from(dropoffLocations).orderBy(desc(dropoffLocations.createdAt));
};

export const createPickupRequest = async (data: any, userId?: string) => {
  const newRequest = await db.insert(donationRequests).values({
    id: uuidv4(),
    userId: userId,
    name: data.name,
    whatsapp: data.whatsapp,
    bookCount: parseInt(data.bookCount),
    address: data.address,
    status: 'Pending'
  }).returning();
  return newRequest[0];
};
