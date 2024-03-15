import { ElemConstruct } from '../../components/elemConstruct';
import { GameField } from '../../components/gameField/gameField';
import { StorageService } from '../../components/local-storage.service';
import { WordTools } from '../../components/wordWorker/wordTools';

export class MainPage {
    storageService: StorageService;
    headerElem: HTMLElement = ElemConstruct('div', 'header');
    mainElem: HTMLElement = ElemConstruct('div', 'main');
    puzzleGameElem = new GameField();
    wordTools: WordTools = new WordTools('1');

    constructor() {
        this.storageService = new StorageService();
    }

    private fillHeader(): void {
        const user = this.storageService.getData();
        const headerContainer = ElemConstruct('div', 'container', undefined, this.headerElem);

        ElemConstruct('p', 'header__greeter', `Hallo, ${user?.firstName} ${user?.surname}`, headerContainer);
        const logOutBtn = ElemConstruct('button', 'header__btn', 'Log out', headerContainer, [{ type: 'button' }]);
        console.log(logOutBtn);
    }

    public render(): void {
        this.fillHeader();

        const mainContainer = ElemConstruct('div', 'container', undefined, this.mainElem);
        this.puzzleGameElem.render(mainContainer);
    }
}
