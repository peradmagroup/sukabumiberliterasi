import { Router } from 'express';
import * as agendaService from '../services/agenda.service';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const items = await agendaService.getEvents(category as string);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEvent = await agendaService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
