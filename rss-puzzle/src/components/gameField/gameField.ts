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
        const btnsWrapper = ElemConstruct('div', 'main__btn-wrap', undefined, parent);
        const autoFillBtn = ElemConstruct('button', 'main__autoFillBtn', 'Auto-Complete', btnsWrapper, [
            { type: 'button' },
        ]);
        const continueBtn = ElemConstruct('button', 'main__continueBtn', 'Check', btnsWrapper, [
            { type: 'button', disabled: '' },
        ]);
        autoFillBtn.addEventListener('click', this.autoFillHandle.bind(this));
        continueBtn.addEventListener('click', (e) => this.checkAndContinue(e, parent));

        this.addNewWords(parent, 0, 0);
    }

    private autoFillHandle(e: Event) {
        const parentElem = this.puzzleField?.children[this.puzzleField?.children.length - 1] as HTMLElement;
        const wordElems = parentElem.children;
        const rightWordArr = this.wordData?.baseWordsArr;
        const fillBtn = e.target as HTMLButtonElement;
        const continueBtn = fillBtn.nextElementSibling as HTMLButtonElement;

        for (let i = 0; i < rightWordArr!.length; i += 1) {
            const wordElem = wordElems!.item(i) as HTMLElement | undefined;
            const rightWord = rightWordArr![i];

            if (wordElem) {
                wordElem.removeAttribute('style');
                wordElem.style.flexGrow = '1';
            }
            if (!wordElem) ElemConstruct('div', 'word-puzzle', `${rightWord}`, parentElem).style.flexGrow = '1';
            if (wordElem && wordElem.innerText !== rightWord) wordElem.innerText = rightWord;
        }
        this.wordsField?.replaceChildren();
        continueBtn.disabled = false;
        continueBtn.innerText = 'Continue';
    }

    private addNewWords(parent: HTMLElement, wordInd = this.wordIndex, roundInd = this.roundIndex): void {
        if (this.wordIndex === 0 && this.puzzleField!.children.length > 0) this.puzzleField!.replaceChildren();
        const sentenceLines = ElemConstruct('div', 'main__puzzleField_lines', undefined, this.puzzleField);
        this.wordTool
            .getRoundData(wordInd, roundInd)
            .then((wordData) => {
                this.wordView.render(
                    wordData?.baseWordsArr!,
                    wordData?.mixedWordsArr!,
                    wordData?.sentenceLength!,
                    sentenceLines,
                    this.wordsField!,
                    this.checkFillWords.bind(this)
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

    public checkFillWords(checkingLine: HTMLElement): boolean {
        const wordCollection = checkingLine.children;
        let wrongCount = 0;

        for (let i = 0; i < wordCollection!.length; i += 1) {
            const wordElem = wordCollection!.item(i);
            const rightWord = this.wordData?.baseWordsArr[i];

            if (wordElem?.innerHTML !== rightWord) {
                wordElem?.classList.add('wrong');
                setTimeout(() => wordElem?.classList.remove('wrong'), 1000);
                wrongCount += 1;
            }
        }
        if (wrongCount > 0) return false;
        return true;
    }

    public checkAndContinue(e: Event, parent: HTMLElement): void {
        const lines = document.querySelectorAll('.main__puzzleField_lines');
        const wordLine = lines[lines.length - 1] as HTMLElement;
        const btn = e.target as HTMLButtonElement;

        if (btn.innerText === 'Continue') {
            this.addNewWords(parent);
            btn.innerText = 'Check';
            btn.disabled = true;
        }
        if (btn.innerText === 'Check') this.checkFillWords(wordLine);
    }

    public render(parent: HTMLElement): void {
        this.gameHeaderBuild(parent);
        this.gameBodyBuild(parent);
    }
}
