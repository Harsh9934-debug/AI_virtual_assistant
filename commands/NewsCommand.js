import axios from 'axios';
import open from 'open';
import { BaseCommand } from './BaseCommand.js';
import logger from '../utils/logger.js';

export class NewsCommand extends BaseCommand {
    constructor() {
        super('news', ["today's news", 'latest news', 'news headlines'], 'Get latest news');
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            // Open Google News
            await open('https://news.google.com');
            logger.info('Google News opened in browser');

            // Fetch top news headlines
            const newsResponse = await axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    country: 'us',
                    apiKey: process.env.NEWS_API_KEY,
                },
            });

            const headlines = newsResponse.data.articles
                .slice(0, 5)
                .map((article, index) => `${index + 1}. ${article.title}`)
                .join('\n');

            this.logSuccess('Fetched top 5 news headlines');
            res.json({ response: `Here are today's top news headlines:\n${headlines}` });
        } catch (error) {
            this.handleError(error, res, 'Failed to fetch news');
        }
    }
}
