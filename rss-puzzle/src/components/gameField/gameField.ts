import { CustomWordData } from '../../types/usedInterface';
import { ElemConstruct } from '../elemConstruct';
import { WordTools } from '../wordWorker/wordTools';
import { WordView } from '../wordWorker/wordView';

export class GameField {
    wordTool = new WordTools('1');
    wordView = new WordView();
    wordData: CustomWordData | undefined;
    puzzleField: HTMLElement | undefined;
    wordsField: HTMLElement | undefined;
    wordTranslateElem = ElemConstruct('p', 'main__wordTranslate');
    roundIndex: number = 0;
    wordIndex: number = 0;

    private gameHeaderBuild(parent: HTMLElement): void {
        ElemConstruct('div', 'main__puzzle-header', undefined, parent);
    }

    private gameBodyBuild(parent: HTMLElement): void {
        this.puzzleField = ElemConstruct('div', 'main__puzzleField', undefined, parent);
        this.wordsField = ElemConstruct('div', 'main__wordsField', undefined, parent);
        const continueBtn = ElemConstruct('button', 'main__continueBtn', 'Continue', parent);
        continueBtn.addEventListener('click', () => this.checkAndContinue(parent));

        this.addNewWords(parent, 0, 0);
    }

    private addNewWords(parent: HTMLElement, wordInd = this.wordIndex, roundInd = this.roundIndex): void {
        if (this.wordIndex === 0 && this.puzzleField!.children.length > 0) this.puzzleField!.replaceChildren();
        const sentenceLines = ElemConstruct('div', 'main__puzzleField_lines', undefined, this.puzzleField);
        this.wordTool
            .getRoundData(wordInd, roundInd)
            .then((wordData) => {
                this.wordView.render(
                    wordData?.mixedWordsArr!,
                    wordData?.sentenceLength!,
                    sentenceLines,
                    this.wordsField!
                );
                this.wordTranslateElem.innerText = wordData?.translateSentence!;
                parent.prepend(this.wordTranslateElem);

                this.wordData = wordData;
            })
            .catch((err) => console.log(err));
        if (this.wordIndex < 10) this.wordIndex += 1;
        if (this.wordIndex >= 10) {
            this.wordIndex = 0;
            this.roundIndex += 1;
        }
    }

    private checkAndContinue(parent: HTMLElement): void {
        const lines = document.querySelectorAll('.main__puzzleField_lines');
        const wordLine = lines[lines.length - 1];
        const wordCollection = wordLine.children;

        for (let i = 0; i < wordCollection.length; i += 1) {
            const wordElem = wordCollection.item(i);
            const rightWord = this.wordData?.baseWordsArr[i];

            if (wordElem?.innerHTML !== rightWord) {
                wordElem?.classList.add('wrong');
                setTimeout(() => wordElem?.classList.remove('wrong'), 1000);
                return;
            }
        }
        this.addNewWords(parent);
    }

    public render(parent: HTMLElement): void {
        this.gameHeaderBuild(parent);
        this.gameBodyBuild(parent);
    }
}
