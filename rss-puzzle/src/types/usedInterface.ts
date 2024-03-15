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

export interface CustomWordData {
    audioExample: string;
    baseWordsArr: string[];
    mixedWordsArr: string[];
    sentenceLength: number;
    translateSentence: string;
}

export interface RoundWords {
    levelData: LevelData;
    words: WordData[];
}

export interface WordCollection {
    rounds: RoundWords[];
}
