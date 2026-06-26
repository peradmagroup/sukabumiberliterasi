import { Router } from 'express';
import * as infoService from '../services/info.service';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { type, category } = req.query;
    const articles = await infoService.getArticles(type as string, category as string);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await infoService.getArticleById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not Found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Requires auth check in real app
    const newArticle = await infoService.createArticle(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
