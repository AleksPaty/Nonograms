import { ElemConstruct } from '../../components/elemConstruct';
import { GameField } from '../../components/gameField/gameField';
import { StorageService } from '../../service/local-storage.service';
import { WordTools } from '../../components/wordWorker/wordTools';

export class MainPage {
    storageService: StorageService;
    headerElem: HTMLElement = ElemConstruct('div', 'header');
    mainElem: HTMLElement = ElemConstruct('div', 'main');
    puzzleGameElem = new GameField();
    wordTools: WordTools = new WordTools('1');
    logOutBtn: HTMLButtonElement;

    constructor() {
        this.storageService = new StorageService();
        this.logOutBtn = ElemConstruct('button', 'header__btn', 'Log out', undefined, [
            { type: 'button' },
        ]) as HTMLButtonElement;
    }

    private fillHeader(): void {
        const user = this.storageService.getData();
        const headerContainer = ElemConstruct('div', 'container', undefined, this.headerElem);

        ElemConstruct('p', 'header__greeter', `Hallo, ${user?.firstName} ${user?.surname}`, headerContainer);
        headerContainer.append(this.logOutBtn);
    }

    public removePage() {
        this.headerElem.replaceChildren();
        this.mainElem.replaceChildren();
    }

    public render(): void {
        this.fillHeader();

        const mainContainer = ElemConstruct('div', 'container', undefined, this.mainElem);
        this.puzzleGameElem.render(mainContainer);
    }
}
