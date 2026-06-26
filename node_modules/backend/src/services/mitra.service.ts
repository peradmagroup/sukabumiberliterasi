import { ENV } from '../config/env';
import { parse } from 'csv-parse/sync';

export const getPartners = async (type?: string) => {
  try {
    if (!ENV.GOOGLE_SHEET_CSV_URL) {
      return [];
    }
    
    const response = await fetch(ENV.GOOGLE_SHEET_CSV_URL);
    if (!response.ok) throw new Error('Failed to fetch partners from Google Sheets');
    
    const csvData = await response.text();
    const records = parse(csvData, { columns: true, skip_empty_lines: true });
    
    // Map the records to our expected format
    let partners = records.map((record: any, index: number) => ({
      id: String(index),
      name: record['Nama Mitra'] || record['Name'] || record['Nama'] || 'Mitra ' + index,
      description: record['Deskripsi'] || record['Description'] || '',
      type: record['Kategori'] || record['Type'] || 'Kolaborator',
      logoUrl: record['Logo URL'] || record['Logo'] || 'https://placehold.co/400x400?text=' + (record['Nama Mitra'] || 'Mitra').substring(0,2),
      latitude: parseFloat(record['Latitude']) || -6.9200, // default Sukabumi approx
      longitude: parseFloat(record['Longitude']) || 106.9200,
      createdAt: new Date().toISOString()
    }));
    
    if (type) {
      partners = partners.filter((p: any) => p.type.toLowerCase() === type.toLowerCase());
    }
    
    return partners;
  } catch (err) {
    console.error("Error fetching Google Sheets for partners:", err);
    return [];
  }
};

export const getPartnerById = async (id: string) => {
  const partners = await getPartners();
  return partners.find((p: any) => p.id === id);
};

export const getLocations = async () => {
  const partners = await getPartners();
  return partners.map((p: any) => ({
    id: p.id,
    name: p.name,
    latitude: p.latitude,
    longitude: p.longitude,
    type: p.type
  }));
};
