import { Router } from 'express';
import * as donasiService from '../services/donasi.service';

const router = Router();

router.get('/stats', async (req, res) => {
  try {
    const stats = await donasiService.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/dropoff', async (req, res) => {
  try {
    const locations = await donasiService.getDropoffLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/pickup', async (req, res) => {
  try {
    const newRequest = await donasiService.createPickupRequest(req.body);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
