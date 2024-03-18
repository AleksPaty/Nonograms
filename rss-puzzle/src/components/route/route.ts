import { MainPage } from '../../pages/mainPage/mainPage';
import { StartPage } from '../../pages/startPage/startPage';

export class Route {
    private startPage: StartPage;
    private mainPage: MainPage;

    constructor() {
        this.startPage = new StartPage();
        this.mainPage = new MainPage();
    }

    private changePageToMain(): void {
        document.body.append(this.mainPage.headerElem);
        document.body.append(this.mainPage.mainElem);
        this.mainPage.render();
        this.startPage.removeWelcomeElem();
    }

    private logOutHandle() {
        this.mainPage.storageService.removeData('user');
        this.mainPage.removePage();
        document.body.append(this.startPage.render());
    }

    public render(): void {
        document.body.append(this.startPage.render());
        this.startPage.goMainPageBtn.onclick = this.changePageToMain.bind(this);
        this.mainPage.logOutBtn.onclick = this.logOutHandle.bind(this);
    }
}
