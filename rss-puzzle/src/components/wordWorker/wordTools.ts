import { CustomWordData, RoundWords } from '../../types/usedInterface';
import { postService } from '../responseTools/postService';

export class WordTools {
    viewTool = 'wordView';
    levelWords: string;
    data: RoundWords[] | undefined;
    currentRound: RoundWords | undefined;

    constructor(level: string) {
        this.levelWords = level;
    }

    public async getData(roundIndex: number, level = this.levelWords) {
        const data = await postService(level);
        this.data = data?.rounds;
        this.setСurrentRound(roundIndex);
    }

    private setСurrentRound(index: number) {
        if (this.data) this.currentRound = this.data[index];
    }

    private mixedWords(wordsArr: string[]): string[] {
        const mixArr = [...wordsArr];
        for (let i = mixArr.length - 1; i > 0; i -= 1) {
            const randomN = Math.floor(Math.random() * (i + 1));
            [mixArr[i], mixArr[randomN]] = [mixArr[randomN], mixArr[i]];
        }
        return mixArr;
    }

    public async getRoundData(wordIndex: number, roundIndex: number): Promise<CustomWordData | undefined> {
        if (!this.data || wordIndex === 0) await this.getData(roundIndex);
        if (this.currentRound) {
            const baseWordsArr = this.currentRound.words[wordIndex].textExample.split(' ');
            const sentenceLength = this.currentRound.words[wordIndex].textExample.length - baseWordsArr.length - 1;
            const roundData = {
                audioExample: this.currentRound.words[wordIndex].audioExample,
                baseWordsArr,
                mixedWordsArr: this.mixedWords(baseWordsArr),
                sentenceLength,
                translateSentence: this.currentRound.words[wordIndex].textExampleTranslate,
            };
            return roundData;
        }
        console.log('currentRound not find');
        return undefined;
    }
}
