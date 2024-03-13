import { WordCollection } from '../../types/usedInterface';

export const postService = async (level: string): Promise<WordCollection | undefined> => {
    try {
        const response = await fetch(
            `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${level}.json`
        );
        const data: WordCollection = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
