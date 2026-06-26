import { Router } from 'express';
import * as konsulService from '../services/konsul.service';

const router = Router();

router.get('/live', async (req, res) => {
  try {
    const items = await konsulService.getLiveComplaints();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    // In a real app, userId comes from auth middleware
    const newComplaint = await konsulService.submitComplaint(req.body);
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
