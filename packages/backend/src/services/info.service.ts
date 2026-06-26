import { ENV } from '../config/env';

export const getArticles = async (type?: string, category?: string) => {
  try {
    const url = `${ENV.BLOGGER_URL}/feeds/posts/default?alt=json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch from blogger');
    }
    const data = await response.json();
    
    // Parse Blogger JSON
    const entries = data.feed.entry || [];
    const articles = entries.map((entry: any, index: number) => {
      // Find thumbnail
      const content = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : '');
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : 'https://placehold.co/600x400?text=No+Image';

      let cat = 'Berita';
      if (entry.category && entry.category.length > 0) {
        cat = entry.category[0].term;
      }
      
      let articleType = index === 0 ? 'Utama' : 'Biasa';
      
      const link = entry.link?.find((l: any) => l.rel === 'alternate')?.href || '#';

      return {
        id: entry.id.$t,
        title: entry.title.$t,
        content: content,
        summary: content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
        type: articleType,
        category: cat,
        imageUrl: imageUrl,
        createdAt: entry.published.$t,
        authorId: entry.author[0]?.name?.$t || 'Blogger',
        link: link
      };
    });

    return articles;
  } catch (error) {
    console.error('Error fetching blogger posts:', error);
    return [];
  }
};

export const getArticleById = async (id: string) => {
  const articles = await getArticles();
  return articles.find((a: any) => a.id === id);
};

export const createArticle = async (data: any) => {
  throw new Error("Cannot create article directly; post in Blogger instead.");
};
