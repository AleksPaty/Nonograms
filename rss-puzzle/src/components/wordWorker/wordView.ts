import { ElemConstruct } from '../elemConstruct';

export class WordView {
    baseWords: string[] | null = null;
    wordTask: string[] | null = null;
    sentenceLength: number | null = null;

    private setWordProps(baseWords: string[], mixWordsArr: string[], sentenceLength: number) {
        this.baseWords = baseWords;
        this.wordTask = mixWordsArr;
        this.sentenceLength = sentenceLength;
    }

    private buildWordElems(
        parentElem: HTMLElement,
        callBack: (checkingLine: HTMLElement) => boolean
    ): DocumentFragment {
        const fragment = document.createDocumentFragment();
        const handler = (e: Event) => {
            this.replaceWordHandler(e, parentElem, callBack);
        };
        this.wordTask?.forEach((word, i) => {
            if (parentElem.previousElementSibling) {
                const prevWord = parentElem.previousElementSibling.children[i];
                if (prevWord) prevWord.removeEventListener('click', handler);
            }
            const elem = ElemConstruct('div', 'word-puzzle', `${word}`);
            const widthElem = (800 / this.sentenceLength!) * word.length;
            elem.style.width = `${Math.ceil(widthElem) - 25}px`;
            if (this.baseWords && this.baseWords[0] === word) elem.classList.add('first');
            if (this.baseWords && this.baseWords[this.baseWords.length - 1] === word) elem.classList.add('last');
            if (this.baseWords && this.baseWords[0] !== word && this.baseWords[this.baseWords.length - 1] !== word) {
                elem.classList.add('middle');
            }

            elem.addEventListener('click', handler);
            fragment.append(elem);
        });

        return fragment;
    }

    private replaceWordHandler(
        e: Event,
        parentElem: HTMLElement,
        callBack: (checkingLine: HTMLElement) => boolean,
        btn?: HTMLButtonElement
    ) {
        const elem = e.target as HTMLElement;
        const cloneElem = elem.cloneNode(true) as HTMLElement;
        const parent = elem.parentElement;
        const checkBtn = parent?.nextElementSibling?.children[1] as HTMLButtonElement;
        const handler = (e: Event) => {
            this.replaceWordHandler(e, parent!, callBack);
        };

        cloneElem.style.width = `${elem.offsetWidth - 20}px`;
        cloneElem.addEventListener('click', handler);

        parentElem.append(cloneElem);
        elem.remove();

        if (parent?.classList.contains('main__wordsField') && parent?.children.length === 0) {
            checkBtn?.removeAttribute('disabled');
            if (callBack(parentElem)) checkBtn!.innerText = 'Continue';
            if (!callBack(parentElem) && checkBtn!.innerText === 'Continue') checkBtn!.innerText = 'Check';
        } else if (btn && btn.previousElementSibling !== parent && parent?.children.length !== this.sentenceLength) {
            if (btn.innerText === 'Continue') btn.innerText = 'Check';
        }
    }

    public render(
        baseWordsArr: string[],
        mixWordsArr: string[],
        sentenceLength: number,
        wordLine: HTMLElement,
        parent: HTMLElement,
        callBack: (checkingLine: HTMLElement) => boolean
    ) {
        this.setWordProps(baseWordsArr, mixWordsArr, sentenceLength);
        const fragment = this.buildWordElems(wordLine, callBack);
        parent.append(fragment);
    }
}
