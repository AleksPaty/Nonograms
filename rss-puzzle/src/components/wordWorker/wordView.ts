import { ElemConstruct } from '../elemConstruct';

export class WordView {
    wordTask: string[] | null = null;
    sentenceLength: number | null = null;

    private setWordProps(wordsArr: string[], sentenceLength: number) {
        this.wordTask = wordsArr;
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
                console.log(prevWord);
                prevWord.removeEventListener('click', handler);
            }
            const elem = ElemConstruct('div', 'word-puzzle', `${word}`);
            const widthElem = (800 / this.sentenceLength!) * word.length;
            elem.style.width = `${Math.ceil(widthElem) - 25}px`;

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
        const checkBtn = parent?.nextElementSibling as HTMLButtonElement;
        const handler = (e: Event) => {
            this.replaceWordHandler(e, parentElem, callBack);
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
        wordsArr: string[],
        sentenceLength: number,
        wordLine: HTMLElement,
        parent: HTMLElement,
        callBack: (checkingLine: HTMLElement) => boolean
    ) {
        this.setWordProps(wordsArr, sentenceLength);
        const fragment = this.buildWordElems(wordLine, callBack);
        parent.append(fragment);
    }
}
