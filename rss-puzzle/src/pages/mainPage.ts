import { ElemConstruct } from '../components/elemConstruct';
import { StorageService } from '../components/local-storage.service';

export class MainPage {
    storageService: StorageService;
    headerElem: HTMLElement = ElemConstruct('div', 'header');
    mainElem: HTMLElement = ElemConstruct('div', 'main');

    constructor() {
        this.storageService = new StorageService();
    }

    private fillHeader(): void {
        const user = this.storageService.getData();
        ElemConstruct('p', 'header__greeter', `Hallo, ${user?.firstName} ${user?.surname}`, this.headerElem);
        const logOutBtn = ElemConstruct('button', 'header__btn', 'Log out', this.headerElem);
        console.log(logOutBtn);
    }

    private bieldGameField(): void {
        const puzzleField = ElemConstruct('div', 'main__puzzleField', undefined, this.mainElem);
        const wordsField = ElemConstruct('div', 'main__wordsField', undefined, this.mainElem);
        console.log(puzzleField, wordsField);
    }

    private fillMain(): void {
        const mainHeader = ElemConstruct('div', 'main__header', undefined, this.mainElem);
        this.bieldGameField();
        console.log(mainHeader);
    }

    public render() {
        this.fillHeader();
        this.fillMain();
    }
}
