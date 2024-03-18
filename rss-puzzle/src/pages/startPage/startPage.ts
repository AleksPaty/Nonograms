import { ElemConstruct } from '../../components/elemConstruct';
import { LoginForm } from '../../components/form/loginForms';
import { StorageService } from '../../service/local-storage.service';
import { UserStorage } from '../../types/usedInterface';
import bgImage from '../../assets/img/bgImage.png';

export class StartPage {
    startElem: HTMLElement;
    storageService: StorageService;
    loginForm: LoginForm;
    descriptionWrap: HTMLElement;
    goMainPageBtn: HTMLElement;

    constructor() {
        this.startElem = ElemConstruct('div', 'start-page');
        this.storageService = new StorageService();
        this.loginForm = new LoginForm(['text', 'text'], 1);
        this.descriptionWrap = ElemConstruct('div', 'description__wrapper');
        this.goMainPageBtn = ElemConstruct('button', 'welcome__btn', 'Start', undefined, [{ type: 'button' }]);
    }

    private buildStartImg(): void {
        if (!bgImage) return;
        ElemConstruct('img', 'start-page__img', undefined, this.startElem, [
            { src: './assets/bgImage.png' },
            { alt: 'image' },
        ]);
    }

    private buildWelcomeElem(): HTMLElement {
        const user = this.storageService.getData();
        const welcomeElem = ElemConstruct('div', 'welcome');
        ElemConstruct('h1', 'welcome__header', 'ENGLISH PUZZLE', welcomeElem);
        ElemConstruct('p', 'welcome__p1', `Welcome ${user?.firstName} ${user?.surname}.`, welcomeElem);
        ElemConstruct('p', 'welcome__p1', 'Click on words, collect phrases.', welcomeElem);
        ElemConstruct('p', 'welcome__p2', 'Words can be drag and drop. Select tooltips in the menu', welcomeElem);
        welcomeElem.append(this.goMainPageBtn);

        return welcomeElem;
    }

    public removeWelcomeElem(): void {
        this.startElem.replaceChildren();
        this.startElem.classList.add('empty');
    }

    private chooseRenderElem(): void {
        this.startElem.classList.remove('empty');
        if (!this.storageService.getData()) {
            this.loginForm.render(this.startElem, this.redirectToWelcomePage.bind(this));
        } else {
            this.startElem.append(this.buildWelcomeElem());
        }
    }

    public redirectToWelcomePage(data: UserStorage): void {
        this.storageService.saveData(this.storageService.storageKey, data);
        this.chooseRenderElem();
    }

    public render(): HTMLElement {
        this.buildStartImg();
        this.chooseRenderElem();

        return this.startElem;
    }
}
