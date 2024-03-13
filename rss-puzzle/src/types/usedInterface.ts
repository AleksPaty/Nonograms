export interface UserStorage {
    firstName: string;
    surname: string;
}

interface LevelData {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
}

interface WordData {
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
}

interface RoundWords {
    levelData: LevelData;
    words: WordData[];
}

export interface WordCollection {
    rounds: RoundWords[];
}
