import { db } from '../db';
import { complaints } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const getLiveComplaints = async () => {
  return await db.select().from(complaints).orderBy(desc(complaints.createdAt)).limit(10);
};

export const submitComplaint = async (data: any, userId?: string) => {
  const newComplaint = await db.insert(complaints).values({
    id: uuidv4(),
    userId: userId,
    type: data.type,
    message: data.message,
    status: 'Pending'
  }).returning();
  return newComplaint[0];
};
