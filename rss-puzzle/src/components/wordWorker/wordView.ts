import { ElemConstruct } from '../elemConstruct';

export class WordView {
    wordTask: string[] | null = null;
    sentenceLength: number | null = null;

    private setWordProps(wordsArr: string[], sentenceLength: number) {
        this.wordTask = wordsArr;
        this.sentenceLength = sentenceLength;
    }

    private buildWordElems(parentElem: HTMLElement): DocumentFragment {
        const fragment = document.createDocumentFragment();
        this.wordTask?.forEach((word) => {
            const elem = ElemConstruct('div', 'word-puzzle', `${word}`);
            const widthElem = (800 / this.sentenceLength!) * word.length;
            elem.style.width = `${Math.ceil(widthElem) - 25}px`;

            elem.addEventListener('click', (e) => this.replaceWordHandler(e, parentElem));
            fragment.append(elem);
        });

        return fragment;
    }

    private replaceWordHandler(e: Event, parentElem: HTMLElement) {
        const elem = e.target as HTMLElement;
        const cloneElem = elem.cloneNode(true) as HTMLElement;
        const parent = elem.parentElement;

        cloneElem.style.width = `${elem.offsetWidth - 20}px`;
        cloneElem.addEventListener('click', (e) => this.replaceWordHandler(e, parent!));

        parentElem.append(cloneElem);
        elem.remove();
    }

    public render(wordsArr: string[], sentenceLength: number, wordLine: HTMLElement, parent: HTMLElement) {
        this.setWordProps(wordsArr, sentenceLength);
        const fragment = this.buildWordElems(wordLine);
        parent.append(fragment);
    }
}
