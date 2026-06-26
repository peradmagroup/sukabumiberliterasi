import { db } from '../db';
import { events } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const getEvents = async (category?: string) => {
  return await db.select().from(events).orderBy(desc(events.date));
};

export const createEvent = async (data: any) => {
  const newEvent = await db.insert(events).values({
    id: uuidv4(),
    title: data.title,
    description: data.description,
    category: data.category,
    subCategory: data.subCategory,
    date: new Date(data.date),
    timeInfo: data.timeInfo,
    location: data.location,
    organizerId: data.organizerId
  }).returning();
  return newEvent[0];
};
