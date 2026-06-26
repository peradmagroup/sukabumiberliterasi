import { Router } from 'express';
import * as mitraService from '../services/mitra.service';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const items = await mitraService.getPartners(type as string);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/locations', async (req, res) => {
  try {
    const locations = await mitraService.getLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const partner = await mitraService.getPartnerById(req.params.id);
    if (!partner) return res.status(404).json({ error: 'Not Found' });
    res.json(partner);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
