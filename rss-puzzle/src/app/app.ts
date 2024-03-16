import { MainPage } from '../pages/mainPage/mainPage';
import { StartPage } from '../pages/startPage/startPage';

class App {
    private startPage: StartPage;
    private mainPage: MainPage;

    constructor() {
        this.startPage = new StartPage();
        this.mainPage = new MainPage();
    }

    private render(): void {
        document.body.append(this.startPage.render());
        document.body.append(this.mainPage.headerElem);
        document.body.append(this.mainPage.mainElem);

        this.mainPage.render();
    }

    start(): void {
        this.render();
    }
}

export default App;
